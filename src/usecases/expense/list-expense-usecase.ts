import { Expense } from "../../domain/expense/entity/expense.entity";
import { ExpenseGateway } from "../../domain/expense/gateway/expense.gateway";
import { Usecase } from "../usecase";

export type ListExpenseInputDTO = void;

export type ListExpenseOutputDTO = {
  expenses: {
    id: string;
    name: string;
    value: number;
  }[];
};

export class ListEspenseUsecase
  implements Usecase<ListExpenseInputDTO, ListExpenseOutputDTO>
{
  private constructor(private readonly expenseGateway: ExpenseGateway) {}

  public static create(expenseGateway: ExpenseGateway) {
    return new ListEspenseUsecase(expenseGateway);
  }

  public async execute(): Promise<ListExpenseOutputDTO> {
    const expense = await this.expenseGateway.list();

    const output = this.presentOutput(expense);

    return output;
  }

  private presentOutput(expenses: Expense[]): ListExpenseOutputDTO {
    return {
      expenses: expenses.map((expense) => {
        return {
          id: expense.id,
          name: expense.name,
          value: expense.value,
        };
      }),
    };
  }
}
