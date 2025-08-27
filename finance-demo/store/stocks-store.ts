import { create } from 'zustand';
import { Stock, NewStockData, StocksStore } from '@/lib/types';
import { createStock, updateStock, getAllStocks } from '@/lib/api';

export const useStocksStore = create<StocksStore>((set, get) => ({
  stocks: [],
  isLoading: false,
  error: null,

  fetchStocks: async () => {
    // Prevent multiple simultaneous calls
    if (get().isLoading) {
      return;
    }
    
    set({ isLoading: true, error: null });
    
    try {
      const stocks = await getAllStocks();
      set({ stocks, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch stocks',
        isLoading: false 
      });
    }
  },

  addStock: async (stockData: NewStockData) => {
    set({ isLoading: true, error: null });
    
    try {
      const newStock = await createStock(stockData);
      set(state => ({
        stocks: [...state.stocks, newStock],
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to add stock',
        isLoading: false 
      });
    }
  },

  updateStock: (id: string, updates: Partial<Stock>) => {
    set(state => ({
      stocks: state.stocks.map(stock =>
        stock.id === id ? { ...stock, ...updates } : stock
      )
    }));
  },

  deleteStock: (id: string) => {
    set(state => ({
      stocks: state.stocks.filter(stock => stock.id !== id)
    }));
  },

  researchStock: async (id: string, articlesCount: number) => {
    const stock = get().stocks.find(s => s.id === id);
    if (!stock) return;

    set(state => ({
      stocks: state.stocks.map(stock =>
        stock.id === id ? { ...stock, isResearching: true } : stock
      )
    }));

    try {
      await updateStock(id, articlesCount);
      
      // Refresh the entire stocks list from the API to ensure we have the latest data
      await get().fetchStocks();
    } catch (error) {
      set(state => ({
        stocks: state.stocks.map(stock =>
          stock.id === id ? { ...stock, isResearching: false } : stock
        ),
        error: error instanceof Error ? error.message : 'Failed to research stock'
      }));
    }
  },
})); 