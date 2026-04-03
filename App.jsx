import { useState } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

function Weather_App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "b8a0dfc4d74fdc5bfffbd9f581e2bdc5";

  const getWeather = () => {
    if (!city) {
      alert("Oops! Please enter city name...");
      return;
    }

    setLoading(true);

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
      )
      .then((res) => {
        console.log(res.data);
        setWeather(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("City Not Found!!!!!!!");
        setLoading(false);
      });
  };

  return (
    <div>
      <Header />

      <input
        type="text"
        placeholder="Tell me the city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <br />

      <button type="submit" onClick={getWeather}>
        {" "}
        Get Weather
      </button>

      {Loading && <h2>Fetching..</h2>}
      {error && <h2>{error}</h2>}

      {weather && (
        <div className="weather-box">
          <h2> Live Weather Report⛅</h2>
          <p> 🌡️Temp: {weather.main.temp} °C</p>
          <p> 🌡️Feels Like: {weather.main.feels_like} °C</p>
          <p> 🌤️Condition: {weather.weather[0].description}</p>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Weather_App;
