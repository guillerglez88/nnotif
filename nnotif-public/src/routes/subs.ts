import { type CreateSubsReq } from "aliases"
import express from "express"

const subs = express.Router()

subs.post("/subs", (req: CreateSubsReq, res) => {
  res.status(200).json({ status: "running" })
})

export { subs }
