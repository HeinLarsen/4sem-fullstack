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
import { notFound, errorHandler } from "./error";

type Person = {
  id: string;
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
app.use("/", express.static("public"));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

app.get("/persons/:id", (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  axios
    .get(`http://localhost:3001/persons/${id}`)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        res.status(404).send("Person not found");
      } else {
        next(error);
      }
    });
});

app.post("/persons", (req: Request, res: Response, next: NextFunction) => {
  const person: Person = req.body;
  console.log(person);

  if (
    !person ||
    typeof person !== "object" ||
    !person.id ||
    !person.name ||
    !person.age
  ) {
    res.status(400).send("Invalid person data");
    return;
  }
  axios
    .post("http://localhost:3001/persons", person)
    .then((response) => {
      res.status(201).json(response.data);
    })
    .catch((error) => {
      next(error);
    });
});

app.put("/persons/:id", (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const person: Person = req.body;
  if (!person || typeof person !== "object" || !person.name || !person.age) {
    res.status(400).send("Invalid person data");
    return;
  }
  axios
    .put(`http://localhost:3001/persons/${id}`, person)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        res.status(404).send("Person not found");
      } else {
        next(error);
      }
    });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Not Found");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

// Error Handling
app.use(notFound);
app.use(errorHandler);
