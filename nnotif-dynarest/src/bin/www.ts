import debug from "debug"
import http from "http"
import { type AddressInfo } from "net"

import { config } from "../libs/config"
import { app } from "../app"

debug("nnotif-dynarest:server")

app.set("port", config.port)

const server = http.createServer(app)

const onError = (error: Error & { syscall: string; code: string }): void => {
  if (error.syscall !== "listen") {
    throw error
  }

  switch (error.code) {
    case "EACCES":
      console.error(`Port ${config.port} requires elevated privileges`)
      process.exit(1)
      break
    case "EADDRINUSE":
      console.error(`Port ${config.port} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

const onListening = ():void => {
  const addr = server.address()
  const bind = typeof addr === "string" ? "pipe " + addr : `port ${(addr as AddressInfo).port}`
  debug("Listening on " + bind)
}

server.listen(config.port)
server.on("error", onError)
server.on("listening", onListening)