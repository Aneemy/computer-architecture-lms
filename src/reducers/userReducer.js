const SET_USER = "SET_USER";
const DEL_USER = "DEL_USER"

const defaultState = {
    currentUser: {},
    isAuth:false
}

export default function userReducer (state = defaultState,action){
    switch (action.type) {
        case SET_USER:
            return{
                ...state,
                currentUser: action.payload,
                isAuth: true
            }
        case DEL_USER:
            return {
                ...defaultState
            }
        default:
            return state
    }
}
export const setUser = user => ({type:SET_USER,payload:user})
export const delUser = () =>({type:DEL_USER})