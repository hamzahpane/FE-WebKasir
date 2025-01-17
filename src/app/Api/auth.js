// File auth.js

import axios from "axios";

export async function Register(data){
    return await axios.post(`http://localhost:4000/aut/regis`, data);
}

export async function Login(data){
    return await axios.post(`http://localhost:4000/aut/login`, data);
}


export async function Logout(data){
    return await axios.post(`http://localhost:4000/aut/logout`,data)
}