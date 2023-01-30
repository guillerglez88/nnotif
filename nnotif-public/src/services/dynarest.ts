import { type Res } from "data"
import fetch, { type Response } from "node-fetch"

import { config } from "../libs/config"

const baseUrl = config.dynarest.replace(/\/$/, "")

const create = async <T extends Res>(res: T): Promise<Response> => {
  const url = `${baseUrl}/${res.type}`

  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(res),
  })

  return resp
}

export { create }
