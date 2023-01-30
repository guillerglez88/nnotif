import { type CreateSubsReq } from "aliases"
import express from "express"

import { validate } from "../services/validation"

const subs = express.Router()

subs.post("/subs", (req: CreateSubsReq, res) => {
  const outcome = validate(req.body)
  const isValid = (outcome.issues ?? []).length === 0

  if (!isValid) {
    res.status(400).json({...outcome})
  }

  res.status(200).json({ status: "running" })
})

export { subs }
