import React, { useState, useEffect } from "react";
//Style
import "./DashB.css";
//img
import nuvm from "../assets/img/Vector (2).svg";

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

const DashB = () => {
  const [dadosTemp, setDadosTemp] = useState<WeatherData>();
  const [horaAtual, setHoraAtual] = useState<string>('');
  const [dayAtual,setDayAtual] = useState<string>('');
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
        <div className="divLogout">logout</div>
      </header>
    </div>
  );
};

export default DashB;
