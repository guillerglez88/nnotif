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

export { storageDDL }
