export interface Stock {
  id: string;
  stockName: string;
  exchangeName: string;
  articlesCount: string; // API returns as string
  isResearching: boolean;
  createdAt: string;
  history: ResearchHistory[];
  // API metadata fields
  partitionKey?: string;
  _rid?: string;
  _self?: string;
  _etag?: string;
  _attachments?: string;
  _ts?: number;
}

export interface ResearchHistory {
  sentiment: 'positive' | 'negative' | 'neutral';
  sentimentScore: string;
  lastResearched: string;
}

export interface NewStockData {
  stockName: string;
  exchangeName: string;
  articlesCount: number;
}

export interface StocksStore {
  stocks: Stock[];
  addStock: (stock: NewStockData) => Promise<void>;
  updateStock: (id: string, updates: Partial<Stock>) => void;
  deleteStock: (id: string) => void;
  researchStock: (id: string, articlesCount: number) => Promise<void>;
  fetchStocks: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
} 