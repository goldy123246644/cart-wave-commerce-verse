
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart, Bar, Line, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, UserPlus, UserCheck, ShoppingBag, Calendar, MapPin, Repeat } from 'lucide-react';
import { CustomerSegment } from '@/types/product';

// Mock customer data
const customerSegments: CustomerSegment[] = [
  {
    id: "new-customers",
    name: "New Customers",
    count: 1245,
    averageOrderValue: 85.40,
    loyaltyScore: 2.3,
    demographics: {
      ageRange: "25-34",
      location: "Urban",
      gender: "Mixed"
    },
    topCategories: [
      { category: "Electronics", percentage: 35 },
      { category: "Clothing", percentage: 30 },
      { category: "Home & Kitchen", percentage: 20 },
      { category: "Books", percentage: 15 }
    ]
  },
  {
    id: "loyal-customers",
    name: "Loyal Customers",
    count: 3782,
    averageOrderValue: 120.75,
    loyaltyScore: 8.7,
    demographics: {
      ageRange: "35-44",
      location: "Suburban",
      gender: "Mixed"
    },
    topCategories: [
      { category: "Electronics", percentage: 40 },
      { category: "Home & Kitchen", percentage: 25 },
      { category: "Beauty", percentage: 20 },
      { category: "Books", percentage: 15 }
    ]
  },
  {
    id: "at-risk-customers",
    name: "At-Risk Customers",
    count: 968,
    averageOrderValue: 65.30,
    loyaltyScore: 4.1,
    demographics: {
      ageRange: "Mixed",
      location: "Mixed",
      gender: "Mixed"
    },
    topCategories: [
      { category: "Electronics", percentage: 30 },
      { category: "Books", percentage: 25 },
      { category: "Clothing", percentage: 25 },
      { category: "Sports", percentage: 20 }
    ]
  }
];

const purchaseFrequency = [
  { name: "Weekly", value: 15 },
  { name: "Bi-Weekly", value: 25 },
  { name: "Monthly", value: 35 },
  { name: "Quarterly", value: 20 },
  { name: "Yearly", value: 5 }
];

const retentionData = [
  { month: "Jan", retention: 95 },
  { month: "Feb", retention: 93 },
  { month: "Mar", retention: 90 },
  { month: "Apr", retention: 88 },
  { month: "May", retention: 85 },
  { month: "Jun", retention: 82 },
  { month: "Jul", retention: 80 },
  { month: "Aug", retention: 83 },
  { month: "Sep", retention: 86 },
  { month: "Oct", retention: 88 },
  { month: "Nov", retention: 90 },
  { month: "Dec", retention: 92 }
];

const COLORS = ['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9', '#9F9EA1'];

const CustomerAnalytics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSegment, setSelectedSegment] = useState(customerSegments[0].id);

  const { data: customers } = useQuery({
    queryKey: ['customerData'],
    queryFn: () => {
      return customerSegments;
    },
  });

  const selectedCustomerSegment = customers?.find(segment => segment.id === selectedSegment) || customerSegments[0];

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Customer Analytics</h1>
      
      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="segments">Segments</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
          <TabsTrigger value="retention">Retention</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          {/* Customer Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="py-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                    <Users className="h-5 w-5" />
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Customers</p>
                  <h3 className="text-2xl font-bold">12,543</h3>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="py-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                    <UserPlus className="h-5 w-5" />
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">New Customers (30d)</p>
                  <h3 className="text-2xl font-bold">1,245</h3>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="py-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                    <ShoppingBag className="h-5 w-5" />
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Order Value</p>
                  <h3 className="text-2xl font-bold">$92.78</h3>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="py-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                    <Repeat className="h-5 w-5" />
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Repeat Purchase Rate</p>
                  <h3 className="text-2xl font-bold">42%</h3>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Customer Segments Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Segments</CardTitle>
                <CardDescription>Distribution by customer type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'New Customers', value: 25 },
                          { name: 'Occasional', value: 30 },
                          { name: 'Regular', value: 30 },
                          { name: 'Loyal', value: 15 }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {purchaseFrequency.map((entry, index) => (
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
                <CardTitle>Purchase Frequency</CardTitle>
                <CardDescription>How often customers make purchases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={purchaseFrequency}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {purchaseFrequency.map((entry, index) => (
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
          
          {/* Retention Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Retention Trends</CardTitle>
              <CardDescription>Monthly retention rates over the past year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={retentionData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[75, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, "Retention Rate"]} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="retention"
                      stroke="#8B5CF6"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="segments" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 mb-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Segments</CardTitle>
                <CardDescription>Select a segment to view details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  {customerSegments.map((segment) => (
                    <button
                      key={segment.id}
                      onClick={() => setSelectedSegment(segment.id)}
                      className={`px-4 py-2 rounded-md transition-colors ${
                        selectedSegment === segment.id 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {segment.name}
                    </button>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 border rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Segment Size</h3>
                    </div>
                    <p className="text-2xl font-bold">{selectedCustomerSegment.count.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">total customers</p>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <ShoppingBag className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Average Order</h3>
                    </div>
                    <p className="text-2xl font-bold">${selectedCustomerSegment.averageOrderValue.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">per purchase</p>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <UserCheck className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Loyalty Score</h3>
                    </div>
                    <p className="text-2xl font-bold">{selectedCustomerSegment.loyaltyScore.toFixed(1)}/10</p>
                    <p className="text-sm text-muted-foreground">customer rating</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-4">Demographics</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">Age Range</p>
                          <p className="font-medium">{selectedCustomerSegment.demographics?.ageRange || "Mixed"}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">Location</p>
                          <p className="font-medium">{selectedCustomerSegment.demographics?.location || "Mixed"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-4">Top Categories</h3>
                    <div className="space-y-3">
                      {selectedCustomerSegment.topCategories.map((category, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span>{category.category}</span>
                            <span className="text-sm font-medium">{category.percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${category.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="behavior" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Browse-to-Buy Funnel</CardTitle>
              <CardDescription>Conversion path of visitors to customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={[
                      { name: "Site Visitors", value: 100000 },
                      { name: "Product Views", value: 45000 },
                      { name: "Add to Cart", value: 22000 },
                      { name: "Checkout Started", value: 15000 },
                      { name: "Purchases", value: 10000 }
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
                    <Tooltip formatter={(value) => [value.toLocaleString(), "Count"]} />
                    <Bar 
                      dataKey="value" 
                      fill="#8B5CF6" 
                      name="Funnel Steps"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="retention" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cohort Retention</CardTitle>
              <CardDescription>Customer retention by acquisition cohort</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="p-3 text-left font-medium">Cohort</th>
                      <th className="p-3 text-center font-medium">Month 1</th>
                      <th className="p-3 text-center font-medium">Month 2</th>
                      <th className="p-3 text-center font-medium">Month 3</th>
                      <th className="p-3 text-center font-medium">Month 4</th>
                      <th className="p-3 text-center font-medium">Month 5</th>
                      <th className="p-3 text-center font-medium">Month 6</th>
                    </tr>
                  </thead>
                  <tbody>
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, i) => (
                      <tr key={month} className="border-b">
                        <td className="p-3 font-medium">{month} 2025</td>
                        {[100, 75, 60, 50, 45, 40].slice(0, 6-i).map((value, j) => (
                          <td key={j} className="p-3">
                            <div className="flex flex-col items-center">
                              <span className="font-medium">{value}%</span>
                              <div className="w-full mt-1 bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    value > 70 ? 'bg-green-500' : 
                                    value > 50 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`} 
                                  style={{ width: `${value}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                        ))}
                        {[...Array(i)].map((_, j) => (
                          <td key={`empty-${j}`} className="p-3"></td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerAnalytics;
