import { Expense } from "../../domain/expense/entity/expense.entity";
import { ExpenseGateway } from "../../domain/expense/gateway/expense.gateway";
import { Usecase } from "../usecase";

export type CreateExpenseInputDTO = {
  name: string;
  value: number;
};

export type CreateExpenseOutputDTO = {
  id: string;
};

export class CreateExpenseUsecase
  implements Usecase<CreateExpenseInputDTO, CreateExpenseOutputDTO>
{
  private constructor(private readonly expenseGateway: ExpenseGateway) {}

  public static create(expenseGateway: ExpenseGateway) {
    return new CreateExpenseUsecase(expenseGateway);
  }

  public async execute({
    name,
    value,
  }: CreateExpenseInputDTO): Promise<CreateExpenseOutputDTO> {
    const expense = Expense.create(name, value);

    await this.expenseGateway.save(expense);

    const output = this.presentOutput(expense);
    return output;
  }

  private presentOutput(expense: Expense): CreateExpenseOutputDTO {
    const output: CreateExpenseOutputDTO = {
      id: expense.id,
    };

    return output;
  }
}
