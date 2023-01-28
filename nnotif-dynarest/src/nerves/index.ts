import * as read from "./read"
import * as create from "./create"
import * as upsert from "./upsert"
import * as remove from "./remove"
import * as search from "./search"
import * as notFound from "./not-found"

type Handler = typeof read.handler

const nerves: Record<string, Handler> = {
  "/Coding/nerves?code=read": read.handler,
  "/Coding/nerves?code=create": create.handler,
  "/Coding/nerves?code=upsert": upsert.handler,
  "/Coding/nerves?code=delete": remove.handler,
  "/Coding/nerves?code=search": search.handler,
  "/Coding/nerves?code=not-found": notFound.handler,
}

const pick = (code: string): Handler => nerves[code]

export { pick }
