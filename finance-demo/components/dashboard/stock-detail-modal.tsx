import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Stock } from '@/lib/types';
import { TrendingUp, TrendingDown, Minus, Loader2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SentimentChart } from './sentiment-chart';

interface StockDetailModalProps {
  stock: Stock;
  isOpen: boolean;
  onClose: () => void;
  onResearch: (articlesCount: number) => Promise<void>;
}

export function StockDetailModal({
  stock,
  isOpen,
  onClose,
  onResearch
}: StockDetailModalProps) {
  const [articlesCount, setArticlesCount] = useState(parseInt(stock.articlesCount) || 15);
  const [isResearching, setIsResearching] = useState(false);

  // Get the latest sentiment from history with defensive checks
  const history = stock.history || [];
  const latestResearch = history.length > 0 ? history[history.length - 1] : null;

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'negative':
        return <TrendingDown className="w-5 h-5 text-red-600" />;
      case 'neutral':
        return <Minus className="w-5 h-5 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getSentimentColor = (sentiment: string) => {
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
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const handleResearch = async () => {
    setIsResearching(true);
    try {
      await onResearch(articlesCount);
    } finally {
      setIsResearching(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{stock.stockName}</DialogTitle>
          <DialogDescription>
            Detailed sentiment analysis and research options
          </DialogDescription>
        </DialogHeader>

        {/* Metadata Section */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Exchange</Label>
              <p className="text-lg font-semibold">{stock.exchangeName}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Articles Count</Label>
              <p className="text-lg font-semibold">{stock.articlesCount}</p>
            </div>
          </div>
          
          {latestResearch && (
            <div className="flex items-center space-x-2">
              <Label className="text-sm font-medium text-muted-foreground">Latest Sentiment</Label>
              <div className="flex items-center space-x-2">
                {getSentimentIcon(latestResearch.sentiment)}
                <Badge 
                  variant="outline" 
                  className={cn("text-sm", getSentimentColor(latestResearch.sentiment))}
                >
                  {latestResearch.sentiment}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  ({parseFloat(latestResearch.sentimentScore).toFixed(2)})
                </span>
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Research History Section */}
        {history.length > 0 && (
          <>
            <div className="space-y-3">
              <Label className="text-sm font-medium">Research History</Label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {history.map((research, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getSentimentIcon(research.sentiment)}
                      <div>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant="outline" 
                            className={cn("text-xs", getSentimentColor(research.sentiment))}
                          >
                            {research.sentiment}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Score: {parseFloat(research.sentimentScore).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatDate(research.lastResearched)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
          </>
        )}

        {/* Graph/Chart Area */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Sentiment Visualization</Label>
          <SentimentChart history={history} stockName={stock.stockName} />
        </div>

        <Separator />

        {/* Research Section */}
        <div className="space-y-4">
          <Label className="text-sm font-medium">Research Options</Label>
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <Label htmlFor="articles-count" className="text-sm text-muted-foreground">
                Number of Articles
              </Label>
              <Input
                id="articles-count"
                type="number"
                min="1"
                max="100"
                value={articlesCount}
                onChange={(e) => setArticlesCount(parseInt(e.target.value) || 1)}
                disabled={isResearching}
                className="mt-1"
              />
            </div>
            <Button 
              onClick={handleResearch} 
              disabled={isResearching || stock.isResearching}
              className="min-w-[120px]"
            >
              {isResearching || stock.isResearching ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Researching...
                </>
              ) : (
                'Research'
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Research will analyze {articlesCount} articles to determine current sentiment
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
} 