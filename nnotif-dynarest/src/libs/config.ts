import dotenv from "dotenv"

dotenv.config()

const config = {
  port: process.env.PORT ?? "3000",
  db: process.env.DB ?? "jdbc:postgresql://localhost:5432/nnotif",
  defaultLimit: process.env.DEFAULT_LIMIT ?? "128"
}

export { config }
