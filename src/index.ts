import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import * as MySQLConnector from './utils/mysql.connector';
import routes from "./routes/routes";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";

dotenv.config();


if (!process.env.PORT) {
   process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const corsOptions = {
  origin: "*",
  methods: "GET,PUT,POST,DELETE",
  optionsSuccessStatus: 200,
};

const app = express();

MySQLConnector.init();

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use("", routes);

app.use(notFoundHandler);
app.use(errorHandler);

app.use(function(req ,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});