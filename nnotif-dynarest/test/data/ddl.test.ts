/**
 * @group unit
 * @group sql
 * @group ddl
 */

import { type Seq } from "fundation"
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

  it("Can build create-sequence DDL", () => {
    const seq: Seq = {
      type: "Seq",
      id: "etag",
      start: 1,
      inc: 1,
      cache: 12,
    }

    const ddl = sut.createSeqDDL(seq)

    expect(ddl).toEqual([
      `CREATE SEQUENCE IF NOT EXISTS public.etag
        MINVALUE 1
        NO MAXVALUE
        START 1
        INCREMENT BY 1
        CACHE 12
        NO CYCLE`,
    ])
  })
})
