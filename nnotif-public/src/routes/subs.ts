/* eslint-disable @typescript-eslint/no-misused-promises */
import { type CreateSubsReq } from "aliases"
import express from "express"
import { type UserSubs } from "data"

import { create } from "../services/dynarest"
import { validateSubs } from "../services/validation"
import { fold, isValid } from "../libs/outcome"
import { mapFromUserSubs } from "../libs/mappers"

const subs = express.Router()

subs.post("/subs", async (req: CreateSubsReq, res) => {
  const outcome = validateSubs(req.body)

  if (!isValid(outcome)) {
    res.status(400).json({ ...outcome })
  }

  const resp = await create<UserSubs>({
    type: "UserSubs",
    ...req.body,
  })

  const result = fold(
    resp,
    (resource) => ({
      status: 201,
      loc: `/subs/${resource.id as string}` as string | undefined,
      etag: resource.etag,
      body: mapFromUserSubs(resource) as object,
    }),
    (outcome) => ({
      status: 500,
      loc: undefined,
      etag: undefined,
      body: outcome,
    }),
  )

  if (result.loc !== undefined) {
    res.header("Location", result.loc)
  }

  if (result.etag !== undefined) {
    res.header("ETag", `"${result.etag}"`)
  }

  res.status(result.status).json({ ...result.body })
})

export { subs }
