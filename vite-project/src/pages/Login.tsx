//REACT
import { ProtectContext } from '../context/Protect';
import React,{useState,FormEvent,useContext} from 'react';
import { useNavigate, Link } from "react-router-dom";
//img
import imagem from "../assets/img/image 2.jpg";
import logo from "../assets/img/Type=Colored negative.svg";
//Style
import "./Login.css"

const Login = () => {
  const [name,setName] = useState<string>("");
  const [passw,setPassw] = useState<string>("");
  const [error, setError] = useState<string>("");
  const {setPro} = useContext(ProtectContext);
  const navigate = useNavigate();

  interface User {
    name?: string;
    email?: string;
    lastName?: string;
    city?: string;
    country?: string;
    password?: string;
  }

  const HandleLog = (e:FormEvent) => {
    e.preventDefault();

    if (!name || !passw){
      setError(`Wow, invalid username or password.
                      Please, try again!`)
      return;
    }
    const Answer = auth(name,passw);
    if (Answer){
      setError(Answer);
      return;
    }
    
    alert("success!");
    setPro("1");
    navigate("/DashB");
  }

  const auth = (name: string,password: string) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd") || "null") as User[] | null;
    const hasUser = usersStorage?.filter((user) => user.name === name);
    
    if (hasUser?.length) {
      if (hasUser[0].name === name && hasUser[0].password === password) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("user_token", JSON.stringify({ name, token }));
        return;
      } else {
        return "Incorrect email or password.";
      }
    } else {
      return "User not registered.";
    }
  }
  return (
    <div className="body-ls-login">
      <div className="form-e-login">
        <h1 className="titulo-login">Welcome,</h1>
        <p className="sub-titulo-login">To continue browsing safely, log in to the network.</p>
        <form onSubmit={HandleLog} className="formul-login">
          <h2>Login</h2>
          <input className={!error? "btn-form-login":"erro-btn"} type="text" value={name} onChange={(e) => [setName(e.target.value), setError("")]}/>
          <input className={!error? "btn-form-login":"erro-btn"} type="password" value={passw} onChange={(e) => [setPassw(e.target.value), setError("")]}/>
          {error && <div className="errou-login">{error}</div>}
          <button className="btn-button-login">Log in</button>
        </form>
        <Link to="/Sub" className="links">Register</Link>
      </div>
      <div className="img-d">
        <img src={logo} alt="logo" id="imgm-0"/>
        <img src={imagem} alt="Imagem Principal" id="imgm-1"/>
      </div>
    </div>
  )
}

export default Login
