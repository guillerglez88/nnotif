import { type Request, type Response } from "aliases"
import { type Route } from "fundation"

const handler = (req: Request, res: Response, route: Route): void => {
  throw new Error("not-implemented")
}

export { handler }
