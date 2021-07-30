import { AnyAction } from 'redux'

const initState = {
  expenses: [],
  income: [],
  savings: [],
  reimbursement: [],
  isLoading: false
}

const FinanceReducers = (state = initState, action: AnyAction) => {
  return {
    ...state
  }
}

export default FinanceReducers