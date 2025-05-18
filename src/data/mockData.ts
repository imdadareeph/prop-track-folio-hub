
import { Property, Payment, DashboardSummary, UserSettings } from "../types";

export const mockProperties: Property[] = [
  {
    id: "prop-1",
    name: "Marina Heights Apartment",
    address: "Dubai Marina, Tower 3",
    city: "Dubai",
    state: "Dubai",
    zip: "12345",
    size: 120,
    sizeUnit: "sqm",
    type: "apartment",
    status: "owned",
    purchaseDate: "2021-06-01",
    downPayment: 500000,
    currentValue: 1500000,
    initialValue: 1350000,
    tags: ["investment", "residential"],
    primaryImage: "/assets/property-1.jpg",
    images: ["/assets/property-1.jpg", "/assets/property-1-interior.jpg"],
    documents: [
      {
        id: "doc-1",
        name: "Sale Agreement",
        type: "deed",
        url: "/assets/docs/sale-deed.pdf",
        uploadDate: "2021-05-25"
      }
    ]
  },
  {
    id: "prop-2",
    name: "Palm Jumeirah Villa",
    address: "Palm Jumeirah, Frond D",
    city: "Dubai",
    state: "Dubai",
    zip: "23456",
    size: 350,
    sizeUnit: "sqm",
    type: "villa",
    status: "owned",
    purchaseDate: "2019-03-15",
    downPayment: 2000000,
    currentValue: 8500000,
    initialValue: 7200000,
    tags: ["primary", "luxury"],
    primaryImage: "/assets/property-2.jpg",
    images: ["/assets/property-2.jpg", "/assets/property-2-backyard.jpg"],
    documents: [
      {
        id: "doc-2",
        name: "Sale Deed",
        type: "deed",
        url: "/assets/docs/sale-deed.pdf",
        uploadDate: "2019-03-20"
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
    address: "Burj Khalifa District",
    city: "Dubai",
    state: "Dubai",
    zip: "34567",
    size: 95,
    sizeUnit: "sqm",
    type: "apartment",
    status: "construction",
    currentValue: 1200000,
    downPayment: 300000,
    tags: ["investment", "upcoming"],
    notes: "Completion expected by December 2024",
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
    amount: 8500,
    type: "emi",
    status: "paid",
    dueDate: "2023-04-01",
    paidDate: "2023-04-01",
    mode: "bank",
    recurring: true,
    frequency: "monthly",
    notes: "April mortgage payment",
    receiptUrl: "/assets/receipts/april-rent.jpg"
  },
  {
    id: "pay-2",
    propertyId: "prop-1",
    amount: 8500,
    type: "emi",
    status: "upcoming",
    dueDate: "2023-05-01",
    recurring: true,
    frequency: "monthly",
    notes: "May mortgage payment"
  },
  {
    id: "pay-3",
    propertyId: "prop-2",
    amount: 22000,
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
    amount: 22000,
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
    amount: 2200,
    type: "maintenance",
    status: "paid",
    dueDate: "2023-04-15",
    paidDate: "2023-04-15",
    mode: "card",
    recurring: false,
    notes: "Emergency AC repair",
    receiptUrl: "/assets/receipts/plumbing-receipt.jpg"
  },
  {
    id: "pay-6",
    propertyId: "prop-3",
    amount: 300000,
    type: "other",
    status: "upcoming",
    dueDate: "2023-06-30",
    recurring: false,
    notes: "Construction milestone payment"
  },
  {
    id: "pay-7",
    propertyId: "prop-2",
    amount: 12000,
    type: "tax",
    status: "overdue",
    dueDate: "2023-03-31",
    recurring: true,
    frequency: "yearly",
    notes: "Annual property tax"
  }
];

export const mockDashboardSummary: DashboardSummary = {
  totalProperties: 3,
  rentedProperties: 0,
  ownedProperties: 2,
  constructionProperties: 1,
  totalExpenses: 52000,
  totalRentIncome: 0,
  upcomingPayments: [
    {
      id: "pay-2",
      propertyId: "prop-1",
      amount: 8500,
      type: "emi",
      status: "upcoming",
      dueDate: "2023-05-01",
      recurring: true,
      frequency: "monthly",
      notes: "May mortgage payment"
    },
    {
      id: "pay-4",
      propertyId: "prop-2",
      amount: 22000,
      type: "emi",
      status: "upcoming",
      dueDate: "2023-05-10",
      recurring: true,
      frequency: "monthly",
      notes: "May mortgage payment"
    },
    {
      id: "pay-6",
      propertyId: "prop-3",
      amount: 300000,
      type: "other",
      status: "upcoming",
      dueDate: "2023-06-30",
      recurring: false,
      notes: "Construction milestone payment"
    }
  ],
  monthlyExpenseBreakdown: {
    rent: 0,
    emi: 30500,
    maintenance: 2200,
    tax: 12000,
    society: 0,
    utility: 0,
    other: 300000
  }
};

export const mockUserSettings: UserSettings = {
  name: "Ahmed Al Mansoor",
  email: "ahmed@example.com",
  currency: "AED",
  darkMode: false,
  notificationsEnabled: true,
  reminderDays: 7
};

export const getPropertyById = (id: string): Property | undefined => {
  return mockProperties.find(property => property.id === id);
};

export const getPropertyPayments = (propertyId: string): Payment[] => {
  return mockPayments.filter(payment => payment.propertyId === propertyId);
};
