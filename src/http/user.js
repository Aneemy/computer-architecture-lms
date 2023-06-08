import axios from "axios";
import {setUser} from "../reducers/userReducer";
import {createTest} from "../reducers/testReducer";

export const registration = async (name,surname,secondname,group,email,password) =>{
    try {
        const response = await axios.post("http://127.0.0.1:7777/pisyapopa",{
            surname,
            name,
            secondname,
            group,
            email,
            password
        })
        if (response.status==201){
            alert('Успешная регистрация')
        }
        else alert("Лечитесь")
    }
    catch (e){
        alert(e)
    }
}
export const login = (email,password) =>{
    return async dispatch =>{
        try {
            const response = await axios.get("http://127.0.0.1:7777/pisyapopa",{
                params: { email, password }
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token',response.data.token)
        }
        catch (e){
            alert(e.response.data.message)
        }
    }
}
export const auth = () =>{
    return async dispatch =>{
        try {
            const response = await axios.get("http://127.0.0.1:7777/pisyapopa", {
            headers:{
                token:`${localStorage.getItem('token')}`
            }
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token',response.data.token)
            console.log(response.data)
        }
        catch (e){
            alert(e.response.data.message)
            localStorage.removeItem('token')
        }
    }
}
export const question = async (pack) =>{
    try {
        const response = await axios.post("http://127.0.0.1:7777/pisyapopa", {
            pack
        })
        alert(response.message)
        }
    catch (e){
        alert(e)
    }
}