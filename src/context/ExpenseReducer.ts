import type{ Expense } from '../types';

// Actions types
export type Action =
  | { type: 'ADD_EXPENSE'; payload: Expense }
  | { type: 'DELETE_EXPENSE'; payload: string }
  | { type: 'LOAD_EXPENSES'; payload: Expense[] };

export const expenseReducer = (state: Expense[], action: Action): Expense[] => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [action.payload, ...state];
    case 'DELETE_EXPENSE':
      return state.filter((expense) => expense.id !== action.payload);
    case 'LOAD_EXPENSES':
      return action.payload;
    default:
      return state;
  }
};