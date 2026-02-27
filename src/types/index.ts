export type Category = 'Food' | 'Travel' | 'Rent' | 'Shopping' | 'Bills' | 'Other';
export type PaymentMethod = 'Cash' | 'Card' | 'UPI';

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: Category;
  date: string;
  paymentMethod: PaymentMethod;
  notes?: string;
}