# JSONC reader for TypeScript

![test status](https://github.com/kevgo/jsonc-reader-ts/actions/workflows/tests.yml/badge.svg)
[![Code Coverage](https://coveralls.io/repos/github/kevgo/jsonc-reader-ts/badge.svg?branch=main)](https://coveralls.io/github/kevgo/jsonc-reader-ts?branch=main)
[![0 dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg)](https://github.com/kevgo/node-text-stream-search/blob/main/package.json)
[![install size](https://packagephobia.now.sh/badge?p=jsonc-reader)](https://packagephobia.now.sh/result?p=jsonc-reader)

This micro-library (no dependencies) allows reading JSON that contain comments
(JSONC). It does that by overwriting comments with whitespace (so that line and
column numbers remain the same) and then loading the data as normal JSON.

```ts
import * as jsonc from "jsonc-reader"

// load JSONC from a file
const config = await jsonc.load("../my-config.jsonc")

// parse a JSONC string
const jsoncText = `
{
  // a comment
  "one": 1  // another comment
}`
const config = jsonc.parse(jsoncText)
// config === { one: 1 }

// strip comments from a JSONC string
const jsonText = jsonc.strip(jsoncText)
// jsonText === `
// {
//
//   "one": 1
// }`
```
