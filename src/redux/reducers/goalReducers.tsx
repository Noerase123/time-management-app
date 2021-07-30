import { AnyAction } from 'redux'

const initState = {
  data: [],
  isLoading: false
}

const GoalReducers = (state = initState, action: AnyAction) => {
  return {
    ...state
  }
}

export default GoalReducers