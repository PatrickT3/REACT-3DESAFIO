// React
import React,{useState,FormEvent} from 'react';
import { useNavigate, Link } from "react-router-dom";
// Style
import "./Subs.css";
// images
import imagem from "../assets/img/image 2.jpg";
import logo from "../assets/img/Type=Colored negative.svg";

const Subs = () => {
    const [name,setName] = useState<string>("");
    const [lastName,setLastName] = useState<string>("");
    const [birthDate,setBirthDate] = useState<string>("");
    const [city,setCity] = useState<string>("");
    const [country,setCountry] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [passwordConf, setPasswordConf] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const HandleSub = (e:FormEvent) => {
        e.preventDefault();
        
        if (!email || !passwordConf || !password || !name || !lastName || !birthDate || !city || !country) {
            setError("* Fill out all the fields");
            return;
        } else if (password !== passwordConf) {
            setError("* The passwords do not match");
            return;
        }
        signup(email,password,name,lastName,city,country);

        alert("Usuário cadatrado com sucesso!");
        navigate("Login");
    }

    interface User {
        name: string;
        email: string;
        lastName: string;
        city: string;
        country: string;
        password: string;
      }
      
      const signup = (
        email: string,
        password: string,
        name: string,
        lastName: string,
        city: string,
        country: string
      ): string | void => {
        const usersStorage = JSON.parse(localStorage.getItem("users_bd") || "null") as User[] | null;
      
        const hasUser = usersStorage?.filter((user) => user.email === email);
      
        if (hasUser?.length) {
          setError("Email is already being used");
        }
      
        let newUser: User[];
      
        if (usersStorage) {
          newUser = [...usersStorage, { email, password, name, lastName, city, country }];
        } else {
          newUser = [{ email, password, name, lastName, city, country }];
        }
      
        localStorage.setItem("users_bd", JSON.stringify(newUser));
      };
      

  return (
    <div>
        <div className="body-ls">
            <div className="form-e">
                <h1 className="titulo">Welcome,</h1>
                <p className="sub-titulo">Please, register to continue</p>
                {error && <div className="errou">{error}</div>}
                <form onSubmit={HandleSub} className="formul">
                    <label><span className="span">First name</span><input className="btn-form" type="text" placeholder='Your first name' value={name} onChange={(e) => [setName(e.target.value), setError("")]}/></label>
                    <label><span className="span">Last name</span><input className="btn-form" type="text" placeholder='Your last name' value={lastName} onChange={(e) => [setLastName(e.target.value), setError("")]}/></label>     
                    <label><span className="span">Birth date</span><input className="btn-form" type="number" placeholder='MM/DD/YYYY' value={birthDate} onChange={(e) => [setBirthDate(e.target.value), setError("")]}/></label>
                    <label><span className="span">Country</span><input className="btn-form" type="text" placeholder='Your Country' value={country} onChange={(e) => [setCountry(e.target.value), setError("")]}/></label>
                    <label><span className="span">City</span><input className="btn-form" type="text" placeholder='Your City' value={city} onChange={(e) => [setCity(e.target.value), setError("")]}/></label>
                    <label><span className="span">E-mail</span><input className="btn-form" type="email" placeholder='A valid e-mail here' value={email} onChange={(e) => [setEmail(e.target.value), setError("")]}/></label>
                    <label><span className="span">password</span><input className="btn-form" type="password" placeholder='Your password' value={password} onChange={(e) => [setPassword(e.target.value), setError("")]}/></label>
                    <label><span className="span">password</span><input className="btn-form" type="password" placeholder='Comfirm your password' value={passwordConf} onChange={(e) => [setPasswordConf(e.target.value), setError("")]}/></label>
                    <button type="submit" className="btn-button">Register Now</button>
                </form>
            </div>
            <div className="img-d">
                <img src={logo} alt="logo" id="imgm-0"/>
                <img src={imagem} alt="Imagem Principal" id="imgm-1"/>
            </div>
        </div>
    </div>
    )
}

export default Subs