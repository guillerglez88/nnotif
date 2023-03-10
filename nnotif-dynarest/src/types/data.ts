import { type Res } from "fundation"

export interface Row<T extends Res> {
  id: string
  type: string
  created: Date
  modified: Date
  resource: T
  etag: string
}
