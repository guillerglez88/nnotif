import { type Row } from "data"
import { type Res } from "fundation"

const normalize = <T extends Res>(type: string, res: Row<T>): T => {
  return { ...res.resource, type, url: `/${type}/${res.id}` }
}

export { normalize }