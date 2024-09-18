import { PrismaClient } from "@prisma/client";
import { Expense } from "../../../domain/expense/entity/expense.entity";
import { ExpenseGateway } from "../../../domain/expense/gateway/expense.gateway";

export class ExpenseRepository implements ExpenseGateway {
  private constructor(private readonly prismaClient: PrismaClient) {}

  public static create(prismaClient: PrismaClient) {
    return new ExpenseRepository(prismaClient);
  }

  public async save(expense: Expense): Promise<void> {
    const data = {
      id: expense.id,
      name: expense.name,
      value: expense.value,
    };

    await this.prismaClient.expense.create({
      data,
    });
  }

  public async list(): Promise<Expense[]> {
    const expenses = await this.prismaClient.expense.findMany();

    const expenseList = expenses.map((e) => {
      const expense = Expense.with({
        id: e.id,
        name: e.name,
        value: e.value,
      });
      return expense;
    });
    return expenseList;
  }
}
