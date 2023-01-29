import { type Request, type Response } from "aliases"
import { type Res, type Route } from "fundation"
import { type PoolClient } from "pg"

import { edit } from "../data/storage"
import { getPathIdName, getPathTypeValue } from "../libs/routes"

const handler = async (
  req: Request,
  res: Response,
  route: Route,
  tx: PoolClient,
): Promise<void> => {
  const type = getPathTypeValue(route)
  const idKey = getPathIdName(route) as string
  const id = req.params[idKey] as string
  const content: Res = { ...req.body, type, id }

  const resource = await edit(content, tx)
  const etag = resource.etag as string

  res
    .status(200) //
    .header("ETag", `"${etag}"`)
    .json(resource)
}

export { handler }
