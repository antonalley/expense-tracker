import React, { useRef, useState } from "react"
import "../styles/Login.css"
import axios from 'axios'
import { UserData } from "../types/main";
import Cookies from 'js-cookie';
import { useUserDataContext } from "../App";


export default function Login(){
    const [isCreate, setIsCreate] = useState(false);
    const username = useRef<HTMLInputElement | null>(null);
    const password = useRef<HTMLInputElement | null>(null);
    const first = useRef<HTMLInputElement | null>(null);
    const last = useRef<HTMLInputElement | null>(null);
    const email = useRef<HTMLInputElement | null>(null);

    const {setUserData} = useUserDataContext();

    const api:string | undefined = import.meta.env.VITE_BACKEND_URL;

    function login(_e: React.MouseEvent){
        if (username.current && password.current){
            let u = username.current.value;
            let p = password.current.value;
            axios.post(api + "/authenticate", {username:u, password:p})
            .then(response => {
                if(response.status == 200 && response.data.status == "success"){
                    let userData: UserData = response.data["record"];
                    let apiKey: string = response.data["apiKey"];
                    setUserData(userData);
                    // Save API KEY with expiration of 4 days
                    Cookies.set("user-api-token", apiKey, {expires: 4}) 
                    Cookies.set("uid", String(userData.userid), {expires: 4})
                    window.location.href = "/dashboard"
                    // TODO: change context, and maybe localstorage
                }
            })
        }
        
    }
    return (
        <div>
        <h1>Expense Tracker</h1>
        <form style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
        <input ref={username} id="username" className="login-field" aria-label="username" placeholder="USERNAME"></input>
        <input ref={password} id="password" className="login-field" aria-label="password" placeholder="PASSWORD"></input>
        {!isCreate && <div className="button login-button" onClick={login}>Login</div>}
        {!isCreate && <div className="button create-account-button" onClick={()=>{setIsCreate(true)}}>Create Account</div>}
        {isCreate && 
        <div>
            <input  ref={first} id="first" className="login-field" placeholder="FIRST NAME"></input>
            <input ref={last} id="last" className="login-field" placeholder="LAST NAME"></input>
            <input ref={email} id="email" className="login-field" placeholder="EMAIL"></input>
            <div className="button create-account-button">Submit</div>
            <div className="button create-account-button" onClick={()=>setIsCreate(false)}>Cancel</div>
        </div>}
        </form>
        </div>
    )
}