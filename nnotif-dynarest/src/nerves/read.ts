import { type Request, type Response } from "aliases"
import { type PoolClient } from "pg"
import { type Route } from "fundation"

import { getPathIdName, getPathTypeValue } from "../libs/routes"
import { fetch } from "../data/storage"
import { ok, withResp } from "../libs/response"

const handler = async (
  req: Request,
  res: Response,
  route: Route,
  tx: PoolClient,
): Promise<void> => {
  const type = getPathTypeValue(route)
  const idKey = getPathIdName(route) as string
  const id = req.params[idKey] as string

  const result = await fetch({ type, id }, tx)

  withResp(result, ok, res)
}

export { handler }
