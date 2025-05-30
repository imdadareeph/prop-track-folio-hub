
import PageHeader from "@/components/PageHeader";
import StatsCard from "@/components/StatsCard";
import ChartCard from "@/components/ChartCard";
import PaymentCard from "@/components/PaymentCard";
import { Button } from "@/components/ui/button";
import { Building, DollarSign, TrendingUp, Plus } from "lucide-react";
import { mockDashboardSummary, mockPayments } from "@/data/mockData";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";

const Home = () => {
  const { user, loading } = useAuth();

  // Format currency in AED
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Prepare chart data for expenses by category
  const expenseData = Object.entries(mockDashboardSummary.monthlyExpenseBreakdown).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: value
  }));

  // Prepare property status data for pie chart
  const propertyStatusData = [
    { name: 'Rented', value: mockDashboardSummary.rentedProperties },
    { name: 'Owned', value: mockDashboardSummary.ownedProperties },
    { name: 'Construction', value: mockDashboardSummary.constructionProperties }
  ];

  // Get upcoming payments sorted by due date
  const upcomingPayments = [...mockDashboardSummary.upcomingPayments]
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);

  if (loading) {
    return (
      <div className="main-container animate-fade-in">
        <div className="flex items-center justify-center h-64">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container animate-fade-in">
      <PageHeader 
        title="Property Dashboard" 
        subtitle={user ? `Welcome back, ${user.user_metadata?.full_name || user.email}!` : "Welcome back! Here's an overview of your properties."}
        rightElement={
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button size="sm" className="flex items-center gap-1">
              <Plus className="h-4 w-4" /> Add Property
            </Button>
          </div>
        }
      />

      {user && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center gap-3">
            {user.user_metadata?.avatar_url && (
              <img 
                src={user.user_metadata.avatar_url} 
                alt="Profile" 
                className="w-12 h-12 rounded-full"
              />
            )}
            <div>
              <h3 className="font-semibold text-lg">{user.user_metadata?.full_name || 'User'}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{user.email}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatsCard 
          title="Total Properties" 
          value={mockDashboardSummary.totalProperties}
          icon={<Building className="h-5 w-5 text-propertyBlue" />}
        />
        <StatsCard 
          title="Total Expenses" 
          value={formatCurrency(mockDashboardSummary.totalExpenses)}
          icon={<DollarSign className="h-5 w-5 text-propertyRed" />}
        />
        <StatsCard 
          title="Rent Expense" 
          value={formatCurrency(mockDashboardSummary.totalRentIncome)}
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
