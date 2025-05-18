
import { Property, Payment, DashboardSummary, UserSettings } from "../types";

export const mockProperties: Property[] = [
  {
    id: "prop-1",
    name: "Sunset Apartment",
    address: "123 Maple Street",
    city: "San Francisco",
    state: "CA",
    zip: "94107",
    size: 1200,
    sizeUnit: "sqft",
    type: "apartment",
    status: "rented",
    rentedSince: "2022-06-01",
    leaseEnd: "2023-05-31",
    monthlyRent: 2500,
    currentValue: 950000,
    tags: ["investment", "long-term"],
    primaryImage: "/assets/property-1.jpg",
    images: ["/assets/property-1.jpg", "/assets/property-1-interior.jpg"],
    documents: [
      {
        id: "doc-1",
        name: "Rental Agreement",
        type: "agreement",
        url: "/assets/docs/rental-agreement.pdf",
        uploadDate: "2022-05-25"
      }
    ]
  },
  {
    id: "prop-2",
    name: "Highland Villa",
    address: "456 Oak Avenue",
    city: "Austin",
    state: "TX",
    zip: "78701",
    size: 2800,
    sizeUnit: "sqft",
    type: "villa",
    status: "owned",
    purchaseDate: "2020-03-15",
    downPayment: 150000,
    currentValue: 750000,
    initialValue: 680000,
    tags: ["primary", "residential"],
    primaryImage: "/assets/property-2.jpg",
    images: ["/assets/property-2.jpg", "/assets/property-2-backyard.jpg"],
    documents: [
      {
        id: "doc-2",
        name: "Sale Deed",
        type: "deed",
        url: "/assets/docs/sale-deed.pdf",
        uploadDate: "2020-03-20"
      },
      {
        id: "doc-3",
        name: "Property Tax Receipt",
        type: "tax",
        url: "/assets/docs/tax-receipt.pdf",
        uploadDate: "2023-01-05"
      }
    ]
  },
  {
    id: "prop-3",
    name: "Downtown Loft",
    address: "789 Pine Street",
    city: "Seattle",
    state: "WA",
    zip: "98101",
    size: 950,
    sizeUnit: "sqft",
    type: "apartment",
    status: "construction",
    currentValue: 550000,
    downPayment: 110000,
    tags: ["investment", "upcoming"],
    notes: "Completion expected by December 2023",
    primaryImage: "/assets/property-3.jpg",
    images: ["/assets/property-3.jpg", "/assets/property-3-plan.jpg"],
    documents: [
      {
        id: "doc-4",
        name: "Purchase Agreement",
        type: "agreement",
        url: "/assets/docs/purchase-agreement.pdf",
        uploadDate: "2022-11-10"
      }
    ]
  }
];

export const mockPayments: Payment[] = [
  {
    id: "pay-1",
    propertyId: "prop-1",
    amount: 2500,
    type: "rent",
    status: "paid",
    dueDate: "2023-04-01",
    paidDate: "2023-04-01",
    mode: "bank",
    recurring: true,
    frequency: "monthly",
    notes: "April rent payment",
    receiptUrl: "/assets/receipts/april-rent.jpg"
  },
  {
    id: "pay-2",
    propertyId: "prop-1",
    amount: 2500,
    type: "rent",
    status: "upcoming",
    dueDate: "2023-05-01",
    recurring: true,
    frequency: "monthly",
    notes: "May rent payment"
  },
  {
    id: "pay-3",
    propertyId: "prop-2",
    amount: 3200,
    type: "emi",
    status: "paid",
    dueDate: "2023-04-10",
    paidDate: "2023-04-09",
    mode: "bank",
    recurring: true,
    frequency: "monthly",
    notes: "April mortgage payment"
  },
  {
    id: "pay-4",
    propertyId: "prop-2",
    amount: 3200,
    type: "emi",
    status: "upcoming",
    dueDate: "2023-05-10",
    recurring: true,
    frequency: "monthly",
    notes: "May mortgage payment"
  },
  {
    id: "pay-5",
    propertyId: "prop-2",
    amount: 450,
    type: "maintenance",
    status: "paid",
    dueDate: "2023-04-15",
    paidDate: "2023-04-15",
    mode: "card",
    recurring: false,
    notes: "Emergency plumbing repair",
    receiptUrl: "/assets/receipts/plumbing-receipt.jpg"
  },
  {
    id: "pay-6",
    propertyId: "prop-3",
    amount: 50000,
    type: "other",
    status: "upcoming",
    dueDate: "2023-06-30",
    recurring: false,
    notes: "Construction milestone payment"
  },
  {
    id: "pay-7",
    propertyId: "prop-2",
    amount: 1200,
    type: "tax",
    status: "overdue",
    dueDate: "2023-03-31",
    recurring: true,
    frequency: "yearly",
    notes: "Annual property tax"
  }
];

export const mockDashboardData: DashboardSummary = {
  totalProperties: 3,
  rentedProperties: 1,
  ownedProperties: 1,
  constructionProperties: 1,
  totalExpenses: 60350,
  totalRentIncome: 30000,
  upcomingPayments: mockPayments.filter(p => p.status === "upcoming"),
  monthlyExpenseBreakdown: {
    rent: 0,
    emi: 38400,
    maintenance: 1800,
    tax: 1200,
    society: 900,
    utility: 650,
    other: 50000
  }
};

export const mockUserSettings: UserSettings = {
  name: "John Doe",
  email: "john.doe@example.com",
  currency: "USD",
  darkMode: false,
  notificationsEnabled: true,
  reminderDays: 3
};

export const getPropertyById = (id: string): Property | undefined => {
  return mockProperties.find(property => property.id === id);
};

export const getPropertyPayments = (propertyId: string): Payment[] => {
  return mockPayments.filter(payment => payment.propertyId === propertyId);
};
