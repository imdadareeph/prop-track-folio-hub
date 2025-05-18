
import { Payment } from "../types";
import { mockProperties } from "../data/mockData";
import { format } from "date-fns";
import { CreditCard, Receipt } from "lucide-react";

interface PaymentCardProps {
  payment: Payment;
}

const PaymentCard = ({ payment }: PaymentCardProps) => {
  const property = mockProperties.find(p => p.id === payment.propertyId);
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "paid":
        return "payment-badge-paid";
      case "upcoming":
        return "payment-badge-upcoming";
      case "overdue":
        return "payment-badge-overdue";
      default:
        return "";
    }
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy");
  };

  const getIconByType = () => {
    switch (payment.type) {
      case "emi":
        return <CreditCard className="h-10 w-10 text-propertyBlue p-2 bg-propertyBlue-light/30 rounded-xl" />;
      default:
        return <Receipt className="h-10 w-10 text-propertyGreen p-2 bg-propertyGreen-light/30 rounded-xl" />;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 mb-4 border border-slate-100 dark:border-slate-700">
      <div className="flex items-start">
        <div className="mr-3">
          {getIconByType()}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-semibold">
              {payment.type.charAt(0).toUpperCase() + payment.type.slice(1)} Payment
            </h3>
            <span className={`payment-badge ${getStatusBadgeClass(payment.status)}`}>
              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
            </span>
          </div>
          {property && (
            <p className="text-sm text-slate-500 mb-1">{property.name}</p>
          )}
          <p className="text-sm text-slate-500">
            {payment.status === "paid" && payment.paidDate 
              ? `Paid on ${formatDate(payment.paidDate)}` 
              : `Due on ${formatDate(payment.dueDate)}`}
          </p>
          <div className="mt-2 flex justify-between items-center">
            <p className="font-semibold text-lg">{formatCurrency(payment.amount)}</p>
            {payment.recurring && (
              <span className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">
                {payment.frequency?.charAt(0).toUpperCase() + payment.frequency?.slice(1)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
