/**
 * @group unit
 * @group sql
 * @group ddl
 */

import * as sut from "../../src/data/ddl"

describe("SQL-DDL operations", () => {
  it("Can build create-table DDL", () => {
    const ddl = sut.createTableDDL("Resource")

    expect(ddl).toEqual([
      `CREATE TABLE IF NOT EXISTS public.resource (
        id          TEXT             NOT NULL,
        type        TEXT             NOT NULL,
        resource    JSONB            NOT NULL,
        created     timestamptz      NOT NULL,
        modified    timestamptz      NOT NULL,
        etag        TEXT             NOT NULL DEFAULT nextval('etag'),
        CONSTRAINT  resource_pk PRIMARY KEY (id))`,
    ])
  })
})
