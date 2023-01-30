import express from "express"

const subs = express.Router()

subs.get("/subs", (req, res) => {
  res.status(200).json({ status: "running" })
})

export { subs }
