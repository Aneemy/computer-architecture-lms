import axios from "axios";
import {setUser} from "../reducers/userReducer";
import jwtDecode from "jwt-decode";

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
const secretKey = "Grib"
export const registration = async (name,surname,secondname,group,email,password) =>{
    try {
        const response = await axios.post("http://192.168.1.101:8080/students",{
            surname:surname,
            name:name,
            secondname:secondname,
            group:group,
            email:email,
            password:password
        },
            {headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':''}})
        if (response.status==201){
            alert('Успешная регистрация')
        }
        else alert("Лечитесь")
        console.log(response.data)
    }
    catch (e){
        alert(e)
    }
}
export const login = (email,password) =>{
    return async dispatch =>{
        try {
            const response = await axios.post("http://192.168.1.101:8080/student",{
                 email:email,
                password:password
            })
            const info = jwtDecode(response.data)
            const user = {email:info.email,
                                            fio: info.fio}
            dispatch(setUser(user))
            localStorage.setItem('token',response.data)
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
            const info = jwtDecode(response.data)
            const user = {email:info.email,
                fio: info.fio}
            dispatch(setUser(user))
            localStorage.setItem('token',response.data)
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