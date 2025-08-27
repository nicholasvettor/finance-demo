import { StockCard } from './stock-card';
import { Stock } from '@/lib/types';

interface StockGridProps {
  stocks: Stock[];
  onStockClick: (stock: Stock) => void;
}

export function StockGrid({ stocks, onStockClick }: StockGridProps) {
  if (stocks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground mb-4">
          <p className="text-lg">No stocks added yet</p>
          <p className="text-sm">Add your first stock to get started with sentiment analysis</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
      {stocks.map((stock) => (
        <StockCard
          key={`${stock.stockName}-${stock.exchangeName}`}
          stock={stock}
          onClick={() => onStockClick(stock)}
        />
      ))}
    </div>
  );
} 