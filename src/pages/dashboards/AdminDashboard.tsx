
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { TrendingUp, TrendingDown, DollarSign, Users } from 'lucide-react';
import { StateIndicator } from '@/types/product';

const adminStats: StateIndicator[] = [
  { name: 'Total Revenue', value: 154621, change: 15.5, status: 'positive' },
  { name: 'Active Sellers', value: 234, change: 7.8, status: 'positive' },
  { name: 'Total Users', value: 12284, change: 12.3, status: 'positive' },
  { name: 'Platform Growth', value: 25.6, change: 5.8, status: 'positive' },
];

const platformData = [
  { month: 'Jan', sellers: 120, buyers: 1200 },
  { month: 'Feb', sellers: 140, buyers: 1400 },
  { month: 'Mar', sellers: 160, buyers: 1600 },
  { month: 'Apr', sellers: 180, buyers: 1800 },
  { month: 'May', sellers: 200, buyers: 2000 },
  { month: 'Jun', sellers: 220, buyers: 2200 },
];

const revenueDistribution = [
  { name: 'Electronics', value: 35 },
  { name: 'Fashion', value: 25 },
  { name: 'Home', value: 20 },
  { name: 'Books', value: 15 },
  { name: 'Others', value: 5 },
];

const COLORS = ['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9', '#9F9EA1'];

const AdminDashboard = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {adminStats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="py-6">
              <div className="flex items-center justify-between mb-4">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                  {stat.name.includes('Revenue') ? <DollarSign className="h-5 w-5" /> : <Users className="h-5 w-5" />}
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
                  {stat.name.includes('Growth') ? `${stat.value}%` : 
                   stat.name.includes('Revenue') ? `$${stat.value.toLocaleString()}` : 
                   stat.value.toLocaleString()}
                </h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Platform Growth</CardTitle>
            <CardDescription>Sellers and Buyers growth over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                sellers: {
                  label: "Sellers",
                  color: "#8B5CF6",
                },
                buyers: {
                  label: "Buyers",
                  color: "#F97316",
                },
              }}
              className="aspect-[16/9]"
            >
              <BarChart
                data={platformData}
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
                <Bar dataKey="sellers" fill="var(--color-sellers)" stackId="a" name="Sellers" />
                <Bar dataKey="buyers" fill="var(--color-buyers)" stackId="a" name="Buyers" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Distribution</CardTitle>
            <CardDescription>Revenue by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {revenueDistribution.map((entry, index) => (
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
    </div>
  );
};

export default AdminDashboard;
