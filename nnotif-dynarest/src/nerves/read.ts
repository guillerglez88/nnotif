import { type Request, type Response } from "aliases"
import { type Route } from "fundation"
import { type PoolClient } from "pg"

import { getPathIdName, getPathTypeValue } from "../libs/routes"
import { fetch } from "../data/storage"

const handler = async (
  req: Request,
  res: Response,
  route: Route,
  tx: PoolClient,
): Promise<void> => {
  const type = getPathTypeValue(route)
  const id = req.params[getPathIdName(route)] as string

  const resource = await fetch({ type, id }, tx)

  res.status(200).json(resource)
}

export { handler }
