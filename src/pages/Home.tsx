/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Hero from '../components/Hero';
import TrustedBy from '../components/TrustedBy';
import WhatYouGet from '../components/WhatYouGet';
import ProgramOverview from '../components/ProgramOverview';
import { SkillsFeatures } from '../components/blocks/features-8';
import Instructor from '../components/Instructor';
import Curriculum from '../components/Curriculum';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <WhatYouGet />
      <ProgramOverview />
      <SkillsFeatures />
      <Instructor />
      <Curriculum />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
}
