import { type Request, type Response } from "aliases"
import { type Res, type Route } from "fundation"
import { type PoolClient } from "pg"

import { create } from "../data/storage"
import { getPathIdName, getPathTypeValue } from "../libs/routes"

const handler = async (
  req: Request,
  res: Response,
  route: Route,
  tx: PoolClient,
): Promise<void> => {
  const type = getPathTypeValue(route)
  const id = req.params[getPathIdName(route)] as string | undefined
  const content: Res = { ...req.body, type, id }

  const resource = await create(content, tx)

  res
    .status(201)
    .header("Location", resource.url)
    .json(resource)
}

export { handler }
