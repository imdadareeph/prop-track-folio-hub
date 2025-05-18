
export type PropertyType = 'apartment' | 'villa' | 'house' | 'land' | 'commercial';

export type PropertyStatus = 'rented' | 'owned' | 'construction';

export type PaymentStatus = 'paid' | 'upcoming' | 'overdue';

export type PaymentType = 'rent' | 'emi' | 'maintenance' | 'tax' | 'society' | 'utility' | 'other';

export type PaymentMode = 'cash' | 'bank' | 'card' | 'upi' | 'other';

export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  size: number; // in square feet
  sizeUnit: 'sqft' | 'sqm';
  type: PropertyType;
  status: PropertyStatus;
  purchaseDate?: string; // ISO date string
  rentedSince?: string; // ISO date string
  leaseEnd?: string; // ISO date string
  monthlyRent?: number;
  downPayment?: number;
  currentValue: number;
  initialValue?: number;
  tags: string[];
  notes?: string;
  primaryImage?: string;
  images: string[];
  documents: Document[];
}

export interface Document {
  id: string;
  name: string;
  type: 'deed' | 'agreement' | 'noc' | 'tax' | 'other';
  url: string;
  uploadDate: string; // ISO date string
}

export interface Payment {
  id: string;
  propertyId: string;
  amount: number;
  type: PaymentType;
  status: PaymentStatus;
  dueDate: string; // ISO date string
  paidDate?: string; // ISO date string
  mode?: PaymentMode;
  recurring: boolean;
  frequency?: 'monthly' | 'quarterly' | 'yearly';
  notes?: string;
  receiptUrl?: string;
}

export interface DashboardSummary {
  totalProperties: number;
  rentedProperties: number;
  ownedProperties: number;
  constructionProperties: number;
  totalExpenses: number;
  totalRentIncome: number;
  upcomingPayments: Payment[];
  monthlyExpenseBreakdown: Record<PaymentType, number>;
}

export interface UserSettings {
  name: string;
  email?: string;
  currency: string;
  darkMode: boolean;
  notificationsEnabled: boolean;
  reminderDays: number; // days before due date to send reminder
}
