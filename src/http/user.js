import axios from "axios";
import {setUser} from "../reducers/userReducer";

export const registration = async (name,surname,secondname,group,email,password) =>{
    try {
        const response = await axios.post("https://localhost:5000",{
            name,
            surname,
            secondname,
            group,
            email,
            password
        })
        alert(response.message)
    }
    catch (e){
        alert(e)
    }
}
export const login = (email,password) =>{
    return async dispatch =>{
        try {
            const response = await axios.post("https://localhost:5000",{
                email,
                password
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token',response.data.token)
            console(response.data)
        }
        catch (e){
            alert(e.response.data.message)
        }
    }
}
export const auth = () =>{
    return async dispatch =>{
        try {
            const response = await axios.get("https://localhost:5000", {
            headers:{
                token:`${localStorage.getItem('token')}`
            }
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token',response.data.token)
            console(response.data)
        }
        catch (e){
            alert(e.response.data.message)
            localStorage.removeItem('token')
        }
    }
}