import { Expense } from "../entity/expense.entity";

export interface ExpenseGateway {
  save(expense: Expense): Promise<void>;
  list(): Promise<Expense[]>;
}
