import { AnyAction } from "redux";

const initState = {
  data: [],
  isLoading: false
}

const RoutineReducers = (state = initState, action: AnyAction) => {
  return {
    ...state
  }
}

export default RoutineReducers