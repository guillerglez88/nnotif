import { type SeqConfig, type Sql } from "aliases"
import { type Seq } from "fundation"
import { type PoolClient } from "pg"

import { list } from "./dql"

const createTableDDL = (type: string): Sql => {
  const typeName = type.toLocaleLowerCase()

  const ddl = [
    `CREATE TABLE IF NOT EXISTS public.${typeName} (
        id          TEXT             NOT NULL,
        type        TEXT             NOT NULL,
        resource    JSONB            NOT NULL,
        created     timestamptz      NOT NULL,
        modified    timestamptz      NOT NULL,
        CONSTRAINT  ${typeName}_pk PRIMARY KEY (id))`,
  ]

  return ddl
}

const createSeqDDL = (sequence: Seq): Sql => {
  const name = (sequence.id as string).toLocaleLowerCase()
  const seq: SeqConfig = {
    start: 1,
    inc: 1,
    cache: 12,
    ...sequence,
  }

  const ddl = [
    `CREATE SEQUENCE IF NOT EXISTS public.${name}
        MINVALUE 1
        NO MAXVALUE
        START ${seq.start}
        INCREMENT BY ${seq.inc}
        CACHE ${seq.cache}
        NO CYCLE`,
  ]

  return ddl
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
  const [ddl] = createTableDDL(type)
  await tx.query(ddl as string)
}

const createSeq = async (seq: Seq, tx: PoolClient): Promise<void> => {
  const [ddl] = createSeqDDL(seq)
  await tx.query(ddl as string)
}

export { createTableDDL, createSeqDDL, tableExists, createTable, createSeq }
