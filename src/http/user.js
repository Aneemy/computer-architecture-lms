import axios from "axios";
import {setUser} from "../reducers/userReducer";
import jwtDecode from "jwt-decode";
import {useDispatch} from "react-redux";
import {closeModal} from "../reducers/uiReducer";

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
const secretKey = "Grib"
export const $url = 'http://192.168.1.101:8080'
export const registration = async (name,surname,secondname,group,email,password) =>{
    try {
        const response = await axios.post($url+'/students',{
            surname:surname,
            name:name,
            secondname:secondname,
            group:group,
            email:email,
            password:password
        },
            {headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':''}})
        if (response.status==200){
        }
        console.log(response.data)
    }
    catch (e){
        alert(e)
    }
}
export const login = (email,password,flag) =>{
    const url = flag ? $url+"/teacher" : $url+"/student"
    return async dispatch =>{
        try {
            const response = await axios.post(url,{
                 email:email,
                password:password
            })
            const info = jwtDecode(response.data)
            const user = {email:info.email,
                                            fio: info.fio}
            dispatch(setUser(user,Boolean(flag)))
            localStorage.setItem('token',response.data)
            localStorage.setItem('isTeacher',flag)
            dispatch(closeModal())
        }
        catch (e){
            alert(e)
        }
    }
}
// export const auth = () =>{
//     return async dispatch =>{
//         try {
//             const response = await axios.get("http://127.0.0.1:7777/pisyapopa", {
//             headers:{
//                 token:`${localStorage.getItem('token')}`
//             }
//             })
//             const info = jwtDecode(response.data)
//             const user = {email:info.email,
//                 fio: info.fio}
//             dispatch(setUser(user))
//             localStorage.setItem('token',response.data)
//         }
//         catch (e){
//             alert(e.response.data.message)
//             localStorage.removeItem('token')
//         }
//     }
// }
export const auth = ()=>{
    return async dispatch =>{
        const token = localStorage.getItem('token')
        const info = jwtDecode(token)
        const user = {email:info.email,
            fio: info.fio}
        const isTeacher = localStorage.getItem('isTeacher')
        dispatch(setUser(user,isTeacher==='true'))
    }
}
export const question = async (pack) =>{
    let token = localStorage.getItem("token");
    try {
        const response = await axios.post($url+"/teacher/"+token+"/quests", {
        name:pack.name,
            text:pack.text,
            options:pack.options,
            pictures:pack.pictures
        })
        alert(response.message)
        }
    catch (e){
        alert(e)
    }
}

