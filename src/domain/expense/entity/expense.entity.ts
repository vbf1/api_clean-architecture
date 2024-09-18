export type TExpense = {
  id: string;
  name: string;
  value: number;
};

export class Expense {
  private constructor(private props: TExpense) {}

  public static create(name: string, value: number) {
    return new Expense({
      id: crypto.randomUUID().toString(),
      name,
      value,
    });
  }

  public static with(props: TExpense) {
    return new Expense(props);
  }

  public get id() {
    return this.props.id;
  }

  public get name() {
    return this.props.name;
  }

  public get value() {
    return this.props.value;
  }
}
