import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Zap, Palette } from 'lucide-react';

export function DemoSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Demo Project Overview
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            This is a demonstration project showcasing modern web development practices 
            and financial sentiment analysis capabilities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-blue-500" />
              </div>
              <CardTitle>What to Expect</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Experience a fully functional dashboard where you can add stocks, 
                research sentiment data, and visualize results. All data is simulated 
                for demonstration purposes.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-500" />
              </div>
              <CardTitle>Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Add new stocks, research sentiment from articles, view detailed 
                analysis, and manage your portfolio with an intuitive interface.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                <Palette className="w-6 h-6 text-purple-500" />
              </div>
              <CardTitle>Technology Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Built with Next.js 15, React 19, TypeScript, Tailwind CSS, 
                ShadCN UI components, and Zustand for state management.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
} 