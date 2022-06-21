import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.post("/weather", async (req, res) => {
  console.log(req.body);
  const { cityName } = req.body;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.API}&units=metric`;
  console.log(url);
  if (!cityName) {
    res.status(400).send("Please enter a city name");
  }
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  if (data.cod === "404") {
    res.status(404).send("City not found");
  } else {
    res.status(200).json({
      weatherText: `The weather in ${data.name} is ${data.main.temp} degrees`,
    });
  }
});

export default app;
