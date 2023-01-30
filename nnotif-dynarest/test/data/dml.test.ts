/**
 * @group unit
 * @group sql
 * @group dml
 */

import { inRow } from "../fixture"
import * as sut from "../../src/data/dml"

describe("SQL-DML operations", () => {
  it("Can build insert-row DML", () => {
    const dml = sut.insertDML(inRow)

    expect(dml).toEqual([
      `INSERT INTO Resource
            (id, type, resource, created, modified) 
     VALUES ($1,   $2,       $3,      $4,       $5) 
     RETURNING *`,
      inRow.id,
      inRow.type,
      inRow.resource,
      inRow.created,
      inRow.modified
    ])
  })
})
