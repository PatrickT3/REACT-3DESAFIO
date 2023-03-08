import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//Style
import "./DashB.css";
//img
import nuvm from "../assets/img/Vector (2).svg";
import seta from "../assets/img/Vector (3).svg";
import logoC from "../assets/img/Type=Colored positive 1.svg";
import bolona from "../assets/img/Group 5 1.svg";

interface Item {
  id: number;
  h: string;
  t: string;
}
interface WeatherData {
  main: {
    temp: number;
  };
  sys: {
    country: string;
  };
}
interface User {
  name?: string;
  email?: string;
  lastName?: string;
  city?: string;
  country?: string;
  password?: string;
}
interface Task {
  id: number;
  h: string | null;
  t: string | null;
}
interface Button {
  value: string;
}

interface Style {
  boxShadow: string;
  width: string;
}


const DashB = () => {
  const [chenge, setChange] = useState<string>('');
  const [dadosTemp, setDadosTemp] = useState<WeatherData>();
  const [horaAtual, setHoraAtual] = useState<string>('');
  const [activeButton, setActiveButton] = useState<Button>();
  const [dayAtual,setDayAtual] = useState<string>('');
  const [listMonday, setListMonday] = useState<Task[]>([]);
  const [listTuesday, setListTuesday] = useState<Task[]>([]);
  const [listWednesday, setListWednesday] = useState<Task[]>([]);
  const [listThursday, setListThursday] = useState<Task[]>([]);
  const [listFriday, setListFriday] = useState<Task[]>([]);
  const [listSaturday, setListSaturday] = useState<Task[]>([]);
  const [listSunday, setListSunday] = useState<Task[]>([]);
  const usersStorage = JSON.parse(localStorage.getItem("users_bd") || "null") as User[] | null;
  const city: string = usersStorage ? usersStorage[0]["city"] || "" : "";

  useEffect(() => {
    async function fetchDados() {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
        city
      )}&units=metric&appid=6c3ad536f4936801eb863a79db679f51`;
      const response = await fetch(url);
      const json = await response.json();
      setDadosTemp(json);
    }
    fetchDados();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const dataAtual = new Date();
      const hora = dataAtual.getHours();
      const min = dataAtual.getMinutes();
      setHoraAtual(`${hora}:${min}`);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const dias = setInterval(() => {
      const meses = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
      ];
      const dataAtual = new Date();
      const dia = dataAtual.getDate();
      const mes = dataAtual.getMonth();
      const ano = dataAtual.getFullYear();
      setDayAtual(`${meses[mes]} ${dia}th, ${ano}`);
    }, 1000);
    
    return () => clearInterval(dias);
  }, []);


  // Conteudo principal 
  // 1- Var change control
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setChange(event.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const pHor = formData.get('horario');
    const task = formData.get('tesk');
    addNewUser(pHor as string, task as string);
    e.currentTarget.reset();
  };
  
  const addNewUser = (horario: string | null, tesk: string | null) => {
    if (!horario || !tesk) {
      return alert('Por favor, preencha todos os campos');
    }
    const newUser = { id: Date.now(), h: horario, t: tesk };
    let listToUpdate: Task[] = [];

    switch (chenge) {
      case "Monday":
        listToUpdate = listMonday;
        break;
      case "Tuesday":
        listToUpdate = listTuesday;
        break;
      case "Wednesday":
        listToUpdate = listWednesday;
        break;
      case "Thursday":
        listToUpdate = listThursday;
        break;
      case "Friday":
        listToUpdate = listFriday;
        break;
      case "Saturday":
        listToUpdate = listSaturday;
        break;
      case "Sunday":
        listToUpdate = listSunday;
        break;
      default:
        break;
    }
    if (listToUpdate.some((user) => user.h === horario)) {
      alert('Horário já ocupado');
    }
    const updatedList = [...listToUpdate, newUser];
    switch (chenge) {
      case "Monday":
        setListMonday(updatedList);
        break;
      case "Tuesday":
        setListTuesday(updatedList);
        break;
      case "Wednesday":
        setListWednesday(updatedList);
        break;
      case "Thursday":
        setListThursday(updatedList);
        break;
      case "Friday":
        setListFriday(updatedList);
        break;
      case "Saturday":
        setListSaturday(updatedList);
        break;
      case "Sunday":
        setListSunday(updatedList);
        break;
      default:
        break;
    }
  };
  
  const clearList = (day: string) => {
    switch (day) {
      case "Monday":
        setListMonday([]);
        break;
      case "Tuesday":
        setListTuesday([]);
        break;
      case "Wednesday":
        setListWednesday([]);
        break;
      case "Thursday":
        setListThursday([]);
        break;
      case "Friday":
        setListFriday([]);
        break;
      case "Saturday":
        setListSaturday([]);
        break;
      case "Sunday":
        setListSunday([]);
        break;
      default:
        break;
    }
  }
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const clickedButton = event.target as HTMLButtonElement;
    setActiveButton({ value: clickedButton.value });
    setChange(clickedButton.value);
  };
  
  const getButtonStyle = (buttonValue: string): Style => {
    if (activeButton && activeButton.value === buttonValue) {
      return {
        boxShadow: '0 2px 2px rgba(0, 0, 0, 0.3)',
        width: '290px'
      };
    }
    return {} as Style;
  };
  const deleteOne = (id: number) => {

    if (chenge === "Monday") {
      setListMonday(listMonday.filter((item) => item.id !== id));
    } else if (chenge === "Tuesday") {
      setListTuesday(listTuesday.filter((item) => item.id !== id));
    } else if (chenge === "Wednesday") {
      setListWednesday(listWednesday.filter((item) => item.id !== id));
    } else if (chenge === "Thursday") {
      setListThursday(listThursday.filter((item) => item.id !== id));
    } else if (chenge === "Friday") {
      setListFriday(listFriday.filter((item) => item.id !== id));
    } else if (chenge === "Saturday") {
      setListSaturday(listSaturday.filter((item) => item.id !== id));
    } else if (chenge === "Sunday") {
      setListSunday(listSunday.filter((item) => item.id !== id));
    } else {
      console.log("Invalid day of the week.");
    } 
  }
  return (
    <div className="divPrinc">
      
      <header className="headerTop">
        <div className="divTit">
          <h1 className="bannerTit">Weekly Planner </h1>
          <p className="subTit">Use this planner to organize your daily issues.</p>
        </div>
        <div className="divHour">
          <span id="hor">{horaAtual}</span><br />
          <span id="dayear">{dayAtual}</span><br />
        </div>
        <div className="divTemp">
          {dadosTemp && (
            <div>
              <p id="cityCountry"> {city} - {dadosTemp.sys.country}</p>
              <div className="divCloud">
                <img src={nuvm} alt="nuvem" />
                <p id="cel"> {dadosTemp.main.temp.toFixed(0)}°</p>
              </div>
            </div>
          )}
        </div>
        <div className="divLogout">
          <Link className="img-logo" to="https://www.youtube.com/watch?v=ZNC-RNE0sdc" target="_blank"><img src={logoC} alt="logoCompass" /></Link>
          <Link to="/Subs" className="link-login">
            <img src={seta} alt="setinha" className="img-seta"/>
            <p>Logout</p>
          </Link>          
        </div>
      </header>
      <main>
        <section className="container-form">
        <form onSubmit={handleSubmit} className="flex-form">
            <input type="text" name="tesk" className="input-tesk" placeholder="Task or issue" maxLength={35} required></input>
            <select id="daysOfWeek" onChange={handleChange} className="input-sel" defaultValue="">
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
              <input type="time" name="horario" className="input-hora" placeholder="01h 32m" maxLength={4} required></input>
            <div className="class-btns">
              <button type="submit" className="btn-add">+ Add to calendar</button>
              <button type="button" className="btn-del" onClick={() => clearList(chenge)}>- Delet all</button>
            </div>
          </form>
        </section>
        <section className="days-week">
            <button value="Monday" onClick={handleClick} style={{ ...getButtonStyle('Monday'), backgroundColor: 'red' }}>
              Monday
            </button>
            <button value="Tuesday" onClick={handleClick} style={{...getButtonStyle('Tuesday'), backgroundColor: 'rgba(255, 128, 0, 1)'}}>
              Tuesday
            </button>
            <button value="Wednesday" onClick={handleClick} style={{...getButtonStyle('Wednesday'), backgroundColor: 'rgba(255, 206, 0, 1)' }}>
              Wednesday
            </button>
            <button value="Thursday" onClick={handleClick} style={{...getButtonStyle('Thursday'), backgroundColor: 'rgba(255, 0, 36, 0.7)' }}>
              Thursday
            </button>
            <button value="Friday" onClick={handleClick} style={{...getButtonStyle('Friday'), backgroundColor: 'rgba(255, 128, 0, 0.7)' }}>
              Friday
            </button>
            <button value="Saturday" onClick={handleClick} style={{...getButtonStyle('Saturday'), backgroundColor: 'rgba(255, 206, 0, 0.7)' }}>
              Saturday
            </button>
            <button value="Sunday" onClick={handleClick} style={{...getButtonStyle('Sunday'), backgroundColor: 'rgba(255, 0, 36, 0.5)' }}>
              Sunday
            </button>
        </section>
        <section>
          <p className="caixa" style={{backgroundColor:'rgba(255, 255, 255, 1)'}}>Time</p>
        </section>
        <section className="classDash">
            {chenge === "Monday" && (
              <ul>
                {listMonday.map((item) => (
                  <li key={item.id}><p className="caixa" style={{backgroundColor: 'red'}}> {item.h}</p>  <p className="caixa-2" style={{background: 'linear-gradient(to right, #FF4B2B 5%, rgba(228, 240, 248, 0.42) 5%)'}}>{item.t}<span className="span-p" onClick={() => deleteOne(item.id)}>Delete</span></p></li>
                ))}
              </ul>
                )}
             {chenge === "Tuesday" && (
              <ul>
                {listTuesday.map((item) => (
                  <li key={item.id}><p className="caixa" style={{backgroundColor: 'rgba(255, 128, 0, 1)'}}> {item.h}</p>  <p className="caixa-2" style={{background: 'linear-gradient(to right, rgba(255, 128, 0, 1) 5%, rgba(228, 240, 248, 0.42) 5%)'}}>{item.t}<span className="span-p" onClick={() => deleteOne(item.id)}>Delete</span></p></li>
                ))}
              </ul>
                )}
            {chenge === "Wednesday" && (
              <ul>
                {listWednesday.map((item) => (
                  <li key={item.id}><p className="caixa" style={{backgroundColor: 'rgba(255, 206, 0, 1)'}}> {item.h}</p>  <p className="caixa-2" style={{background: 'linear-gradient(to right, rgba(255, 206, 0, 1) 5%, rgba(228, 240, 248, 0.42) 5%)'}}>{item.t}<span className="span-p" onClick={() => deleteOne(item.id)}>Delete</span></p></li>
                ))}
              </ul>
            )}
            {chenge === "Thursday" && (
              <ul>
                {listThursday.map((item) => (
                  <li key={item.id}><p className="caixa" style={{backgroundColor: 'rgba(255, 0, 36, 0.7)'}}> {item.h}</p><p className="caixa-2" style={{background: 'linear-gradient(to right, rgba(255, 0, 36, 0.7) 5%, rgba(228, 240, 248, 0.42) 5%)'}}>{item.t}<span className="span-p" onClick={() => deleteOne(item.id)}>Delete</span></p></li>
                ))}
              </ul>
            )}
            {chenge === "Friday" && (
              <ul>
                {listFriday.map((item) => (
                  <li key={item.id}><p className="caixa" style={{backgroundColor: 'rgba(255, 128, 0, 0.7)'}}> {item.h}</p>  <p className="caixa-2" style={{background: 'linear-gradient(to right, rgba(255, 128, 0, 0.7) 5%, rgba(228, 240, 248, 0.42) 5%)'}}>{item.t}<span className="span-p" onClick={() => deleteOne(item.id)}>Delete</span></p></li>
                ))}
              </ul>
            )}
            {chenge === "Saturday" && (
              <ul>
                {listSaturday.map((item) => (
                  <li key={item.id}><p className="caixa" style={{backgroundColor: 'rgba(255, 206, 0, 0.7)'}}> {item.h}</p>  <p className="caixa-2" style={{background: 'linear-gradient(to right, rgba(255, 206, 0, 0.7) 5%, rgba(228, 240, 248, 0.42) 5%)'}}>{item.t}<span className="span-p" onClick={() => deleteOne(item.id)}>Delete</span></p></li>
                ))}
              </ul>
            )}
            {chenge === 'Sunday' && (
              (() => {
                // Crie um objeto para rastrear as chaves existentes
                const hKeys: { [key: string]: JSX.Element[] } = {};

                // Crie uma lista vazia para armazenar os elementos ul
                const ulList: JSX.Element[] = [];

                // Percorra cada item em listSunday
                listSunday.forEach((item) => {
                  // Verifique se a chave (item.h) já existe no objeto hKeys
                  if (hKeys[item.h!]) {
                    // Se já existe, adicione o item a essa lista
                    hKeys[item.h!].push(
                      <li key={item.id}>
                        <p className="caixa" style={{ backgroundColor: 'rgba(255, 0, 36, 0.5)' }}>
                          {item.h}
                        </p>
                        <p className="caixa-2" style={{ background: 'linear-gradient(to right, rgba(255, 0, 36, 0.5) 5%, rgba(228, 240, 248, 0.42) 5%)' }}>
                          {item.t}
                          <span className="span-p" onClick={() => deleteOne(item.id)}>Delete</span>
                        </p>
                      </li>
                    );
                  } else {
                    // Se não existe, crie um novo elemento ul e adicione o item a essa lista
                    hKeys[item.h!] = [];
                    hKeys[item.h!].push(
                      <li key={item.id}>
                        <p className="caixa" style={{ backgroundColor: 'rgba(255, 0, 36, 0.5)' }}>
                          {item.h}
                        </p>
                        <p className="caixa-2" style={{ background: 'linear-gradient(to right, rgba(255, 0, 36, 0.5) 5%, rgba(228, 240, 248, 0.42) 5%)' }}>
                          {item.t}
                          <span className="span-p" onClick={() => deleteOne(item.id)}>Delete</span>
                        </p>
                      </li>
                    );
                  }
                });

                // Para cada lista no objeto hKeys, crie um elemento ul e adicione os itens a essa lista
                for (const key in hKeys) {
                  if (key && hKeys.hasOwnProperty(key)) { // adicionado verificação de key aqui
                    const ul: JSX.Element = (
                      <ul key={key} className="horizontal-list">
                        {hKeys[key]}
                      </ul>
                    );
                    ulList.push(ul);
                  }
                
                }

                // Exiba todos os elementos ul em um contêiner div
                return <div>{ulList}</div>;
              })()
            )}
        </section>
      </main>
    </div>
  );
};

export default DashB;
