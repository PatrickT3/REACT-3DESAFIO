import React, { useState, useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import { ProtectContext } from '../context/Protect';
//Style
import "./DashB.css";
//img
import nuvm from "../assets/img/Vector (2).svg";
import seta from "../assets/img/Vector (3).svg";
import logoC from "../assets/img/Type=Colored positive 1.svg";


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
interface Event {
  _id: string;
  description: string;
  dayOfWeek: string;
  userId: string;
  createdAt: string;
  // ... outros campos, se houver
}


const DashB = () => {
  const [chenge, setChange] = useState<string>('Monday');
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
  const {citty} = useContext(ProtectContext);
  const [events, setEvents] = useState<Event[]>([]);
  const [mud,setMud] = useState<string>('');
  const [newList, setNewList] = useState<{ id: string; h: string; t: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  

  useEffect(() => {
    async function fetchDados() {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
        citty
      )}&units=metric&appid=6c3ad536f4936801eb863a79db679f51`;
      const response = await fetch(url);
      const json = await response.json();
      setDadosTemp(json);
    }
    fetchDados();
  }, []);
  console.log(citty);
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
  //testes
  const token = localStorage.getItem("token") || null;

  useEffect(() => {
    setIsLoading(true);
    const url = `https://latam-challenge-2.deta.dev/api/v1/events?dayOfWeek=${chenge}`;
    fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store'
    })
      .then((response) => response.json())
      .then((data) => {
        const newEvents = data['events'].map((event: Event) => {
          const [h, t] = event.description.split("&");
          return { id: event._id, h, t };
        });
        setNewList(newEvents);
        setEvents(data['events']);
        setIsLoading(false);
      });
  }, [chenge,mud, token]);
  
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
    const concat = pHor + "&" + task;
    Addtask(concat);
    e.currentTarget.reset();
  };
  async function Addtask(concat: string) {
    setIsLoading(true);
    try {
        const res = await fetch("https://latam-challenge-2.deta.dev/api/v1/events", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "description": `${concat}`,
            "dayOfWeek": `${chenge}`
        }),
        });

        if (res.ok) {
          setMud(Date());
          const data = await res.json();
          setIsLoading(false);
          alert("ADD");
          
        } else {
          const errorResponse = await res.json();
          throw new Error(`${res.status}: ${errorResponse.message}`);
        }

    } catch (error: any) {
      console.error(error);
      alert(`Error: ${(error as Error).message}`);
  }
  
    }
  
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
    setIsLoading(true);
    console.log(day);
    fetch(`https://latam-challenge-2.deta.dev/api/v1/events?dayOfWeek=${day.toLocaleLowerCase()}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } ,
        
        })
        .then(response => {
        if (response.ok) {
          setMud(Date());
          setIsLoading(false);
          // o item foi excluído com sucesso
          alert('Item excluído com sucesso!');
        } else {
            // a exclusão falhou
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        })
        .catch(error => {
        alert(`Erro ao excluir item: ${error.message}`);
        });

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
  const deleteOne = (id: string) => {
    /*
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
    } */
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
              <p id="cityCountry"> {citty} - {dadosTemp.sys.country}</p>
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
        <div>
        {isLoading && <div className="loadD">Loading...</div>}
        {!isLoading && chenge === 'Monday' &&
              (() => {
                const hKeys: { [key: string]: JSX.Element[] } = {};
                const ulList: JSX.Element[] = [];

                newList.forEach((item) => {
                  if (hKeys[item.h!]) {
                    hKeys[item.h!].push(
                      <li key={item.id}>
                        <p className="caixa-2" style={{ background: 'linear-gradient(to right, rgba(0, 0, 0, 0.7) 5%, rgba(228, 240, 248, 0.42) 5%)' }}>
                          {item.t}
                          <span className="span-p" onClick={() => deleteOne(item.id)}>Delete</span>
                        </p>
                      </li>
                    );
                  } else {
                    hKeys[item.h!] = [];
                    hKeys[item.h!].push(
                      <li key={item.id}>
                        <p className="caixa" style={{backgroundColor: 'red'}}>
                          {item.h}
                        </p>
                        <p className="caixa-2" style={{background: 'linear-gradient(to right, red 5%, rgba(228, 240, 248, 0.42) 5%)'}}>
                          {item.t}
                          <span className="span-p" onClick={() => deleteOne(item.id)}>Delete</span>
                        </p>
                      </li>
                    );
                  }
                });

                
                for (const key in hKeys) {
                  if (key && hKeys.hasOwnProperty(key)) {
                    const ul: JSX.Element = (
                      <ul key={key} className="horizontal-list">
                        {hKeys[key]}
                      </ul>
                    );
                    ulList.push(ul);
                  }
                
                }

                return <div>{ulList}</div>;
              })()
            } 
            {!isLoading && chenge === 'Tuesday' &&
              (() => {
                const hKeys: { [key: string]: JSX.Element[] } = {};
                const ulList: JSX.Element[] = [];

                newList.forEach((item) => {
                  if (hKeys[item.h!]) {
                    hKeys[item.h!].push(
                      <li key={item.id}>
                        <p className="caixa-2" style={{ background: 'linear-gradient(to right, rgba(0, 0, 0, 0.7) 5%, rgba(228, 240, 248, 0.42) 5%)' }}>
                          {item.t}
                          <span className="span-p" onClick={() => deleteOne(item.id)}>Delete</span>
                        </p>
                      </li>
                    );
                  } else {
                    hKeys[item.h!] = [];
                    hKeys[item.h!].push(
                      <li key={item.id}>
                        <p className="caixa" style={{backgroundColor:  'rgba(255, 128, 0, 1)'}}>
                          {item.h}
                        </p>
                        <p className="caixa-2" style={{background: 'linear-gradient(to right, rgba(255, 128, 0, 1) 5%, rgba(228, 240, 248, 0.42) 5%)'}}>
                          {item.t}
                          <span className="span-p" onClick={() => deleteOne(item.id)}>Delete</span>
                        </p>
                      </li>
                    );
                  }
                });

                
                for (const key in hKeys) {
                  if (key && hKeys.hasOwnProperty(key)) {
                    const ul: JSX.Element = (
                      <ul key={key} className="horizontal-list">
                        {hKeys[key]}
                      </ul>
                    );
                    ulList.push(ul);
                  }
                
                }

                return <div>{ulList}</div>;
              })()
            }
            {!isLoading && chenge === 'Wednesday' &&
              (() => {
                const hKeys: { [key: string]: JSX.Element[] } = {};
                const ulList: JSX.Element[] = [];

                newList.forEach((item) => {
                  if (hKeys[item.h!]) {
                    hKeys[item.h!].push(
                      <li key={item.id}>
                        <p className="caixa-2" style={{ background: 'linear-gradient(to right, rgba(0, 0, 0, 0.7) 5%, rgba(228, 240, 248, 0.42) 5%)' }}>
                          {item.t}
                          <span className="span-p" onClick={() => deleteOne(item.id)}>Delete</span>
                        </p>
                      </li>
                    );
                  } else {
                    hKeys[item.h!] = [];
                    hKeys[item.h!].push(
                      <li key={item.id}>
                        <p className="caixa" style={{backgroundColor: 'rgba(255, 206, 0, 1)'}}>
                          {item.h}
                        </p>
                        <p className="caixa-2" style={{background: 'linear-gradient(to right, rgba(255, 206, 0, 1) 5%, rgba(228, 240, 248, 0.42) 5%)'}}>
                          {item.t}
                          <span className="span-p" onClick={() => deleteOne(item.id)}>Delete</span>
                        </p>
                      </li>
                    );
                  }
                });

                
                for (const key in hKeys) {
                  if (key && hKeys.hasOwnProperty(key)) {
                    const ul: JSX.Element = (
                      <ul key={key} className="horizontal-list">
                        {hKeys[key]}
                      </ul>
                    );
                    ulList.push(ul);
                  }
                
                }

                return <div>{ulList}</div>;
              })()
            }
            {!isLoading && chenge === 'Thursday' &&
              (() => {
                const hKeys: { [key: string]: JSX.Element[] } = {};
                const ulList: JSX.Element[] = [];

                newList.forEach((item) => {
                  if (hKeys[item.h!]) {
                    hKeys[item.h!].push(
                      <li key={item.id}>
                        <p className="caixa-2" style={{ background: 'linear-gradient(to right, rgba(0, 0, 0, 0.7) 5%, rgba(228, 240, 248, 0.42) 5%)' }}>
                          {item.t}
                          <span className="span-p" onClick={() => deleteOne(item.id)}>Delete</span>
                        </p>
                      </li>
                    );
                  } else {
                    hKeys[item.h!] = [];
                    hKeys[item.h!].push(
                      <li key={item.id}>
                        <p className="caixa" style={{backgroundColor: 'rgba(255, 0, 36, 0.7)'}}>
                          {item.h}
                        </p>
                        <p className="caixa-2" style={{background:'linear-gradient(to right, rgba(255, 0, 36, 0.7) 5%, rgba(228, 240, 248, 0.42) 5%)'}}>
                          {item.t}
                          <span className="span-p" onClick={() => deleteOne(item.id)}>Delete</span>
                        </p>
                      </li>
                    );
                  }
                });

                
                for (const key in hKeys) {
                  if (key && hKeys.hasOwnProperty(key)) {
                    const ul: JSX.Element = (
                      <ul key={key} className="horizontal-list">
                        {hKeys[key]}
                      </ul>
                    );
                    ulList.push(ul);
                  }
                
                }

                return <div>{ulList}</div>;
              })()
            }  
            {!isLoading && chenge === 'Friday' &&
              (() => {
                const hKeys: { [key: string]: JSX.Element[] } = {};
                const ulList: JSX.Element[] = [];

                newList.forEach((item) => {
                  if (hKeys[item.h!]) {
                    hKeys[item.h!].push(
                      <li key={item.id}>
                        <p className="caixa-2" style={{ background: 'linear-gradient(to right, rgba(0, 0, 0, 0.7) 5%, rgba(228, 240, 248, 0.42) 5%)' }}>
                          {item.t}
                          <span className="span-p" onClick={() => deleteOne(item.id)}>Delete</span>
                        </p>
                      </li>
                    );
                  } else {
                    hKeys[item.h!] = [];
                    hKeys[item.h!].push(
                      <li key={item.id}>
                        <p className="caixa" style={{backgroundColor: 'rgba(255, 128, 0, 0.7)'}}>
                          {item.h}
                        </p>
                        <p className="caixa-2" style={{background:  'linear-gradient(to right,rgba(255, 128, 0, 0.7) 5%, rgba(228, 240, 248, 0.42) 5%)'}}>
                          {item.t}
                          <span className="span-p" onClick={() => deleteOne(item.id)}>Delete</span>
                        </p>
                      </li>
                    );
                  }
                });

                
                for (const key in hKeys) {
                  if (key && hKeys.hasOwnProperty(key)) {
                    const ul: JSX.Element = (
                      <ul key={key} className="horizontal-list">
                        {hKeys[key]}
                      </ul>
                    );
                    ulList.push(ul);
                  }
                
                }

                return <div>{ulList}</div>;
              })()
            } 
              {!isLoading && chenge === 'Saturday' &&
              (() => {
                const hKeys: { [key: string]: JSX.Element[] } = {};
                const ulList: JSX.Element[] = [];

                newList.forEach((item) => {
                  if (hKeys[item.h!]) {
                    hKeys[item.h!].push(
                      <li key={item.id}>
                        <p className="caixa-2" style={{ background: 'linear-gradient(to right, rgba(0, 0, 0, 0.7) 5%, rgba(228, 240, 248, 0.42) 5%)' }}>
                          {item.t}
                          <span className="span-p" onClick={() => deleteOne(item.id)}>Delete</span>
                        </p>
                      </li>
                    );
                  } else {
                    hKeys[item.h!] = [];
                    hKeys[item.h!].push(
                      <li key={item.id}>
                        <p className="caixa" style={{backgroundColor: 'rgba(255, 206, 0, 0.7)'}}>
                          {item.h}
                        </p>
                        <p className="caixa-2" style={{background:'linear-gradient(to right, rgba(255, 206, 0, 0.7) 5%, rgba(228, 240, 248, 0.42) 5%)'}}>
                          {item.t}
                          <span className="span-p" onClick={() => deleteOne(item.id)}>Delete</span>
                        </p>
                      </li>
                    );
                  }
                });

                
                for (const key in hKeys) {
                  if (key && hKeys.hasOwnProperty(key)) {
                    const ul: JSX.Element = (
                      <ul key={key} className="horizontal-list">
                        {hKeys[key]}
                      </ul>
                    );
                    ulList.push(ul);
                  }
                
                }

                return <div>{ulList}</div>;
              })()
            }  
            {!isLoading && chenge === 'Sunday' &&
              (() => {
                const hKeys: { [key: string]: JSX.Element[] } = {};
                const ulList: JSX.Element[] = [];

                newList.forEach((item) => {
                  if (hKeys[item.h!]) {
                    hKeys[item.h!].push(
                      <li key={item.id}>
                        <p className="caixa-2" style={{ background: 'linear-gradient(to right, rgba(0, 0, 0, 0.7) 5%, rgba(228, 240, 248, 0.42) 5%)' }}>
                          {item.t}
                          <span className="span-p" onClick={() => deleteOne(item.id)}>Delete</span>
                        </p>
                      </li>
                    );
                  } else {
                    hKeys[item.h!] = [];
                    hKeys[item.h!].push(
                      <li key={item.id}>
                        <p className="caixa" style={{backgroundColor: 'rgba(255, 0, 36, 0.5)'}}>
                          {item.h}
                        </p>
                        <p className="caixa-2" style={{background: 'linear-gradient(to right, rgba(255, 0, 36, 0.5) 5%, rgba(228, 240, 248, 0.42) 5%)'}}>
                          {item.t}
                          <span className="span-p" onClick={() => deleteOne(item.id)}>Delete</span>
                        </p>
                      </li>
                    );
                  }
                });

                
                for (const key in hKeys) {
                  if (key && hKeys.hasOwnProperty(key)) {
                    const ul: JSX.Element = (
                      <ul key={key} className="horizontal-list">
                        {hKeys[key]}
                      </ul>
                    );
                    ulList.push(ul);
                  }
                
                }

                return <div>{ulList}</div>;
              })()
            }  
                 
        </div>
        </section>
      </main>
    </div>
  );
};

export default DashB;
