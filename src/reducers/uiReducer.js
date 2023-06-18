const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL"

const defaultState = false

export default function uiReducer (state = defaultState,action){
    switch (action.type){
        case OPEN_MODAL:
            return true
        case CLOSE_MODAL:
            return false
    default:
        return state
    }
}


export const openModal = () =>({type:OPEN_MODAL})
export const closeModal = () =>({type:CLOSE_MODAL})