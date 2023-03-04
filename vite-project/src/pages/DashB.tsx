import React, { useState, useEffect } from "react";
//Style
import "./DashB.css";

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

  return (
    <div className="divPrinc">
      <header className="headerTop">
        <div className="divTit">
          <h1 className="bannerTit">Weekly Planner </h1>
          <p className="subTit">Use this planner to organize your daily issues.</p>
        </div>
        <div className="divHour">hora</div>
        <div className="divTemp">
          {dadosTemp && (
            <div>
              <p> {city}: {dadosTemp.main.temp}°C</p>
              <p>Pais: {dadosTemp.sys.country}</p>
            </div>
          )}
        </div>
        <div className="divLogout">logout</div>
      </header>
    </div>
  );
};

export default DashB;
