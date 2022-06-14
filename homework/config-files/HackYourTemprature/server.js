import express from "express";
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.post("/weather", (req, res) => {
  const cityName = req.body.cityName;

  if (!cityName) {
    res.status(400).send("Please provide a city name");
  } else {
    res.json(`The weather in ${cityName} is good`);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
