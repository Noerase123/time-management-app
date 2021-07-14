import { combineReducers } from 'redux'
import ProjectReducers from './reducers/projectReducers'

const RootReducers = combineReducers({
    project: ProjectReducers
})

export default RootReducers