import { deleteAsync, getAsync, postAsync, putAsync } from './http-client';

const ExpensesApi = {
  getList: (data?: any) => {
    return getAsync(`/expenses`, data);
  },
  post: (data?: any) => {
    return postAsync(`/expenses`, data);
  },
  put: (id: number | string, payload: any) => {
    return putAsync(`/expenses/${id}`, payload);
  },
  delete: (id: number | string) => {
    return deleteAsync(`/expenses/${id}`);
  },
};

export default ExpensesApi;
