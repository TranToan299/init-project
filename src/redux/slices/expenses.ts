import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IExpensesState } from '../../@types/expenses';

// ----------------------------------------------------------------------

export const getListExpenses = createAsyncThunk(
  'expenses/getListExpenses',
  async (data: any, { dispatch }) => {
    //   const {data} = await EmployeeApi.getList(data);
  }
);

const initialState: IExpensesState = {
  expensesList: [],
};

const slice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListExpenses.fulfilled, (state, action) => {
      // state.employeeList = action.payload;
    });
  },
});

// Reducer
export default slice.reducer;
