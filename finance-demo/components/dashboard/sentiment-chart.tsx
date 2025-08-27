'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { ResearchHistory } from '@/lib/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface SentimentChartProps {
  history: ResearchHistory[];
  stockName: string;
}

export function SentimentChart({ history, stockName }: SentimentChartProps) {
  if (history.length === 0) {
    return (
      <div className="h-48 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <p className="text-sm">No research history available</p>
          <p className="text-xs">Research this stock to see sentiment trends</p>
        </div>
      </div>
    );
  }

  // Sort history by date (oldest first)
  const sortedHistory = [...history].sort((a, b) => 
    new Date(a.lastResearched).getTime() - new Date(b.lastResearched).getTime()
  );

  // Prepare chart data
  const labels = sortedHistory.map((research, index) => {
    const date = new Date(research.lastResearched);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  });

  const sentimentScores = sortedHistory.map(research => 
    parseFloat(research.sentimentScore)
  );

  const data = {
    labels,
    datasets: [
      {
        label: 'Sentiment Score',
        data: sentimentScores,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: sentimentScores.map(score => {
          if (score > 0.2) return 'rgb(34, 197, 94)'; // Green for positive
          if (score < -0.2) return 'rgb(239, 68, 68)'; // Red for negative
          return 'rgb(234, 179, 8)'; // Yellow for neutral
        }),
        pointBorderColor: 'white',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        //text: `${stockName} Sentiment Trend`,
        color: 'rgb(107, 114, 128)',
        font: {
          size: 14,
          weight: '600'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            const score = context.parsed.y;
            let sentiment = 'Neutral';
            if (score > 0.2) sentiment = 'Positive';
            else if (score < -0.2) sentiment = 'Negative';
            
            return `Sentiment: ${sentiment} (${score.toFixed(2)})`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(156, 163, 175, 0.2)',
        },
        ticks: {
          color: 'rgb(107, 114, 128)',
          font: {
            size: 11
          }
        }
      },
      y: {
        min: -1,
        max: 1,
        grid: {
          color: 'rgba(156, 163, 175, 0.2)',
        },
        ticks: {
          color: 'rgb(107, 114, 128)',
          font: {
            size: 11
          },
          callback: function(value: any) {
            if (value === 0) return 'Neutral';
            if (value > 0) return `+${value}`;
            return value;
          }
        }
      }
    },
    elements: {
      point: {
        hoverBackgroundColor: 'white',
        hoverBorderColor: 'rgb(59, 130, 246)',
        hoverBorderWidth: 3,
      }
    }
  };

  return (
    <div className="h-48 w-full">
      <Line data={data} options={options} />
    </div>
  );
}
