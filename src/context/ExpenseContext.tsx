import React, { createContext, useContext, useState, useEffect } from 'react';


export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  paymentMethod: string;
}

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
}

// Context banana
export const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // LocalStorage se data load karna
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('my_expenses');
    return saved ? JSON.parse(saved) : [];
  });

  // Data save 
  useEffect(() => {
    localStorage.setItem('my_expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (newExpense: Expense) => {
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};

// Custom hook
export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};