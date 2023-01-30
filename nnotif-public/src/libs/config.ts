import dotenv from "dotenv"

dotenv.config()

const config = {
  port: process.env.PORT ?? "3001",
  dynarest: process.env.DYNAREST ?? "http://localhost:3000"
}

export { config }
