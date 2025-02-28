import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as fs from "fs"
import * as jsonc from "../src/jsonc"

test("stripComments", function () {
  const give = `
// comment 1
{
  "a": 1, // comment 2
  "url": "https://acme.com",  // contains // inside a string
}`
  const want = `{
  "a": 1,
  "url": "https://acme.com",
}`
  const have = jsonc.stripComments(give)
  assert.equal(have, want)
})

test("parse", function () {
  const give = `
// comment 1
{
  "a": 1 // comment 2
}`
  const want = { a: 1 }
  const have = jsonc.parse(give)
  assert.deepEqual(have, want)
})

test("loadSync", function () {
  const give = `
// comment 1
{
  "a": 1 // comment 2
}`
  fs.writeFileSync("foo.jsonc", give)
  const want = { a: 1 }
  const have = jsonc.loadSync("foo.jsonc")
  fs.unlinkSync("foo.jsonc")
  assert.deepEqual(have, want)
})
