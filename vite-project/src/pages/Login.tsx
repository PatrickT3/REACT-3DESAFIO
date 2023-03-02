import React,{useState,FormEvent} from 'react';

const Login = () => {
  const [name,setName] = useState<string>("");
  const [passw,setPassw] = useState<string>("");
  const [error, setError] = useState<string>("");

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
    }
    alert(Answer);
  }

  const auth = (name: string,password: string) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd") || "null") as User[] | null;
    const hasUser = usersStorage?.filter((user) => user.name === name);
    
    if (hasUser?.length) {
      if (hasUser[0].name === name && hasUser[0].password === password) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("user_token", JSON.stringify({ name, token }));
        return "its ok!";
      } else {
        return "Incorrect email or password.";
      }
    } else {
      return "User not registered.";
    }
  }
  return (
    <div>
      <h1 className="titulo-login">Welcome,</h1>
      <p className="sub-titulo-login">To continue browsing safely, log in to the network.</p>
      <form onSubmit={HandleLog}>
        <h2>Login</h2>
        <input type="text" value={name} onChange={(e) => [setName(e.target.value), setError("")]}/>
        <input type="text" value={passw} onChange={(e) => [setPassw(e.target.value), setError("")]}/>
        <button>Log in</button>
      </form>
    </div>
  )
}

export default Login
