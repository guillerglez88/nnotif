import { type Res } from "data"
import fetch from "node-fetch"
import { type Outcome } from "validation"

import { config } from "../libs/config"
import { validateResp } from "./validation"

const baseUrl = config.dynarest.replace(/\/$/, "")

const read = async <T extends Res>(res: Res): Promise<[number, T | Outcome]> => {
  const url = `${baseUrl}/${res.type}/${res.id as string}`

  const resp = await fetch(url, {
    method: "GET",
    headers: {
      "Accept": "application/json"
    }
  })

  const valid = await validateResp<T | Outcome>(resp)

  return [resp.status, valid]
}

const create = async <T extends Res>(res: T): Promise<[number, T | Outcome]> => {
  const url = `${baseUrl}/${res.type}`

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(res),
  })

  const valid = await validateResp<T | Outcome>(resp)

  return [resp.status, valid]
}

const update = async <T extends Res>(res: T): Promise<[number, T | Outcome]> => {
  const url = `${baseUrl}/${res.type}/${res.id as string}`

  const resp = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(res),
  })

  const valid = await validateResp<T | Outcome>(resp)

  return [resp.status, valid]
}

export { read, create, update }
