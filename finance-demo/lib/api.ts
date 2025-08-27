import { Stock, NewStockData } from './types';

// API function to create a new stock
export const createStock = async (stockData: NewStockData): Promise<Stock> => {
  const params = new URLSearchParams({
    name: stockData.stockName,
    exchange: stockData.exchangeName,
    num_of_articles: stockData.articlesCount.toString()
  });

  const response = await fetch(`http://localhost:8000/create?${params}`, {
    method: 'POST'
  });
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  const data = await response.json();
  
  // Ensure the stock has all required fields with proper fallbacks
  return {
    ...data,
    history: data.history || [], // Ensure history is always an array
    isResearching: false
  };
};

// API function to update existing stock
export const updateStock = async (stockId: string, articlesCount: number): Promise<Stock> => {
  const params = new URLSearchParams({
    id: stockId,
    num_of_articles: articlesCount.toString()
  });

  const response = await fetch(`http://localhost:8000/update?${params}`, {
    method: 'POST'
  });
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  const data = await response.json();
  
  // Add the isResearching field and ensure history array
  return {
    ...data,
    history: data.history || [], // Ensure history is always an array
    isResearching: false
  };
};

// API function to get all stocks
export const getAllStocks = async (): Promise<Stock[]> => {
  const response = await fetch('http://localhost:8000/get_all', {
    method: 'POST'
  });
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  const data = await response.json();
  
  // Add the isResearching field and ensure history array for each stock
  return data.map((stock: Stock) => ({
    ...stock,
    history: stock.history || [], // Ensure history is always an array
    isResearching: false
  }));
}; 