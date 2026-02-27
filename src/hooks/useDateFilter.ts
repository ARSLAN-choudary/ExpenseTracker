import { useState, useMemo } from 'react';
import type{ Expense } from '../types';

export const useDateFilter = (expenses: Expense[]) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense => {
      const date = new Date(expense.date);
      return date.getMonth() === selectedMonth && date.getFullYear() === selectedYear;
    });
  }, [expenses, selectedMonth, selectedYear]);

  return { filteredExpenses, selectedMonth, setSelectedMonth, selectedYear, setSelectedYear };
};