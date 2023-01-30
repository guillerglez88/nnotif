import { type UpRow, type Sql, type InRow } from "aliases"
import { type Row } from "data"
import { type Res } from "fundation"
import { type PoolClient } from "pg"

const insertDML = <T extends Res>(row: InRow<T>): Sql => {
  const sql: Sql = [
    `INSERT INTO ${row.type}
            (id, type, resource, created, modified) 
     VALUES ($1,   $2,       $3,      $4,       $5) 
     RETURNING *`,
    row.id,
    row.type,
    row.resource,
    row.created,
    row.modified
  ]

  return sql
}

const updateDML = <T extends Res>(row: Pick<Row<T>, "resource" | "modified" | "id" | "type">): Sql => {
  const sql: Sql = [
    `UPDATE ${row.type} 
     SET resource = $1, 
         modified = $2, 
         etag = nextval('etag')
         WHERE id=$3 
     RETURNING *`,
    row.resource,
    row.modified,
    row.id,
  ]

  return sql
}

const insert = async <T extends Res>(row: InRow<T>, tx: PoolClient): Promise<Row<T>> => {
  const [sql, ...params] = insertDML(row)
  const { rows } = await tx.query<Row<T>>(sql as string, params)

  return rows[0]
}

const update = async <T extends Res>(row: UpRow<T>, tx: PoolClient): Promise<Row<T>> => {
  const [sql, ...params] = updateDML(row)
  const { rows } = await tx.query<Row<T>>(sql as string, params)

  return rows[0]
}

export { insertDML, updateDML, insert, update }
