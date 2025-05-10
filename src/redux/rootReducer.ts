import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import expensesReducer from './slices/expenses';


// ----------------------------------------------------------------------

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};


const rootReducer = combineReducers({
  expenses: expensesReducer,

});

export default rootReducer;
