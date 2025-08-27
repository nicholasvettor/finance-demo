import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, BarChart3, Zap, Users } from 'lucide-react';

const features = [
  {
    icon: TrendingUp,
    title: "Stock Research Automation",
    description: "Automatically analyze hundreds of financial articles and news sources to extract sentiment insights."
  },
  {
    icon: BarChart3,
    title: "Sentiment Visualization",
    description: "Clear, intuitive charts and metrics showing market sentiment trends and analysis results."
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "Get instant updates on sentiment changes and new research findings as they happen."
  },
  {
    icon: Users,
    title: "User-friendly Dashboard",
    description: "Intuitive interface designed for both beginners and experienced financial analysts."
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for Smart Investing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to make informed investment decisions based on comprehensive sentiment analysis.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 