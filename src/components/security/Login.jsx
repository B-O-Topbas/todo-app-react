
import React, { useState } from "react"
//import axios from 'axios';
// import LoginApi from '../../services/LoginApi';
//import LoginReusability from './LoginReusability';
import axios from "axios";

//Const URL
const LOGIN_URL = "http://localhost:8080/api/security/login";
const REGISTER_URL="http://localhost:8080/api/security/register";
const jwtres="s"
// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
  let [authMode, setAuthMode] = useState("signin")

  const[login,setLogin]=useState(
    {
      userName:"",
      password:"",
    }
  )
  const[signUp,setSignUp]=useState(
    {
      name:"",
      userName:"",
      password:""
    }
  )
 const loginMethod=async (event)=>{
  event.preventDefault();
    try{
        const config= { headers: { "Accept": "application/json", "Content-Type": "application/json" } }
        const response=await axios.post(LOGIN_URL,login,config);
        if(response.status === 200){

          localStorage.setItem("token",response.data.token)
          localStorage.setItem("userName",login.userName)
          setTimeout(() => {
            window.location.href = "/todo";
          }, 500);
        }

        event.stopPropagation();
        
    }catch(error){
        alert("Hatalı kullanıcı adı veya parola")
    }
  
}

const signUpMethod=async(event)=>{
  try{
    const config= { headers: { "Accept": "application/json", "Content-Type": "application/json" } }
    const response=await axios.post(REGISTER_URL,signUp,config);
  }catch(error){
    alert("Lütfen Farklı bir kullanıcı adı ile tekrar kayıt olamyı deneyiniz")
  }
}

  const handleLogin=()=>{
    

   const loginFormCheck= login.userName!==""&& login.password!=="";
   if (!loginFormCheck) {
    // Boş alanlar var
    return true;
  }else{
    return false;
  }
  }

  const handleSignUp=()=>{
    const signUpCheck= signUp.name!==""&& signUp.userName!==""&& signUp.password!=="";
    if(!signUpCheck){
      return true
    }else{
      return false;
    }
  }
 

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Giriş</h3>
            <div className="text-center">
              Kayıtlı Değilmisin ?{" "}
              <span className="link-primary" onClick={changeAuthMode}
              onMouseEnter={() => {
                // Fare öğenin üzerine geldiğinde stili değiştir
                document.querySelector(".link-primary").style.cursor = "pointer";
              }}
              onMouseLeave={() => {
                // Fare öğenin üzerinden ayrıldığında stili eski haline getir
                document.querySelector(".link-primary").style.cursor = "default";
              }}>
                Kayıt Yap
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Kullanıcı Adı</label>
              <input
                type="text"
                id="loginUserName"
                className="form-control mt-1"
                placeholder="Kullanıcı adınızı giriniz"
                onChange={(e)=> setLogin({...login,userName:e.target.value})}
              />
            </div>
            <div className="form-group mt-3">
              <label>Şifre</label>
              <input
                type="password"
                id="loginPassword"
                className="form-control mt-1"
                placeholder="Şifrenizi Giriniz"
                onChange={(e)=> setLogin({...login,password:e.target.value})}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary" disabled={handleLogin()}
               onClick={loginMethod}
              >
                Giriş
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Kayıt Ol</h3>
          <div className="text-center">
            Zaten Kayıtlımısın ?{" "}
            <span className="link-primary" onClick={changeAuthMode}
             onMouseEnter={() => {
              // Fare öğenin üzerine geldiğinde stili değiştir
              document.querySelector(".link-primary").style.cursor = "pointer";
            }}
            onMouseLeave={() => {
              // Fare öğenin üzerinden ayrıldığında stili eski haline getir
              document.querySelector(".link-primary").style.cursor = "default";
            }}>
              Giriş Yap
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Adınız</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="örn: Beytullah Onur Topbaş"
              onChange={(e)=> setSignUp({...signUp,name:e.target.value})}
            />
          </div>
          <div className="form-group mt-3">
            <label>Kullanıcı Adınız</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Örn: bonur58"
              onChange={(e)=> setSignUp({...signUp,userName:e.target.value})}
            />
          </div>
          <div className="form-group mt-3">
            <label>Şifre</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="örn: 1234"
              onChange={(e)=> setSignUp({...signUp,password:e.target.value})}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" disabled={handleSignUp()}
            onClick={signUpMethod}>
              Kaydol
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
