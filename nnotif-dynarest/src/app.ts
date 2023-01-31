import express from "express"
import logger from "morgan"

import { errorHandler } from "./middlewares/error-handler"
import { loadRoutes } from "./routes"
import * as seed from "./seed"
import * as nnotifPublic from "./seed/nnotif-public"

const app = express()

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

void (async () => {
  await seed.init()
  await nnotifPublic.seed()

  const routes = await loadRoutes()

  app.use("/", routes)
  app.use(errorHandler)
})()

export { app }
