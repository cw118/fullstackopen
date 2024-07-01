import { useState, useEffect } from "react";
import server from "../server";

const Country = ({ name, capital, area, flags, languages, latlng }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    server.getWeather(...latlng).then((res) => {
      setWeather({
        temp: res.main.temp,
        image: res.weather[0],
        wind: res.wind.speed,
      });
    });
  }, [latlng]);

  return (
    <div>
      <h2>{name.common}</h2>
      <p>capital {capital}</p>
      <p>area {area}</p>
      <h4>languages:</h4>
      <ul>
        {Object.entries(languages).map((lang) => (
          <li key={lang[0]}>{lang[1]}</li>
        ))}
      </ul>
      <img src={flags.svg} alt={flags.alt} />
      <h3>Weather in {capital}</h3>
      <p>temperature {weather.temp} Celsius</p>
      <img
        src={
          "https://openweathermap.org/img/wn/" + weather.image.icon + "@2x.png"
        }
        alt={weather.image.description}
      />
      <p>wind {weather.wind} m/s</p>
    </div>
  );
};

export default Country;
