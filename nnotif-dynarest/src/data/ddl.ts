import { type PoolClient } from "pg"

import { search } from "./storage"

const createTableDDL = (type: string): string => {
  const typeName = type.toLocaleLowerCase()

  const ddl = `CREATE TABLE IF NOT EXISTS public.${typeName} (
        id          TEXT             NOT NULL,
        resource    JSONB            NOT NULL,
        created     timestamptz      NOT NULL,
        modified    timestamptz      NOT NULL,
        CONSTRAINT  ${typeName}_pk PRIMARY KEY (id));`

  return ddl
}

const createSeqDDL = (name: string): string => {
  const seqName = name.toLocaleLowerCase()

  const ddl = `CREATE SEQUENCE IF NOT EXISTS public.${seqName}
        INCREMENT BY 1
        MINVALUE 1
        MAXVALUE 9223372036854775807
        START 1
        CACHE 1
        NO CYCLE;`

  return ddl
}

const tableExists = async (type: string, tx: PoolClient): Promise<boolean> => {
  try {
    await search({ type }, tx)
    return true
  } catch (_error) {
    return false
  }
}

const createTable = async (type: string, tx: PoolClient): Promise<void> => {
  const exists = await tableExists(type, tx)

  if (exists)
    return;

  const ddl = createTableDDL(type)
  await tx.query(ddl)
}

export { createTableDDL, createSeqDDL, tableExists, createTable }
