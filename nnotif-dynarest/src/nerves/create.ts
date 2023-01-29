import { type Request, type Response } from "aliases"
import { type Resource, type Res, type Route } from "fundation"
import { type PoolClient } from "pg"

import { create } from "../data/storage"
import { getPathIdName, getPathTypeValue } from "../libs/routes"
import { processRes } from "../modules/resource"
import { provision } from "../data/ddl"

const handler = async (
  req: Request,
  res: Response,
  route: Route,
  tx: PoolClient,
): Promise<void> => {
  const type = getPathTypeValue(route)
  const idKey = getPathIdName(route)
  const id = idKey === undefined ? undefined : req.params[idKey] as string | undefined
  const content: Res = { ...req.body, type, id }

  if (type === "Resource") {
    const resource = (content as Resource)
    await provision(resource.of, tx)
    await processRes(resource, tx)
  }

  const resource = await create(content, tx)

  res.status(201).header("Location", resource.url).json(resource)
}

export { handler }
