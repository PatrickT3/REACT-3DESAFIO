// React
import React,{useState,FormEvent,useEffect} from 'react';
import { useNavigate, Link } from "react-router-dom";
import { isObject } from 'lodash';
// Style
import "./Subs.css";
// images
import imagem from "../assets/img/image 2.jpg";
import logo from "../assets/img/Type=Colored negative.svg";
import Login from './Login';



const Subs = () => {
    const [firstName,setfirstName] = useState<string>("");
    const [lastName,setLastName] = useState<string>("");
    const [birthDate,setBirthDate] = useState<string>("");
    const [city,setCity] = useState<string>("");
    const [country,setCountry] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [confirmPassword, setconfirmPassword] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    
    interface User {
      firstName: string;
      email: string;
      lastName: string;
      birthDate: string;
      city: string;
      country: string;
      password: string;
      confirmPassword?: string;
    }

    const HandleSub = (e:FormEvent) => {
        e.preventDefault();
        
        if (!email || !confirmPassword|| !password || !firstName || !lastName || !birthDate || !city || !country) {
            setError("* Fill out all the fields");
            return;
        } else if (password !== confirmPassword) {
            setError("* The passwords do not match");
            return;
        }
        const signup = async (user: User) => {
          setIsLoading(true);
          try {
            const response = await fetch("https://latam-challenge-2.deta.dev/api/v1/users/sign-up", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(user),
            });
            const data = await response.json();
            if (response.status === 201) {
              alert("success!!");
              navigate("/Login");
            } else if (response.status === 400) {
              alert("User with required email already exists. Please sign in!");
            } else if (response.status === 404) {
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
        };
        signup({firstName,lastName,city,country,birthDate,email,password,confirmPassword});

        
    }
  return (
    <div>
        <div className="body-ls">
            <div className="form-e">
                <h1 className="titulo">Welcome,</h1>
                <p className="sub-titulo">Please, register to continue</p>
                {isLoading && <h2 className='load'>Carregando...</h2>}
                {error && <div className="errou">{error}</div>}
                <form onSubmit={HandleSub} className="formul">
                    <label><span className="span">First name</span><input className="btn-form" type="text" placeholder='Your first name' value={firstName} onChange={(e) => [setfirstName(e.target.value), setError("")]}/></label>
                    <label><span className="span">Last name</span><input className="btn-form" type="text" placeholder='Your last name' value={lastName} onChange={(e) => [setLastName(e.target.value), setError("")]}/></label>     
                    <label><span className="span">Birth date</span><input className="btn-form" type="number" placeholder='MM/DD/YYYY' value={birthDate} onChange={(e) => [setBirthDate(e.target.value), setError("")]}/></label>
                    <label><span className="span">Country</span><input className="btn-form" type="text" placeholder='Your Country' value={country} onChange={(e) => [setCountry(e.target.value), setError("")]}/></label>
                    <label><span className="span">City</span><input className="btn-form" type="text" placeholder='Your City' value={city} onChange={(e) => [setCity(e.target.value), setError("")]}/></label>
                    <label><span className="span">E-mail</span><input className="btn-form" type="email" placeholder='A valid e-mail here' value={email} onChange={(e) => [setEmail(e.target.value), setError("")]}/></label>
                    <label><span className="span">password</span><input className="btn-form" type="password"  minLength={6} placeholder='Your password' value={password} onChange={(e) => [setPassword(e.target.value), setError("")]}/></label>
                    <label><span className="span">password</span><input className="btn-form" type="password" placeholder='Comfirm your password' value={confirmPassword} onChange={(e) => [setconfirmPassword(e.target.value), setError("")]}/></label>
                    <button type="submit" className="btn-button">Register Now</button>
                </form>
            </div>
            <div className="img-d">
                <Link to="https://www.youtube.com/watch?v=ZNC-RNE0sdc" target="_blank"><img src={logo} alt="logo" id="imgm-0"/></Link>
                <img src={imagem} alt="Imagem Principal" id="imgm-1"/>
            </div>
        </div>
    </div>
    )
}

export default Subs