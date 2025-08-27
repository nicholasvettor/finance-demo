'use client';

import { useState, useEffect, useRef } from 'react';
import { StockGrid } from '@/components/dashboard/stock-grid';
import { AddStockModal } from '@/components/dashboard/add-stock-modal';
import { StockDetailModal } from '@/components/dashboard/stock-detail-modal';
import { useStocks } from '@/hooks/use-stocks';
import { Stock, NewStockData } from '@/lib/types';
import { useToast } from '@/components/ui/use-toast';

export default function DashboardPage() {
  const { stocks, isLoading, error, addStock, researchStock, fetchStocks } = useStocks();
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { toast } = useToast();
  const hasInitialized = useRef(false);

  // Fetch stocks on page load only once
  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      fetchStocks();
    }
  }, []); // Empty dependency array - only run once

  const handleStockClick = (stock: Stock) => {
    setSelectedStock(stock);
    setIsDetailModalOpen(true);
  };

  const handleAddStock = async (stockData: NewStockData) => {
    try {
      await addStock(stockData);
      toast({
        title: "Stock Added",
        description: `${stockData.stockName} has been added and research is in progress.`,
      });
      // Refresh the stocks list
      await fetchStocks();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add stock. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleResearch = async (articlesCount: number) => {
    if (!selectedStock) return;
    
    try {
      await researchStock(selectedStock.id, articlesCount);
      toast({
        title: "Research Complete",
        description: `Sentiment analysis completed for ${selectedStock.stockName}.`,
      });
      // Don't refresh the entire list - the store already updated the stock data
      // await fetchStocks();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to complete research. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedStock(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Dashboard Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Finance Sentiment Dashboard
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Monitor and analyze sentiment data for your stock portfolio
        </p>
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            {stocks.length} stock{stocks.length !== 1 ? 's' : ''} tracked
          </div>
          <AddStockModal 
            onAddStock={handleAddStock} 
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {/* Stock Grid */}
      <StockGrid 
        stocks={stocks} 
        onStockClick={handleStockClick} 
      />

      {/* Stock Detail Modal */}
      {selectedStock && (
        <StockDetailModal
          stock={selectedStock}
          isOpen={isDetailModalOpen}
          onClose={handleCloseDetailModal}
          onResearch={handleResearch}
        />
      )}
    </div>
  );
} 