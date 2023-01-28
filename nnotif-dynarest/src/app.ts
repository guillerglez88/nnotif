import express from "express"
import logger from "morgan"

import { loadRoutes } from "./routes"
import * as seed from "./seed"

const app = express()

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

;void (async () => {
  await seed.init()

  const routes = await loadRoutes()

  app.use("/", routes)
})()

export { app }
