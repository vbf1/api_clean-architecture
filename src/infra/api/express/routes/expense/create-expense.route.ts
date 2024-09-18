import { Request, Response } from "express";
import {
  CreateExpenseInputDTO,
  CreateExpenseUsecase,
} from "../../../../../usecases/expense/create-expense-usecase";
import { HttpMethod, Route } from "../routes";

export type CreateExpenseResponseDto = {
  id: string;
};

export class CreateExpenseRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createExpenseService: CreateExpenseUsecase
  ) {}

  public static create(createExpenseService: CreateExpenseUsecase) {
    return new CreateExpenseRoute(
      "/expenses",
      HttpMethod.POST,
      createExpenseService
    );
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      const { name, value } = request.body;

      const input: CreateExpenseInputDTO = {
        name,
        value,
      };

      const output: CreateExpenseResponseDto =
        await this.createExpenseService.execute(input);

      const responseBody = this.present(output);

      response.status(201).json(responseBody).send();
    };
  }

  public getPath(): string {
    return this.path;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }

  private present(input: CreateExpenseResponseDto): CreateExpenseResponseDto {
    const response = { id: input.id };

    return response;
  }
}
