import express from "express";
import logger from "morgan";

import { index } from "./routes/index";
import { users } from "./routes/users";

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", index);
app.use("/users", users);

export { app };
