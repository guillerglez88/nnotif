import { type Res } from "data"
import fetch from "node-fetch"
import { type Outcome } from "validation"

import { config } from "../libs/config"
import { validateResp } from "./validation"

const baseUrl = config.dynarest.replace(/\/$/, "")

const create = async <T extends Res>(res: T): Promise<Outcome | T> => {
  const url = `${baseUrl}/${res.type}`

  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(res),
  })

  return await validateResp<T>(resp)
}

export { create }
