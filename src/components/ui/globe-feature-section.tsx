"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import createGlobe, { COBEOptions } from "cobe"
import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export default function Featured_05() {
  return (
    <section className="relative w-full mx-auto overflow-hidden rounded-[2.5rem] bg-[#F2F2EB]/40 border border-[#E7E7DE] shadow-sm px-6 py-16 md:px-16 md:py-24 mt-24">
      <div className="flex flex-col-reverse items-center justify-between gap-10 md:flex-row">
        <div className="z-10 max-w-2xl text-left">
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#7B2CBF] animate-pulse" />
            <p className="text-[#7B2CBF] text-xs font-black uppercase tracking-[0.3em]">Start Today</p>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-[#1A122E] tracking-tight leading-[1.05] mb-8">
            Ready to Hack Your <br />
            <span className="text-rich-navy font-black">Future Career?</span>
          </h2>
          
          <p className="text-[#524769] text-lg font-medium mb-12 max-w-lg leading-relaxed">
            The 2026 Zero to Hero Complete Security Bundle is officially open. Join the next cohort of global defensive and offensive cyber elites.
          </p>

          <Button className="mt-6 flex items-center gap-3 rounded-full bg-[#011F5B] hover:bg-[#011F5B]/90 px-8 py-7 text-base font-bold text-white transition-all hover:scale-105 shadow-xl shadow-[#011F5B]/20">
            Join the Complete Security Bundle <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="relative h-[300px] md:h-[450px] w-full max-w-xl flex items-center justify-center">
          {/* Aesthetic Revolving Ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] border border-[#7B2CBF]/10 rounded-full z-0"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#7B2CBF]/30 blur-[2px]" />
          </motion.div>
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute w-[400px] h-[400px] md:w-[550px] md:h-[550px] border border-[#011F5B]/5 rounded-full z-0"
          >
            <div className="absolute bottom-0 left-1/4 w-3 h-3 rounded-full bg-[#011F5B]/10 blur-[4px]" />
          </motion.div>

          <Globe className="scale-[1.8] md:scale-[2.2] translate-y-10" />
        </div>
      </div>
    </section>
  );
}

const GLOBE_CONFIG: COBEOptions = {
  width: 1000,
  height: 1000,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 1.2,
  mapSamples: 16000,
  mapBrightness: 1.5, // Reduced from 6 for cleaner aesthetic
  baseColor: [251 / 255, 251 / 255, 247 / 255], 
  markerColor: [123 / 255, 44 / 255, 191 / 255], 
  glowColor: [1, 1, 1], 
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string
  config?: COBEOptions
}) {
  const phi = useRef(0) // Use Ref to persist rotation
  let width = 0
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef(null)
  const pointerInteractionMovement = useRef(0)
  const [r, setR] = useState(0)

  const updatePointerInteraction = (value: any) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: any) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      setR(delta / 200)
    }
  }

  const onRender = useCallback(
    (state: Record<string, any>) => {
      if (!pointerInteracting.current) phi.current += 0.003 // Smoother, slower rotation
      state.phi = phi.current + r
      state.width = width * 2
      state.height = width * 2
    },
    [r],
  )

  const onResize = () => {
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth
    }
  }

  useEffect(() => {
    window.addEventListener("resize", onResize)
    onResize()

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender,
    })

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1"
    })
    return () => globe.destroy()
  }, [onRender, config])

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
        className,
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-1000 [contain:layout_paint_size]",
        )}
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current,
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  )
}
