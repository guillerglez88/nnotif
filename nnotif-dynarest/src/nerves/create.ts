import { type Request, type Response } from "aliases"
import { type Res, type Route } from "fundation"
import { type PoolClient } from "pg"

import { create } from "../data/storage"
import { getPathTypeValue } from "../libs/routes"

const handler = async (
  req: Request,
  res: Response,
  route: Route,
  tx: PoolClient,
): Promise<void> => {
  const type = getPathTypeValue(route)
  const content: Res = { ...req.body, type }

  const resource = await create(content, tx)

  res
    .status(201)
    .header("Location", resource.url)
    .json(resource)
}

export { handler }
