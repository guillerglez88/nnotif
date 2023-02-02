/**
 * @group unit
 * @group sql
 * @group dml
 */

import { inRow } from "../fixture"
import * as sut from "../../src/data/dml"
import { type Ref } from "fundation"

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
      inRow.modified,
    ])
  })

  it("Can build update-row DML", () => {
    const dml = sut.updateDML(inRow)

    expect(dml).toEqual([
      `UPDATE Resource 
     SET resource = $1, 
         modified = $2, 
         etag = nextval('etag')
         WHERE id=$3 
     RETURNING *`,
      inRow.resource,
      inRow.modified,
      inRow.id,
    ])
  })

  it("Can build delete-row DML", () => {
    const ref: Ref = { type: "Resource", id: "1"}

    const dml = sut.deleteDML(ref)

    expect(dml).toEqual([
      `DELETE FROM public.Resource 
    WHERE id=$1`,
      ref.id,
    ])
  })
})
