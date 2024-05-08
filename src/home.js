import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";


function Home() {
  const [data, setData] = useState({
    //initial data when page loads for first time
    celsius: 31,
    city: "Kochi",
    humidity: 68,
    speed: 5.68,
    image: "https://cdn-icons-png.flaticon.com/512/3222/3222807.png",
    feelsLike: 35,
  });

  const [names, setNames] = useState("");
  const [error, setError] = useState("");

  const handleChange = () => {
    //fn when search button is clicked
    if (names !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${names}&appid=5a4bcd25647654ba46f2c59f8ab61532&units=metric`; //api from openweather

      axios
        .get(apiUrl) //using axios library for react

        .then((res) => {
          //if search is successful to show output on console
          console.log(res.data);

          let imageUrl = "";
          if (res.data.weather[0].main === "Clouds") {
            //images as per weather condition
            imageUrl =
              "https://cdn-icons-png.flaticon.com/512/3222/3222807.png";
          } else if (res.data.weather[0].main === "Clear") {
            imageUrl =
              "https://cdn-icons-png.flaticon.com/512/2698/2698240.png";
          } else if (res.data.weather[0].main === "Rain") {
            imageUrl =
              "https://cdn-icons-png.flaticon.com/256/5216/5216895.png";
          } else if (res.data.weather[0].main === "Drizzle") {
            imageUrl =
              "https://cdn-icons-png.flaticon.com/512/7774/7774436.png";
          } else if (res.data.weather[0].main === "Snow") {
            imageUrl = "https://cdn-icons-png.flaticon.com/512/414/414866.png";
          } else {
            imageUrl =
              "https://cdn-icons-png.flaticon.com/512/3222/3222807.png";
          }

          setData({
            //taking data from object
            ...data,
            celsius: res.data.main.temp,
            city: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: imageUrl,
            feelsLike: res.data.main.feels_like,
          });
          setError("");
        })
        .catch((err) => {
          //if search is invalid show error
          if (err.response.status === 404) {
            setError("Invalid City Name");
          } else {
            setError(""); //if no error set disable error message
          }

          console.log(err); //just to check the output in console
        });
    }
  };

  return (
    <>
    <div className="container">
      <div className="weather">
        <div className="search">
          <input
            className="type"
            type="text"
            placeholder="Enter City Name"
            id="searcharea"
            onChange={(e) => setNames(e.target.value)}
          ></input>
          <button className="btn" onClick={handleChange}></button>
        </div>
        <div className="error">
          <p>{error}</p>
        </div>

        <div className="info">
          <img src={data.image} alt="" className="icon"></img>
          <h1>{Math.round(data.celsius)}°C</h1>

          <h2>{data.city}</h2>
          <h4> Feels like {Math.round(data.feelsLike)}°C </h4>
          <div className="detail">
            <div className="col">
              <img
                src="https://cdn-icons-png.flaticon.com/512/442/442147.png"
                alt=""
              ></img>
              <div className="humidity">
                <p>{data.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img
                src="https://cdn-icons-png.flaticon.com/512/192/192553.png"
                alt=""
              ></img>
              <div className="wind">
                <p>{data.speed} km/h</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
    );
}


export default Home;
