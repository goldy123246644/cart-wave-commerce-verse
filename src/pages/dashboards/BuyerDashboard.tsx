
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ShoppingBag, Package, CreditCard, Clock } from 'lucide-react';

const purchaseHistory = [
  { month: 'Jan', spent: 420 },
  { month: 'Feb', spent: 380 },
  { month: 'Mar', spent: 510 },
  { month: 'Apr', spent: 480 },
  { month: 'May', spent: 560 },
  { month: 'Jun', spent: 620 },
];

const categorySpending = [
  { name: 'Electronics', value: 45 },
  { name: 'Clothing', value: 25 },
  { name: 'Books', value: 15 },
  { name: 'Home', value: 15 },
];

const COLORS = ['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9'];

const recentOrders = [
  { id: '#1234', product: 'Wireless Headphones', status: 'Delivered', date: '2025-04-15', amount: 129.99 },
  { id: '#1235', product: 'Smart Watch', status: 'In Transit', date: '2025-04-20', amount: 249.99 },
  { id: '#1236', product: 'Laptop Stand', status: 'Processing', date: '2025-04-25', amount: 39.99 },
];

const BuyerDashboard = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">My Shopping Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="py-6">
            <div className="flex items-center space-x-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                <ShoppingBag className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <h3 className="text-2xl font-bold">24</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-6">
            <div className="flex items-center space-x-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                <Package className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm text-muted-foreground">In Transit</p>
                <h3 className="text-2xl font-bold">2</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-6">
            <div className="flex items-center space-x-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                <CreditCard className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <h3 className="text-2xl font-bold">$2,469</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-6">
            <div className="flex items-center space-x-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                <Clock className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Delivery</p>
                <h3 className="text-2xl font-bold">3.2 days</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Purchase History</CardTitle>
            <CardDescription>Monthly spending overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={purchaseHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="spent" stroke="#8B5CF6" name="Amount Spent ($)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
            <CardDescription>Distribution of purchases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categorySpending}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categorySpending.map((entry, index) => (
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

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Status of your latest purchases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{order.product}</p>
                  <p className="text-sm text-muted-foreground">{order.id} • {order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${order.amount}</p>
                  <p className={`text-sm ${
                    order.status === 'Delivered' ? 'text-green-600' :
                    order.status === 'In Transit' ? 'text-blue-600' : 'text-yellow-600'
                  }`}>
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuyerDashboard;
