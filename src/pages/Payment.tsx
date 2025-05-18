
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockPayments, mockProperties } from "@/data/mockData";
import PageHeader from "@/components/PageHeader";
import PaymentCard from "@/components/PaymentCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";

const Payment = () => {
  const [propertyFilter, setPropertyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  const filteredPayments = mockPayments.filter(payment => {
    // Apply property filter
    const matchesProperty = propertyFilter === "all" || payment.propertyId === propertyFilter;
    
    // Apply status filter
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    
    return matchesProperty && matchesStatus;
  });

  return (
    <div className="main-container animate-fade-in">
      <PageHeader 
        title="Payments" 
        subtitle="Manage your property payments"
        rightElement={
          <Button 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => navigate("/payment/add")}
          >
            <Plus className="h-4 w-4" /> Add Payment
          </Button>
        }
      />
      
      <div className="mb-6">
        <div className="mb-4">
          <Select value={propertyFilter} onValueChange={setPropertyFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by property" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Properties</SelectItem>
              {mockProperties.map(property => (
                <SelectItem key={property.id} value={property.id}>{property.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Tabs defaultValue="all" onValueChange={(value) => setStatusFilter(value)}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div>
        {filteredPayments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No payments found.</p>
          </div>
        ) : (
          filteredPayments.map(payment => (
            <PaymentCard key={payment.id} payment={payment} />
          ))
        )}
      </div>
    </div>
  );
};

export default Payment;
