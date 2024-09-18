import { Request, Response } from "express";
import {
  ListEspenseUsecase,
  ListExpenseOutputDTO,
} from "../../../../../usecases/expense/list-expense-usecase";
import { HttpMethod, Route } from "../routes";

export type ListExpenseResponseDTO = {
  expenses: {
    id: string;
    name: string;
    value: number;
  }[];
};

export class ListExpenseRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly listExpenseService: ListEspenseUsecase
  ) {}

  public static create(listExpenseService: ListEspenseUsecase) {
    return new ListExpenseRoute(
      "/expenses",
      HttpMethod.GET,
      listExpenseService
    );
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      const output = await this.listExpenseService.execute();

      const responseBody = this.present(output);

      response.status(200).json(responseBody).send();
    };
  }

  getPath(): string {
    return this.path;
  }

  getMethod(): HttpMethod {
    return this.method;
  }

  private present(input: ListExpenseOutputDTO): ListExpenseResponseDTO {
    const response: ListExpenseResponseDTO = {
      expenses: input.expenses.map((expense) => ({
        id: expense.id,
        name: expense.name,
        value: expense.value,
      })),
    };

    return response;
  }
}
