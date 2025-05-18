
import PageHeader from "@/components/PageHeader";
import StatsCard from "@/components/StatsCard";
import ChartCard from "@/components/ChartCard";
import PaymentCard from "@/components/PaymentCard";
import { Button } from "@/components/ui/button";
import { Building, DollarSign, TrendingUp, Plus } from "lucide-react";
import { mockDashboardData, mockPayments } from "@/data/mockData";

const Home = () => {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Prepare chart data for expenses by category
  const expenseData = Object.entries(mockDashboardData.monthlyExpenseBreakdown).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: value
  }));

  // Prepare property status data for pie chart
  const propertyStatusData = [
    { name: 'Rented', value: mockDashboardData.rentedProperties },
    { name: 'Owned', value: mockDashboardData.ownedProperties },
    { name: 'Construction', value: mockDashboardData.constructionProperties }
  ];

  // Get upcoming payments sorted by due date
  const upcomingPayments = [...mockDashboardData.upcomingPayments]
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);

  return (
    <div className="main-container animate-fade-in">
      <PageHeader 
        title="Property Dashboard" 
        subtitle="Welcome back! Here's an overview of your properties."
        rightElement={
          <Button size="sm" className="flex items-center gap-1">
            <Plus className="h-4 w-4" /> Add Property
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatsCard 
          title="Total Properties" 
          value={mockDashboardData.totalProperties}
          icon={<Building className="h-5 w-5 text-propertyBlue" />}
        />
        <StatsCard 
          title="Total Expenses" 
          value={formatCurrency(mockDashboardData.totalExpenses)}
          icon={<DollarSign className="h-5 w-5 text-propertyRed" />}
        />
        <StatsCard 
          title="Rent Income" 
          value={formatCurrency(mockDashboardData.totalRentIncome)}
          icon={<TrendingUp className="h-5 w-5 text-propertyGreen" />}
          change={{ value: 5.2, positive: true }}
          footer="Monthly recurring"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <ChartCard 
          title="Property Portfolio" 
          data={propertyStatusData} 
          type="pie"
          colors={['#3B82F6', '#10B981', '#F59E0B']} 
        />
        <ChartCard 
          title="Expenses by Category" 
          data={expenseData} 
          type="bar"
          colors={['#8B5CF6']} 
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Upcoming Payments</h3>
          <Button variant="link" size="sm">View All</Button>
        </div>

        <div className="space-y-3">
          {upcomingPayments.map((payment) => (
            <PaymentCard key={payment.id} payment={payment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
