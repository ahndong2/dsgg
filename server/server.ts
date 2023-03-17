import express, { Express } from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import { userRouter } from "./routes/user.js";
import { teamRouter } from "./routes/team.js";
import { gameRouter } from "./routes/game.js";
import { userGameLog } from "./routes/userGameLog.js";

const __dirname = path.resolve();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// APP Route 연결
app.use("/api", userRouter);
app.use("/api", teamRouter);
app.use("/api", gameRouter);
app.use("/api", userGameLog);

app.listen(port);

// CONNECT TO MONGODB SERVER
const db = mongoose.connection;
db.on("error", console.error);
db.once("open", function () {
  console.log("Connected to mongod server");
});
// 몽구스 연결
mongoose
  .connect(
    "mongodb+srv://ahndongjun2:password123!@dsgg.t74fhq6.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB conected"))
  .catch((err: Error) => {
    console.log(err);
  });

// app.use( express.static( path.join(__dirname, 'build') ) );

// app.get("/", function (request, response) {
//   response.sendFile(path.join(__dirname, "build/index.html"));
// });
// app.get("*", function (request, response) {
//   response.sendFile(path.join(__dirname, "build/index.html"));
// });
