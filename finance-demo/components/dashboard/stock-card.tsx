import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Stock } from '@/lib/types';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus, Clock } from 'lucide-react';

interface StockCardProps {
  stock: Stock;
  onClick: () => void;
}

export function StockCard({
  stock,
  onClick
}: StockCardProps) {
  // Get the latest sentiment from history with defensive checks
  const history = stock.history || [];
  const latestResearch = history.length > 0 ? history[history.length - 1] : null;
  const sentiment = latestResearch?.sentiment;
  const lastResearched = latestResearch?.lastResearched;

  const getSentimentIcon = () => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'negative':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      case 'neutral':
        return <Minus className="w-4 h-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getSentimentColor = () => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'negative':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'neutral':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (date: string) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return '1 day ago';
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  if (stock.isResearching) {
    return (
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-5 w-16" />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-4 w-24" />
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-muted-foreground animate-pulse" />
            <span className="text-sm text-muted-foreground">Researching...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer hover:scale-[1.02] transition-transform"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{stock.stockName}</CardTitle>
          <Badge variant="secondary" className="text-xs">
            {stock.exchangeName}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {stock.articlesCount} articles
          </span>
          {sentiment && (
            <div className="flex items-center space-x-2">
              {getSentimentIcon()}
              <Badge 
                variant="outline" 
                className={cn("text-xs", getSentimentColor())}
              >
                {sentiment}
              </Badge>
            </div>
          )}
        </div>
        
        {lastResearched && (
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>Last: {formatDate(lastResearched)}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 