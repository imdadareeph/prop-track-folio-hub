
import { useParams, Link } from "react-router-dom";
import { getPropertyById, getPropertyPayments } from "@/data/mockData";
import PageHeader from "@/components/PageHeader";
import { Building, Calendar, Banknote, MapPin, ArrowLeft, Plus, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";
import PropertyCard from "@/components/PropertyCard";
import MediaCard from "@/components/MediaCard";
import PaymentCard from "@/components/PaymentCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const property = getPropertyById(id || "");
  const payments = getPropertyPayments(id || "");

  if (!property) {
    return (
      <div className="main-container">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-red-500">Property Not Found</h2>
          <p className="mt-2">The property you are looking for does not exist.</p>
          <Button asChild className="mt-4">
            <a href="/property">Back to Properties</a>
          </Button>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return format(parseISO(dateString), "MMMM d, yyyy");
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "rented":
        return "property-badge-rented";
      case "owned":
        return "property-badge-owned";
      case "construction":
        return "property-badge-construction";
      default:
        return "";
    }
  };

  return (
    <div className="main-container animate-fade-in">
      <PageHeader 
        title={property.name}
        subtitle={property.address}
        rightElement={
          <Button size="sm" className="flex items-center gap-1">
            <Edit className="h-4 w-4" /> Edit
          </Button>
        }
      />

      <div className="mb-6">
        {property.primaryImage ? (
          <div className="rounded-2xl overflow-hidden h-64 mb-4">
            <img
              src={property.primaryImage}
              alt={property.name}
              className="w-full h-full object-cover"
            />
          </div>
        ) : null}

        <div className="flex items-center mb-4 flex-wrap gap-2">
          <span className={`property-badge ${getStatusBadgeClass(property.status)}`}>
            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          </span>
          <span className="property-badge bg-slate-100 dark:bg-slate-700">
            {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
          </span>
          {property.tags.map((tag, index) => (
            <span 
              key={index}
              className="property-badge bg-slate-100 dark:bg-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Building className="h-4 w-4" /> 
                Property Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Type</span>
                  <span className="font-medium">
                    {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Size</span>
                  <span className="font-medium">
                    {property.size} {property.sizeUnit}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Location</span>
                  <span className="font-medium">
                    {property.city}, {property.state}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Status</span>
                  <span className="font-medium">
                    {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Current Value</span>
                  <span className="font-medium">
                    {formatCurrency(property.currentValue)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-4 w-4" /> 
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {property.status === 'owned' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Purchase Date</span>
                      <span className="font-medium">{formatDate(property.purchaseDate)}</span>
                    </div>
                    {property.downPayment && (
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-500">Down Payment</span>
                        <span className="font-medium">{formatCurrency(property.downPayment)}</span>
                      </div>
                    )}
                    {property.initialValue && (
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-500">Initial Value</span>
                        <span className="font-medium">{formatCurrency(property.initialValue)}</span>
                      </div>
                    )}
                  </>
                )}
                
                {property.status === 'rented' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Rented Since</span>
                      <span className="font-medium">{formatDate(property.rentedSince)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Lease End</span>
                      <span className="font-medium">{formatDate(property.leaseEnd)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Monthly Rent</span>
                      <span className="font-medium">{formatCurrency(property.monthlyRent || 0)}</span>
                    </div>
                  </>
                )}
                
                {property.status === 'construction' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Down Payment</span>
                      <span className="font-medium">{formatCurrency(property.downPayment || 0)}</span>
                    </div>
                    {property.notes && (
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-500">Notes</span>
                        <span className="font-medium">{property.notes}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-8">
        <Tabs defaultValue="payments">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="documents">Documents & Images</TabsTrigger>
          </TabsList>
          <TabsContent value="payments" className="pt-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Property Payments</h3>
              <Button size="sm" className="flex items-center gap-1">
                <Plus className="h-4 w-4" /> Add Payment
              </Button>
            </div>
            
            {payments.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-slate-500">No payments found for this property.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {payments.map(payment => (
                  <PaymentCard key={payment.id} payment={payment} />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="documents" className="pt-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Documents</h3>
              {property.documents.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-slate-500">No documents found for this property.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                  {property.documents.map(doc => (
                    <MediaCard 
                      key={doc.id}
                      title={doc.name}
                      url={doc.url}
                      type="document"
                      date={doc.uploadDate}
                    />
                  ))}
                </div>
              )}
              
              <h3 className="text-lg font-semibold mb-4">Images</h3>
              {property.images.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-slate-500">No images found for this property.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {property.images.map((image, index) => (
                    <MediaCard 
                      key={`img-${index}`}
                      title={`${property.name} Image ${index + 1}`}
                      url={image}
                      type="image"
                    />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PropertyDetail;
