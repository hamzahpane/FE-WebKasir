// File auth.js

import axios from "axios";

export async function Register(data){
    return await axios.post(`http://203.194.113.156/aut/regis`, data);
}

export async function Login(data){
    return await axios.post(`http://203.194.113.156/aut/login`, data);
}


export async function Logout(data){
    return await axios.post(`http://203.194.113.156/aut/logout`,data)
}