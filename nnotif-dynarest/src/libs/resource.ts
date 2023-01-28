import { type Row } from "data"
import { type Res } from "fundation"

const normalize = <T extends Res>(type: string, res: Row<T>): T => {
  return {
    ...res.resource,
    type,
    id: res.id,
    url: `/${type}/${res.id}`,
    created: res.created,
    modified: res.modified,
  }
}

export { normalize }
