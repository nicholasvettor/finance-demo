import { HeroSection } from '@/components/landing/hero-section';
import { FeaturesSection } from '@/components/landing/features-section';
import { DemoSection } from '@/components/landing/demo-section';
import { CTASection } from '@/components/landing/cta-section';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      {/* <FeaturesSection /> */}
      <DemoSection />
      <CTASection />
    </main>
  );
}
