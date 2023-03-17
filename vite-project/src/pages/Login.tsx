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
  const [email,setEmail] = useState<string>("");
  const [password,setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const {setPro,setCitty,citty} = useContext(ProtectContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  interface User {
    name?: string;
    email?: string;
    lastName?: string;
    city?: string;
    country?: string;
    password?: string;
  }

  async function login(cred: FormEvent<HTMLFormElement>){
    setIsLoading(true);
    try{
      cred.preventDefault();
      if (!email || !password){
        setError(`Wow, invalid username or password.
                        Please, try again!`)
        return;
      }
      const res = await fetch("https://latam-challenge-2.deta.dev/api/v1/users/sign-in" , {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({email,password}),
          });
      const data = await res.json();
      //setCitty(data['user']['city']);
      if (res.status === 200) {
        setCitty(data['user']['city']);
        alert("User logged in successfully");
        setPro("1");
        navigate("/DashB");
      } else if (res.status === 400) {
        alert("Bad credentials");
      } else if (res.status === 404) {
        alert("Not found.");
      } else {
        alert("Something went wrong.");
      }
    } catch (error) {
      console.log(error);
      alert("Sorry, an error has occurred. Please try again later.");
    }
    finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="body-ls-login">
      <div className="form-e-login">
        <h1 className="titulo-login">Welcome,</h1>
        <p className="sub-titulo-login">To continue browsing safely, log in to the network.</p>
        {isLoading && <h2 className='loadd'>Carregando...</h2>}
        <form onSubmit={login} className="formul-login">
          <h2>Login</h2>
          <input className={!error? "btn-form-login":"erro-btn"} type="text" value={email} onChange={(e) => [setEmail(e.target.value), setError("")]}/>
          <input className={!error? "btn-form-login":"erro-btn"} type="password" value={password} onChange={(e) => [setPassword(e.target.value), setError("")]}/>
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
