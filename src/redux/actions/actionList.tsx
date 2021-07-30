import {ADDPROJ, DELETEPROJ, VIEWTASK, ADDTASK, DELETETASK, UPDATETASK} from '../constants'

export const addProject = (payload: any) => {
    return {
        type: ADDPROJ,
        notif: {
            snack: true,
            msg: 'Project Added'
        },
        payload: payload
    }
}

export const deleteProject = (payload: any) => {
    return {
        type: DELETEPROJ,
        notif: {
            snack: true,
            msg: 'Project Deleted'
        },
        payload: payload
    }
}

export const addTask = (projects: any[], projectID: string, data: any) => {
    return {
        type: ADDTASK,
        notif: {
            snack: true,
            msg: 'Task Added'
        },
        payload: {
            projects,
            projectID,
            data
        }
    }
}