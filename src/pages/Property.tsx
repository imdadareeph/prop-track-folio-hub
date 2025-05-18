
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mockProperties } from "@/data/mockData";
import PageHeader from "@/components/PageHeader";
import PropertyCard from "@/components/PropertyCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search } from "lucide-react";

const Property = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  const filteredProperties = mockProperties.filter(property => {
    // Apply search filter
    const matchesSearch = searchTerm.trim() === "" || 
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.city.toLowerCase().includes(searchTerm.toLowerCase());
      
    // Apply status filter
    const matchesStatus = statusFilter === "all" || property.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="main-container animate-fade-in">
      <PageHeader 
        title="My Properties" 
        subtitle="Manage your properties"
        rightElement={
          <Button 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => navigate("/property/add")}
          >
            <Plus className="h-4 w-4" /> Add Property
          </Button>
        }
      />
      
      <div className="mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search properties..." 
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10"
          />
        </div>
        
        <Tabs defaultValue="all" onValueChange={(value) => setStatusFilter(value)}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="rented">Rented</TabsTrigger>
            <TabsTrigger value="owned">Owned</TabsTrigger>
            <TabsTrigger value="construction">Construction</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div>
        {filteredProperties.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No properties found.</p>
          </div>
        ) : (
          filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))
        )}
      </div>
    </div>
  );
};

export default Property;
