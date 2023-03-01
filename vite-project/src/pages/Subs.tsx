import React,{useState,FormEvent} from 'react';

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
        <form onSubmit={HandleSub}>
            {error && <div className="errou">{error}</div>}
            <label><span>First name</span><input type="text" value={name} onChange={(e) => [setName(e.target.value), setError("")]}/></label>
            <label><span>Last name</span><input type="text" value={lastName} onChange={(e) => [setLastName(e.target.value), setError("")]}/></label>     
            <label><span>Birth date</span><input type="number" value={birthDate} onChange={(e) => [setBirthDate(e.target.value), setError("")]}/></label>
            <label><span>Country</span><input type="text" value={country} onChange={(e) => [setCountry(e.target.value), setError("")]}/></label>
            <label><span>City</span><input type="text" value={city} onChange={(e) => [setCity(e.target.value), setError("")]}/></label>
            <label><span>E-mail</span><input type="email" value={email} onChange={(e) => [setEmail(e.target.value), setError("")]}/></label>
            <label><span>password</span><input type="text" value={password} onChange={(e) => [setPassword(e.target.value), setError("")]}/></label>
            <label><span>password</span><input type="text" value={passwordConf} onChange={(e) => [setPasswordConf(e.target.value), setError("")]}/></label>
            <button type="submit">Register Now</button>
        </form>
    </div>
    )
}

export default Subs