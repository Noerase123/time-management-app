import { combineReducers } from 'redux'
import FinanceReducers from './reducers/financeReducers'
import GoalReducers from './reducers/goalReducers'
import ProjectReducers from './reducers/projectReducers'
import RoutineReducers from './reducers/routineReducers'

const RootReducers = combineReducers({
    projects: ProjectReducers,
    finances: FinanceReducers,
    routines: RoutineReducers,
    goals: GoalReducers
})

export default RootReducers