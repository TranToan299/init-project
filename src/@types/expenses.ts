// ----------------------------------------------------------------------



export type IExpenses = {
  id: number | string ,
  date: any,
  type: string,
  value?: number,
  amount?: number,
  note?: string
  
};
export type IExpensesState = {
  expensesList: IExpenses[]
};

