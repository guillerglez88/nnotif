import { type Request, type Response } from "aliases"
import { type Route } from "fundation"
import { type PoolClient } from "pg"

import { deleted, withResp } from "../libs/response"
import { remove } from "../data/storage"
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

  const result = await remove({ type, id }, tx)

  withResp(result, deleted, res)
}

export { handler }
