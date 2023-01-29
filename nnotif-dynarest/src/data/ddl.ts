import { type Sql } from "aliases"
import { type Sequence } from "fundation"
import { type PoolClient } from "pg"

import { list } from "./dql"

const createTableDDL = (type: string): Sql => {
  const typeName = type.toLocaleLowerCase()

  const ddl = [`CREATE TABLE IF NOT EXISTS public.${typeName} (
        id          TEXT             NOT NULL,
        type        TEXT             NOT NULL,
        resource    JSONB            NOT NULL,
        created     timestamptz      NOT NULL,
        modified    timestamptz      NOT NULL,
        CONSTRAINT  ${typeName}_pk PRIMARY KEY (id));`]

  return [ddl]
}

const createSeqDDL = (seq: Sequence): Sql => {
  const name = (seq.id as string).toLocaleLowerCase()

  const ddl = `CREATE SEQUENCE IF NOT EXISTS public.${name}
        MINVALUE $1
        MAXVALUE $2
        START $3
        INCREMENT BY $4
        CACHE $5
        NO CYCLE;`

  return [ddl, seq.min, seq.max, seq.start, seq.inc, seq.cache]
}

const tableExists = async (type: string, tx: PoolClient): Promise<boolean> => {
  try {
    await list(type, 1, tx)
    return true
  } catch (_error) {
    return false
  }
}

const createTable = async (type: string, tx: PoolClient): Promise<void> => {
  const exists = await tableExists(type, tx)

  if (exists)
    return;

  const [ddl] = createTableDDL(type)
  await tx.query(ddl as string)
}

export { createTableDDL, createSeqDDL, tableExists, createTable }
