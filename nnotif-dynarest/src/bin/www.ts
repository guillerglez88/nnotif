import { app } from "../app"
import debug from "debug"
import http from "http"
import dotenv from "dotenv"
import { type AddressInfo } from "net"

debug("nnotif-dynarest:server")
dotenv.config()

const port = process.env.PORT ?? "3000"
app.set("port", port)

const server = http.createServer(app)

const onError = (error: Error & { syscall: string; code: string }): void => {
  if (error.syscall !== "listen") {
    throw error
  }

  switch (error.code) {
    case "EACCES":
      console.error("Port " + port + " requires elevated privileges")
      process.exit(1)
      break
    case "EADDRINUSE":
      console.error("Port " + port + " is already in use")
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

server.listen(port)
server.on("error", onError)
server.on("listening", onListening)