import express, {
  Express,
  Request,
  Response,
  Application,
  NextFunction,
} from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import log4js from "log4js";
import axios from "axios";

type Person = {
  id: number;
  name: string;
  age: number;
};

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

app.get("/persons", (req: Request, res: Response, next: NextFunction) => {
  axios
    .get("http://localhost:3001/persons")
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(404).send("Persons not found");
    });
});

app.get("/persons/:id", (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  axios
    .get(`http://localhost:3001/persons/${id}`)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(404).send("Person not found");
    });
});

app.post("/persons", (req: Request, res: Response, next: NextFunction) => {
  const person: Person = req.body;
  axios
    .post("http://localhost:3001/persons", person)
    .then((response) => {
      res.status(201).json(response.data);
    })
    .catch((error) => {
      res.status(404).send("Person not added");
    });
});

app.put("/persons/:id", (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const person: Person = req.body;
  axios
    .put(`http://localhost:3001/persons/${id}`, person)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(404).send("Person not updated");
    });
});
