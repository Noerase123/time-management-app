
import {ADDPROJ, DELETEPROJ} from '../constants'

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