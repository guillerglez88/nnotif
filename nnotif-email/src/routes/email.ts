import express from "express"

const email = express.Router()

email.get("/email", (req, res) => {
  res.status(200).json({ status: "running" })
})

export { email }
