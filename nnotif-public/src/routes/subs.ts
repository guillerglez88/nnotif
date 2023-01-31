/* eslint-disable @typescript-eslint/no-misused-promises */
import { type UpdateSubsReq, type CreateSubsReq, type ReadSubsReq } from "aliases"
import express from "express"
import { type UserSubs } from "data"

import { create, read, update } from "../services/dynarest"
import { validateSubs } from "../services/validation"
import { fold, getFailure, getSuccess, isSuccess, mapSuccess } from "../libs/outcome"
import { mapFromUserSubs } from "../libs/mappers"

const subs = express.Router()

subs.get("/subs/:id", async (req: ReadSubsReq, res) => {
  const [status, resp] = await read<UserSubs>({
    type: "UserSubs",
    id: req.params.id,
  })

  const subs = mapSuccess(resp, mapFromUserSubs)
  const etag = fold(
    resp,
    (r) => r.etag,
    (_) => undefined,
  )

  if (etag !== undefined) {
    res.header("ETag", `"${etag}"`)
  }

  res.status(status).json({ ...subs })
})

subs.post("/subs", async (req: CreateSubsReq, res) => {
  const valid = validateSubs(req.body)

  if (!isSuccess(valid)) {
    const err = getFailure(valid)
    return res.status(400).json({ ...err })
  }

  const subs = getSuccess(valid)
  const [status, resp] = await create<UserSubs>({
    ...subs,
    type: "UserSubs",
    status: `/Coding/usersubs-status?code=${req.body.status}`,
  })

  const dbsubs = mapSuccess(resp, mapFromUserSubs)
  const headers = fold(
    resp,
    (r) => ({ etag: `"${r.etag as string}"`, loc: `/subs/${r.id as string}` }),
    (_) => undefined,
  )

  if (headers !== undefined) {
    res.header("ETag", headers.etag)
    res.header("Location", headers.loc)
  }

  res.status(status).json({ ...dbsubs })
})

subs.put("/subs/:id", async (req: UpdateSubsReq, res) => {
  const valid = validateSubs(req.body)

  if (!isSuccess(valid)) {
    const err = getFailure(valid)
    return res.status(400).json({ ...err })
  }

  const subs = getSuccess(valid)
  const [status, resp] = await update<UserSubs>({
    ...subs,
    type: "UserSubs",
    id: req.params.id,
    status: `/Coding/usersubs-status?code=${req.body.status}`,
  })

  const dbsubs = mapSuccess(resp, mapFromUserSubs)
  const etag = fold(
    resp,
    (r) => `"${r.etag as string}"`,
    (_) => undefined,
  )

  if (etag !== undefined) {
    res.header("ETag", etag)
  }

  res.status(status).json({ ...dbsubs })
})

export { subs }
