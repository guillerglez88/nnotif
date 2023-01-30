import { type Request, type Response } from "aliases"
import { type Resource, type Res, type Route } from "fundation"
import { type PoolClient } from "pg"

import { created, withResp } from "../libs/response"
import { create } from "../data/storage"
import { getPathIdName, getPathTypeValue } from "../libs/routes"
import { processRes } from "../modules/resource"

const handler = async (
  req: Request,
  res: Response,
  route: Route,
  tx: PoolClient,
): Promise<void> => {
  const type = getPathTypeValue(route)
  const idKey = getPathIdName(route)
  const id = idKey === undefined ? undefined : (req.params[idKey] as string | undefined)
  const content: Res = { ...req.body, type, id }

  if (type === "Resource") {
    const resource = content as Resource
    await processRes(resource, tx)
  }

  const result = await create(content, tx)

  withResp(result, created, res)
}

export { handler }
