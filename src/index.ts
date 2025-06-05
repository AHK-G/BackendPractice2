import express, { Request, Response } from "express";
import { error } from "node:console";

const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");

class Car {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

// const car: Car = {
//   id: 1,
//   name: "Ford",
// };

const carsArray: Array<Car> = [
  { id: 1, name: "Ford" },
  { id: 2, name: "BMW" },
  { id: 3, name: "Challenger" },
];

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

app.get("/hello", (req, res) => {
  res.send("Hello World! :)");
});

app.get("/cars", (req, res) => {
  res.send(carsArray);
});

app.get("/cars/:id", (req, res) => {
  const { id } = req.params;
  const car = carsArray.find((car) => car.id === Number(id));
  console.log(typeof car);
  if (typeof car === "object") {
    res.status(200).send(car);
  } else {
    res.status(404).json({ error: "Car not found" });
  }
});





app.use(bodyParser.json());

app.post("/cars", (req, res) => {
    const { id } = req.body;
    const car = carsArray.find((car) => car.id === Number(id));
    if (typeof car === "object") {
        res.status(400).json({ error: "id already exist" });
    } else {
        const newCar = new Car(req.body.id, req.body.name);
        carsArray.push(newCar);
        res.send(newCar);
    }

});

app.put("/cars/:id", (req, res) => {
  const { id } = req.params;
  const car = carsArray.find((car) => car.id === Number(id));
  const newName = req.body.name;
  if (car) {
    car.name = newName;
  }
  res.send(car);
});

app.delete("/cars/:id", (req, res) => {
  const { id } = req.params;
  const car = carsArray.find((car) => car.id === Number(id));
  // console.log(carsArray);
  if (car) {
    const carIndex = carsArray.indexOf(car);
    carsArray.splice(carIndex);
    // console.log(carsArray);
  }
  res.send(carsArray);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
