const SET_USER = "SET_USER";
const DEL_USER = "DEL_USER"

const defaultState = {
    currentUser: {},
    isAuth:false,
    isTeacher: false
}

export default function userReducer (state = defaultState,action){
    switch (action.type) {
        case SET_USER:
            return{
                ...state,
                currentUser: action.payload.user,
                isAuth: true,
                isTeacher:action.payload.isTeacher
            }
        case DEL_USER:{
            localStorage.removeItem('token')
            localStorage.removeItem('isTeacher')
            return {
                ...defaultState
            }
            }
        default:
            return state
    }
}
export const setUser = (user,isTeacher) => ({type:SET_USER,payload:{user:user,isTeacher:isTeacher}})
export const delUser = () =>({type:DEL_USER})