import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/10 to-primary/5">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Explore the Dashboard?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Experience the power of AI-driven sentiment analysis and see how it can 
            transform your investment research process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="text-lg px-8 py-6">
                Launch Dashboard
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              View Documentation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 