import { type Res } from "data"
import fetch from "node-fetch"
import { type Outcome } from "validation"

import { config } from "../libs/config"
import { validateResp } from "./validation"

const baseUrl = config.dynarest.replace(/\/$/, "")

const read = async <T extends Res>(res: Res): Promise<Outcome | T> => {
  const url = `${baseUrl}/${res.type}/${res.id as string}`

  const resp = await fetch(url, {
    method: "GET",
    headers: {
      "Accept": "application/json"
    }
  })

  return await validateResp<T>(resp)
}

const create = async <T extends Res>(res: T): Promise<Outcome | T> => {
  const url = `${baseUrl}/${res.type}`

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(res),
  })

  return await validateResp<T>(resp)
}

const update = async <T extends Res>(res: T): Promise<Outcome | T> => {
  const url = `${baseUrl}/${res.type}/${res.id as string}`

  const resp = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(res),
  })

  return await validateResp<T>(resp)
}

export { read, create, update }
