
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, TrendingDown, TrendingUp, Box } from 'lucide-react';
import { Product, InventoryAlert } from '@/types/product';

// Mock inventory data
const generateMockStockHistory = (productId: number, days: number = 30) => {
  const today = new Date();
  const stockData = [];
  let stock = Math.floor(Math.random() * 50) + 20; // Starting stock between 20-70
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Realistic stock changes
    const change = Math.floor(Math.random() * 7) - 3; // -3 to +3 change each day
    stock = Math.max(0, stock + change);
    
    stockData.push({
      date: date.toISOString().split('T')[0],
      stock,
      reason: change < 0 ? 'purchase' : 'inventory'
    });
  }
  
  return {
    productId,
    stockHistory: stockData
  };
};

// Mock inventory alerts
const generateMockAlerts = (count: number = 3): InventoryAlert[] => {
  const alerts: InventoryAlert[] = [
    {
      productId: 1,
      productName: "Wireless Headphones",
      currentStock: 5,
      threshold: 10,
      status: 'warning',
      daysUntilStockout: 7
    },
    {
      productId: 2,
      productName: "Smart Watch",
      currentStock: 2,
      threshold: 15,
      status: 'critical',
      daysUntilStockout: 2
    },
    {
      productId: 3,
      productName: "Modern Sneakers",
      currentStock: 0,
      threshold: 10,
      status: 'backorder',
    }
  ];
  
  return alerts;
};

interface InventoryTrendViewerProps {
  productId?: number;
  showAlerts?: boolean;
}

const InventoryTrendViewer = ({ productId, showAlerts = true }: InventoryTrendViewerProps) => {
  const [period, setPeriod] = useState<'week' | 'month' | 'quarter'>('month');
  
  // This would be a real API call in production
  const { data: stockData, isLoading } = useQuery({
    queryKey: ['stockHistory', productId, period],
    queryFn: () => {
      // If a specific product is requested
      if (productId) {
        return generateMockStockHistory(productId, period === 'week' ? 7 : period === 'month' ? 30 : 90);
      }
      
      // Mock data for overview if no specific product
      return {
        productId: 0,
        stockHistory: [
          { date: '2024-04-01', stock: 100 },
          { date: '2024-04-05', stock: 90 },
          { date: '2024-04-10', stock: 85 },
          { date: '2024-04-15', stock: 70 },
          { date: '2024-04-20', stock: 60 },
          { date: '2024-04-25', stock: 45 },
          { date: '2024-04-30', stock: 35 },
          { date: '2024-05-05', stock: 50 },
          { date: '2024-05-10', stock: 65 },
        ]
      };
    },
  });
  
  const { data: alerts = [] } = useQuery({
    queryKey: ['inventoryAlerts'],
    queryFn: () => generateMockAlerts(),
    enabled: showAlerts,
  });

  // Calculate inventory stats
  const calculateStats = () => {
    if (!stockData?.stockHistory || stockData.stockHistory.length < 2) {
      return { trend: 'neutral', change: 0 };
    }
    
    const latest = stockData.stockHistory[stockData.stockHistory.length - 1].stock;
    const first = stockData.stockHistory[0].stock;
    const change = ((latest - first) / first) * 100;
    
    return {
      trend: change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral',
      change: Math.abs(change).toFixed(1)
    };
  };
  
  const stats = calculateStats();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="h-[300px] flex items-center justify-center">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-64 w-full bg-gray-200 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Inventory Trends</CardTitle>
              <CardDescription>
                {productId 
                  ? "Detailed stock history for this product" 
                  : "Overview of inventory movements"
                }
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <span className={`flex items-center text-sm ${
                stats.trend === 'positive' ? 'text-green-600' : 
                stats.trend === 'negative' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {stats.trend === 'positive' ? (
                  <>
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +{stats.change}%
                  </>
                ) : stats.trend === 'negative' ? (
                  <>
                    <TrendingDown className="h-4 w-4 mr-1" />
                    -{stats.change}%
                  </>
                ) : (
                  <>0%</>
                )}
              </span>
              <Box className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={period} onValueChange={(v) => setPeriod(v as any)}>
            <TabsList className="mb-4">
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="quarter">Quarter</TabsTrigger>
            </TabsList>
            
            <TabsContent value={period}>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={stockData?.stockHistory}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => {
                        // Only show some of the dates to avoid overcrowding
                        const date = new Date(value);
                        return `${date.getMonth() + 1}/${date.getDate()}`;
                      }}
                    />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`${value} units`, "Stock"]}
                      labelFormatter={(label) => `Date: ${new Date(label).toLocaleDateString()}`}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="stock" 
                      stroke="#8B5CF6" 
                      strokeWidth={2}
                      activeDot={{ r: 8 }} 
                      name="Available Stock"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {showAlerts && alerts.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Inventory Alerts</h3>
          
          {alerts.map((alert) => (
            <Alert 
              key={alert.productId}
              variant={alert.status === 'critical' ? 'destructive' : 'default'} 
              className={`${
                alert.status === 'warning' ? 'border-amber-500 bg-amber-50' : 
                alert.status === 'backorder' ? 'border-blue-500 bg-blue-50' : ''
              }`}
            >
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle className="ml-2 flex items-center gap-2">
                {alert.productName}
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  alert.status === 'warning' ? 'bg-amber-100 text-amber-700' : 
                  alert.status === 'critical' ? 'bg-red-100 text-red-700' : 
                  'bg-blue-100 text-blue-700'
                }`}>
                  {alert.status === 'warning' ? 'Low Stock' : 
                   alert.status === 'critical' ? 'Critical' : 'Back Ordered'}
                </span>
              </AlertTitle>
              <AlertDescription className="ml-2">
                {alert.status === 'backorder' ? (
                  <span>Currently out of stock and on backorder. Notify customers of delays.</span>
                ) : (
                  <span>
                    {alert.currentStock} units remaining ({alert.daysUntilStockout} days until stockout).
                    Threshold: {alert.threshold} units.
                  </span>
                )}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}
    </div>
  );
};

export default InventoryTrendViewer;
