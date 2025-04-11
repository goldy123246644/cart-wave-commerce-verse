import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart, LineChart, AreaChart, PieChart, ComposedChart, Bar, Line, Area, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingBag, Activity, Package } from 'lucide-react';
import { StateIndicator, ProfitLossData } from '@/types/product';
import ProductModelViewer from '@/components/ProductModelViewer';
import InventoryTrendViewer from '@/components/InventoryTrendViewer';

const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
  { name: 'Jul', sales: 3490 },
  { name: 'Aug', sales: 4000 },
  { name: 'Sep', sales: 5200 },
  { name: 'Oct', sales: 6000 },
  { name: 'Nov', sales: 7000 },
  { name: 'Dec', sales: 9800 },
];

const profitData = [
  { name: 'Jan', profit: 2400 },
  { name: 'Feb', profit: 1398 },
  { name: 'Mar', profit: 3500 },
  { name: 'Apr', profit: 1520 },
  { name: 'May', profit: 980 },
  { name: 'Jun', profit: 1350 },
  { name: 'Jul', profit: 1720 },
  { name: 'Aug', profit: 2300 },
  { name: 'Sep', profit: 3100 },
  { name: 'Oct', profit: 3800 },
  { name: 'Nov', profit: 4200 },
  { name: 'Dec', profit: 5400 },
];

const detailedMonthlyProfit = [
  { name: 'Jan', revenue: 8500, cost: 4800, profit: 3700, margin: 43.5 },
  { name: 'Feb', revenue: 7200, cost: 4500, profit: 2700, margin: 37.5 },
  { name: 'Mar', revenue: 9100, cost: 5200, profit: 3900, margin: 42.9 },
  { name: 'Apr', revenue: 7800, cost: 5100, profit: 2700, margin: 34.6 },
  { name: 'May', revenue: 8300, cost: 5400, profit: 2900, margin: 34.9 },
  { name: 'Jun', revenue: 9500, cost: 5600, profit: 3900, margin: 41.1 },
  { name: 'Jul', revenue: 10200, cost: 5900, profit: 4300, margin: 42.2 },
  { name: 'Aug', revenue: 11000, cost: 6300, profit: 4700, margin: 42.7 },
  { name: 'Sep', revenue: 12500, cost: 7100, profit: 5400, margin: 43.2 },
  { name: 'Oct', revenue: 13800, cost: 7800, profit: 6000, margin: 43.5 },
  { name: 'Nov', revenue: 14900, cost: 8200, profit: 6700, margin: 45.0 },
  { name: 'Dec', revenue: 16500, cost: 8900, profit: 7600, margin: 46.1 },
];

const quarterlyProfitComparison = [
  { name: 'Q1', thisYear: 10300, lastYear: 8700, growth: 18.4 },
  { name: 'Q2', thisYear: 9500, lastYear: 7800, growth: 21.8 },
  { name: 'Q3', thisYear: 14400, lastYear: 11200, growth: 28.6 },
  { name: 'Q4', thisYear: 20300, lastYear: 15400, growth: 31.8 },
];

const categorySales = [
  { name: 'Electronics', value: 35 },
  { name: 'Clothing', value: 25 },
  { name: 'Home & Kitchen', value: 20 },
  { name: 'Books', value: 15 },
  { name: 'Other', value: 5 },
];

const stateIndicators: StateIndicator[] = [
  { name: 'Total Revenue', value: 54621, change: 12.5, status: 'positive' },
  { name: 'New Customers', value: 2834, change: 5.7, status: 'positive' },
  { name: 'Orders', value: 6284, change: -2.3, status: 'negative' },
  { name: 'Conversion Rate', value: 3.6, change: 0.8, status: 'positive' },
];

const profitLossData: ProfitLossData[] = [
  { period: 'Jan', revenue: 8500, expenses: 5200, profit: 3300 },
  { period: 'Feb', revenue: 7200, expenses: 4800, profit: 2400 },
  { period: 'Mar', revenue: 9100, expenses: 5400, profit: 3700 },
  { period: 'Apr', revenue: 7800, expenses: 5000, profit: 2800 },
  { period: 'May', revenue: 8300, expenses: 5100, profit: 3200 },
  { period: 'Jun', revenue: 9500, expenses: 5300, profit: 4200 },
];

const COLORS = ['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9', '#9F9EA1'];
const PROFIT_COLORS = {
  revenue: '#8B5CF6',
  cost: '#F97316',
  profit: '#0EA5E9',
  margin: '#10B981',
  thisYear: '#8B5CF6',
  lastYear: '#D1D5DB',
  growth: '#10B981'
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Store Analytics Dashboard</h1>
      
      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="profits">Profit Analysis</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="3d">3D Models</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stateIndicators.map((indicator) => (
              <StateIndicatorCard key={indicator.name} indicator={indicator} />
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Sales</CardTitle>
                <CardDescription>Total sales over the past year</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    sales: {
                      label: "Sales",
                      color: "#8B5CF6",
                    },
                  }}
                  className="aspect-[16/9]"
                >
                  <BarChart
                    data={salesData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          indicator="dot"
                          nameKey="name"
                          labelKey="sales"
                        />
                      }
                    />
                    <Legend />
                    <Bar
                      dataKey="sales"
                      fill="var(--color-sales)"
                      radius={[4, 4, 0, 0]}
                      name="Monthly Sales"
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Monthly Profit</CardTitle>
                <CardDescription>Profit margins over the past year</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    profit: {
                      label: "Profit",
                      color: "#0EA5E9",
                    },
                  }}
                  className="aspect-[16/9]"
                >
                  <LineChart
                    data={profitData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip 
                      content={
                        <ChartTooltipContent
                          indicator="dot"
                          nameKey="name"
                          labelKey="profit"
                        />
                      }
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="profit"
                      stroke="var(--color-profit)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }}
                      name="Monthly Profit"
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
                <CardDescription>Distribution of sales across product categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categorySales}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categorySales.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Profit & Loss</CardTitle>
                <CardDescription>Revenue, expenses, and profit over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={profitLossData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="period" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="revenue" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" />
                      <Area type="monotone" dataKey="expenses" stackId="1" stroke="#F97316" fill="#F97316" />
                      <Area type="monotone" dataKey="profit" stackId="2" stroke="#0EA5E9" fill="#0EA5E9" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="sales" className="space-y-4">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Detailed Sales Analysis</CardTitle>
              <CardDescription>Comprehensive view of sales metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={salesData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="sales" stroke="#8B5CF6" fill="#D6BCFA" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profits" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Profit Breakdown</CardTitle>
                <CardDescription>Revenue, cost, and profit by month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={detailedMonthlyProfit}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" domain={[0, 100]} unit="%" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill={PROFIT_COLORS.revenue} />
                      <Bar yAxisId="left" dataKey="cost" name="Cost" fill={PROFIT_COLORS.cost} />
                      <Bar yAxisId="left" dataKey="profit" name="Profit" fill={PROFIT_COLORS.profit} />
                      <Line 
                        yAxisId="right" 
                        type="monotone" 
                        dataKey="margin" 
                        name="Profit Margin %" 
                        stroke={PROFIT_COLORS.margin} 
                        strokeWidth={2} 
                        dot={{ r: 3 }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quarterly Profit Comparison</CardTitle>
                <CardDescription>Year-over-year profit growth by quarter</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={quarterlyProfitComparison}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" domain={[0, 50]} unit="%" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="thisYear" name="This Year" fill={PROFIT_COLORS.thisYear} />
                      <Bar yAxisId="left" dataKey="lastYear" name="Last Year" fill={PROFIT_COLORS.lastYear} />
                      <Line 
                        yAxisId="right" 
                        type="monotone" 
                        dataKey="growth" 
                        name="Growth %" 
                        stroke={PROFIT_COLORS.growth} 
                        strokeWidth={2} 
                        dot={{ r: 4 }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Annual Profit Trend</CardTitle>
              <CardDescription>Monthly profit progression throughout the year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={detailedMonthlyProfit}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="profit" 
                      stroke={PROFIT_COLORS.profit} 
                      fill={PROFIT_COLORS.profit} 
                      name="Monthly Profit"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="products" className="space-y-4">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
              <CardDescription>Top selling products and inventory status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={[
                      { name: "iPhone 13 Pro", sales: 450 },
                      { name: "Samsung Galaxy S21", sales: 380 },
                      { name: "MacBook Pro", sales: 320 },
                      { name: "AirPods Pro", sales: 290 },
                      { name: "iPad Air", sales: 240 }
                    ]}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 100,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" fill="#9b87f5" name="Units Sold" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inventory" className="space-y-4">
          <Card className="col-span-2 mb-4">
            <CardHeader>
              <CardTitle>Inventory Management</CardTitle>
              <CardDescription>Track stock levels and inventory trends</CardDescription>
            </CardHeader>
            <CardContent>
              <InventoryTrendViewer showAlerts={true} />
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Restock Schedule</CardTitle>
                <CardDescription>Upcoming inventory restocks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { product: "Wireless Headphones", date: "2025-04-20", quantity: 50 },
                    { product: "Smart Watch", date: "2025-04-15", quantity: 30 },
                    { product: "Modern Sneakers", date: "2025-04-25", quantity: 100 }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <p className="font-medium">{item.product}</p>
                        <p className="text-sm text-muted-foreground">
                          Expected: {new Date(item.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="bg-primary/10 text-primary px-2 py-1 rounded-md">
                        {item.quantity} units
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Warehouse Distribution</CardTitle>
                <CardDescription>Stock allocation across warehouses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Main Warehouse', value: 45 },
                          { name: 'East Coast', value: 25 },
                          { name: 'West Coast', value: 20 },
                          { name: 'International', value: 10 }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categorySales.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="3d" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Visualization</CardTitle>
                <CardDescription>Interactive 3D model of featured products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 flex items-center justify-center">
                  <ProductModelViewer />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
                <CardDescription>User interaction with 3D models</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'View Time', value: 45 },
                          { name: 'Interaction', value: 25 },
                          { name: 'Conversion', value: 20 },
                          { name: 'Share', value: 10 }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categorySales.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface StateIndicatorCardProps {
  indicator: StateIndicator;
}

const StateIndicatorCard = ({ indicator }: StateIndicatorCardProps) => {
  const getIcon = () => {
    switch (indicator.name) {
      case 'Total Revenue':
        return <DollarSign className="h-5 w-5" />;
      case 'New Customers':
        return <Users className="h-5 w-5" />;
      case 'Orders':
        return <ShoppingBag className="h-5 w-5" />;
      case 'Conversion Rate':
        return <Activity className="h-5 w-5" />;
      default:
        return <Package className="h-5 w-5" />;
    }
  };

  return (
    <Card>
      <CardContent className="py-6">
        <div className="flex items-center justify-between mb-4">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
            {getIcon()}
          </span>
          <span className={`flex items-center text-sm ${
            indicator.status === 'positive' ? 'text-green-600' : 
            indicator.status === 'negative' ? 'text-red-600' : 'text-gray-600'
          }`}>
            {indicator.change > 0 ? (
              <>
                <TrendingUp className="h-4 w-4 mr-1" />
                +{indicator.change}%
              </>
            ) : indicator.change < 0 ? (
              <>
                <TrendingDown className="h-4 w-4 mr-1" />
                {indicator.change}%
              </>
            ) : (
              <>0%</>
            )}
          </span>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{indicator.name}</p>
          <h3 className="text-2xl font-bold">
            {indicator.name.includes('Rate') 
              ? `${indicator.value}%` 
              : indicator.name === 'Total Revenue' 
                ? `$${indicator.value.toLocaleString()}` 
                : indicator.value.toLocaleString()}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
