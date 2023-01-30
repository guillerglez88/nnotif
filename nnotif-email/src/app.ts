import express from "express"
import logger from "morgan"

import { email } from "./routes/email"

const app = express()

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/", email)

export { app }
