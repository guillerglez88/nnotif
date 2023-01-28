import { type Request, type Response } from "aliases"
import { type Route } from "fundation"
import { type PoolClient } from "pg"

const handler = async (req: Request, res: Response, route: Route, tx: PoolClient): Promise<void> => {
  throw new Error("not-implemented")
}

export { handler }
