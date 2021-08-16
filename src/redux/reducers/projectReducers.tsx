import { AnyAction } from 'redux'
import {ADDPROJ, DELETEPROJ, ADDTASK} from '../constants'

interface IProject {
    projects: any[]
    projectID: string
    data: any
}

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
            return {
                ...state,
                data: dataMap,
                notif: action.notif,
                isLoading: false
            }
        case ADDTASK:
            let {projects, projectID, data}: IProject = action.payload
            projects.map(project => {
                if (project.projectID === projectID) {
                    project.tasks.push(data)
                }
            })
            return {
                ...state,
                data: projects,
                notif: action.notif,
                isLoading: false
            }
        case DELETEPROJ:
            return {
                ...state,
                data: action.payload,
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