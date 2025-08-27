import { useStocksStore } from '@/store/stocks-store';
import { NewStockData } from '@/lib/types';

export const useStocks = () => {
  const store = useStocksStore();

  const addStock = async (stockData: NewStockData) => {
    await store.addStock(stockData);
  };

  const researchStock = async (id: string, articlesCount: number) => {
    await store.researchStock(id, articlesCount);
  };

  const deleteStock = (id: string) => {
    store.deleteStock(id);
  };

  const fetchStocks = async () => {
    await store.fetchStocks();
  };

  return {
    stocks: store.stocks,
    isLoading: store.isLoading,
    error: store.error,
    addStock,
    researchStock,
    deleteStock,
    fetchStocks,
  };
}; 