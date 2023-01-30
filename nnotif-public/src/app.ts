import express from "express"
import logger from "morgan"

import { subs } from "./routes/subs"

const app = express()

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/", subs)

export { app }
