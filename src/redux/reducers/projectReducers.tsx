import { AnyAction } from 'redux'
import {ADDPROJ, DELETEPROJ} from '../constants'

const initState = {
    data: [],
    isLoading: false,
    notif: {
        snack: false,
        msg: ''
    }
}

const ProjectReducers = (state = initState, action: AnyAction) => {
    switch (action.type) {
        case ADDPROJ:
            let dataMap: any[] = state.data
            let pushData: any = action.payload
            dataMap.push(pushData)
            dataMap.reverse()
            return {
                ...state,
                data: dataMap,
                notif: action.notif,
                isLoading: false
            }
        case DELETEPROJ:
            let currentData: any[] = state.data
            let popData: any = action.payload
            currentData.filter(data => data.projName !== popData)
            return {
                ...state,
                data: currentData,
                notif: action.notif,
                isLoading: false
            }
        default: 
            return {
                ...state
            }
    }
}

export default ProjectReducers