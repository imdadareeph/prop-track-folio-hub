import { Property } from "@/types";
import { Building, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
    }).format(amount);
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
    <Link to={`/property/${property.id}`}>
      <div className="property-card mb-4 overflow-hidden">
        <div className="h-40 overflow-hidden bg-slate-200">
          {property.primaryImage ? (
            <img
              src={property.primaryImage}
              alt={property.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-300">
              <span className="text-slate-500">No image</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold">{property.name}</h3>
            <span className={`property-badge ${getStatusBadgeClass(property.status)}`}>
              {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
            </span>
          </div>
          <p className="text-sm text-slate-500 mb-2">{property.address}, {property.city}</p>
          <p className="text-sm text-slate-500 mb-3">{property.size} {property.sizeUnit} • {property.type}</p>
          
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm text-slate-500">Current value</span>
              <p className="font-semibold">{formatCurrency(property.currentValue)}</p>
            </div>
            {property.status === "rented" && property.monthlyRent && (
              <div className="text-right">
                <span className="text-sm text-slate-500">Monthly rent</span>
                <p className="font-semibold text-propertyGreen-dark">
                  {formatCurrency(property.monthlyRent)}
                </p>
              </div>
            )}
          </div>
          
          {property.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {property.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
