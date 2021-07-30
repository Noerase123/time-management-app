import { combineReducers } from 'redux'
import FinanceReducers from './reducers/financeReducers'
import GoalReducers from './reducers/goalReducers'
import ProjectReducers from './reducers/projectReducers'
import RoutineReducers from './reducers/routineReducers'

const RootReducers = combineReducers({
    project: ProjectReducers,
    finance: FinanceReducers,
    routine: RoutineReducers,
    goal: GoalReducers
})

export default RootReducers