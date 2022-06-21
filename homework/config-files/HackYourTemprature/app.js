import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "hello from backend to frontend!" });
});

app.post("/weather", async (req, res) => {
  const { cityName } = req.body;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.API}&units=metric`;

  try {
    if (!cityName) {
      res.status(400).json("Please enter a city name");
    }
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      res.status(404).json("City not found");
    } else {
      res.status(200).json({
        weatherText: `The weather in ${data.name} is ${data.main.temp} degrees`,
      });
    }
  } catch (err) {
    res.status(500).send({ msg: "Something went wrong" });
  }
});

export default app;
