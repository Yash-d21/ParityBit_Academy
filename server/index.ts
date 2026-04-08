import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Backend Server is Running!');
});

const razorpay = new Razorpay({
  key_id: (process.env.VITE_RAZORPAY_KEY_ID || '').trim(),
  key_secret: (process.env.RAZORPAY_KEY_SECRET || '').trim(),
});
console.log("[Backend] Razorpay SDK Init with Key:", process.env.VITE_RAZORPAY_KEY_ID?.substring(0, 10));

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY || ''
);

// 1. Create Order
app.post('/api/create-order', async (req, res) => {
  console.log("POST /api/create-order received", req.body);
  try {
    const { amount, currency = 'INR', userId } = req.body;
    
    const options = {
      amount: Number(amount) || 0, 
      currency,
      receipt: `receipt_${Date.now()}`,
      notes: { userId } // Pass userId in notes for matching
    };

    // Create order with a 10-second timeout fail-safe
    console.log("[Backend] Requesting Order ID from Razorpay...");
    
    const orderPromise = razorpay.orders.create(options);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Razorpay API Timeout - Check your network/keys")), 10000)
    );

    const order = await Promise.race([orderPromise, timeoutPromise]) as any;
    console.log("[Backend] Order created successfully:", order.id);
    res.json(order);
  } catch (error: any) {
    console.error('[Backend] Create Order Error:', error.message || error);
    res.status(500).json({ 
      error: 'Failed to create order', 
      details: error.message || 'Unknown network error' 
    });
  }
});

// 2. Verify Payment
app.post('/api/verify-payment', async (req, res) => {
  console.log("[Backend] /api/verify-payment reached with body:", req.body);
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || '')
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      return res.status(200).json({ status: "success", message: "Signature verified" });
    } else {
      return res.status(400).json({ status: "failure", message: "Invalid signature" });
    }
  } catch (error) {
    console.error('Verify Payment Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Webhook endpoint (Signature verification disabled as per key constraints)
app.post('/api/webhook', async (req, res) => {
  console.log("Webhook received:", req.body.event);
  // Note: We cannot verify webhook authenticity without RAZORPAY_WEBHOOK_SECRET
  res.status(200).send('OK');
});

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on port ${PORT}`);
});
