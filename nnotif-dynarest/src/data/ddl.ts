import { type PoolClient } from "pg"

import { search } from "./storage"

const storageDDL = (type: string): string => {
  const typeName = type.toLocaleLowerCase()

  const ddl = `CREATE TABLE IF NOT EXISTS public.${typeName} (
        id          TEXT             NOT NULL,
        resource    JSONB            NOT NULL,
        created     timestamptz      NOT NULL,
        modified    timestamptz      NOT NULL,
        CONSTRAINT  ${typeName}_pk PRIMARY KEY (id));`

  return ddl
}

const alreadyProvisioned = async (type: string, tx: PoolClient): Promise<boolean> => {
  try {
    await search({ type }, tx)
    return true
  } catch (_error) {
    return false
  }
}

const provision = async (type: string, tx: PoolClient): Promise<void> => {
  const provisioned = await alreadyProvisioned(type, tx)

  if (provisioned)
    return;

  const ddl = storageDDL(type)
  await tx.query(ddl)
}

export { storageDDL, alreadyProvisioned, provision }
