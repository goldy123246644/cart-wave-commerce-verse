
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { TrendingUp, TrendingDown, DollarSign, Package, ShoppingBag, Activity } from 'lucide-react';
import { StateIndicator } from '@/types/product';
import InventoryTrendViewer from '@/components/InventoryTrendViewer';

const sellerStats: StateIndicator[] = [
  { name: 'Sales Revenue', value: 24621, change: 8.5, status: 'positive' },
  { name: 'Active Products', value: 84, change: 3.2, status: 'positive' },
  { name: 'Orders', value: 384, change: 5.7, status: 'positive' },
  { name: 'Conversion Rate', value: 4.2, change: 0.8, status: 'positive' },
];

const monthlySales = [
  { month: 'Jan', sales: 4200, profit: 1260 },
  { month: 'Feb', sales: 3800, profit: 1140 },
  { month: 'Mar', sales: 5100, profit: 1530 },
  { month: 'Apr', sales: 4800, profit: 1440 },
  { month: 'May', sales: 5600, profit: 1680 },
  { month: 'Jun', sales: 6200, profit: 1860 },
];

const SellerDashboard = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {sellerStats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="py-6">
              <div className="flex items-center justify-between mb-4">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                  {stat.name.includes('Revenue') ? <DollarSign className="h-5 w-5" /> :
                   stat.name.includes('Products') ? <Package className="h-5 w-5" /> :
                   stat.name.includes('Orders') ? <ShoppingBag className="h-5 w-5" /> :
                   <Activity className="h-5 w-5" />}
                </span>
                <span className={`flex items-center text-sm ${
                  stat.status === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change > 0 ? (
                    <>
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +{stat.change}%
                    </>
                  ) : (
                    <>
                      <TrendingDown className="h-4 w-4 mr-1" />
                      {stat.change}%
                    </>
                  )}
                </span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.name}</p>
                <h3 className="text-2xl font-bold">
                  {stat.name.includes('Rate') ? `${stat.value}%` : 
                   stat.name.includes('Revenue') ? `$${stat.value.toLocaleString()}` : 
                   stat.value.toLocaleString()}
                </h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Performance</CardTitle>
            <CardDescription>Monthly sales and profit overview</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                sales: {
                  label: "Sales",
                  color: "#8B5CF6",
                },
                profit: {
                  label: "Profit",
                  color: "#10B981",
                },
              }}
              className="aspect-[16/9]"
            >
              <AreaChart
                data={monthlySales}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip
                  content={<ChartTooltipContent indicator="dot" nameKey="month" />}
                />
                <Legend />
                <Area type="monotone" dataKey="sales" stroke="var(--color-sales)" fill="var(--color-sales)" name="Sales" />
                <Area type="monotone" dataKey="profit" stroke="var(--color-profit)" fill="var(--color-profit)" name="Profit" />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory Status</CardTitle>
            <CardDescription>Current stock levels and trends</CardDescription>
          </CardHeader>
          <CardContent>
            <InventoryTrendViewer showAlerts={true} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SellerDashboard;
