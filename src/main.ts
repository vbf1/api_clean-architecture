import { Prisma } from "@prisma/client";
import { ExpenseRepository } from "./infra/repositories/expense/expense.repository";
import { prisma } from "./package/prisma/prisma";
import { CreateExpenseUsecase } from "./usecases/expense/create-expense-usecase";
import { ListEspenseUsecase } from "./usecases/expense/list-expense-usecase";
import { CreateExpenseRoute } from "./infra/api/express/routes/expense/create-expense.route";
import { ListExpenseRoute } from "./infra/api/express/routes/expense/list-expense.route";
import { ApiExpress } from "./infra/api/express/api.express";

function main() {
  const repository = ExpenseRepository.create(prisma);

  const createExpenseUsecase = CreateExpenseUsecase.create(repository);
  const listExpenseUsecase = ListEspenseUsecase.create(repository);

  const createRoute = CreateExpenseRoute.create(createExpenseUsecase);
  const listRoute = ListExpenseRoute.create(listExpenseUsecase);

  const api = ApiExpress.create([createRoute, listRoute]);
  const port = 8080;

  api.start(port);
}

main();
