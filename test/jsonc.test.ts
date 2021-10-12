import assert from "assert"
import * as jsonc from  "../src/jsonc"
import * as fs from "fs"

describe("stripComments", function() {
  it("provides a valid JSON string", function() {
    const give = `
// comment 1
{
  "a": 1 // comment 2
}`
    const want = `
{
  "a": 1
}`
    const have = jsonc.stripComments(give)
    assert.equal(have, want)
  })
})

describe("parse", function() {
  it("provides the parsed value", function() {
    const give = `
// comment 1
{
  "a": 1 // comment 2
}`
    const want = { "a": 1 }
    const have = jsonc.parse(give)
    assert.deepEqual(have, want)
  })
})

describe("loadSync", function() {
  it("provides the parsed value of the content in the given file", function() {
    const give = `
// comment 1
{
  "a": 1 // comment 2
}`
    fs.writeFileSync("foo.jsonc", give)
    const want = { "a": 1 }
    const have = jsonc.loadSync("foo.jsonc")
    assert.deepEqual(have, want)
  })
})
