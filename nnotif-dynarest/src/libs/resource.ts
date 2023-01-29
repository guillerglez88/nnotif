import { type Row } from "data"
import { type Res } from "fundation"

const normalize = <T extends Res>(res: Row<T>): T => {
  return {
    ...res.resource,
    type: res.type,
    id: res.id,
    url: `/${res.type}/${res.id}`,
    created: res.created,
    modified: res.modified,
  }
}

export { normalize }
