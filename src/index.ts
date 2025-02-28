import { promises as fs } from "fs"

/// converts the given JSONC text to valid JSON by stripping all comments
export function stripComments(text: string): string {
  let result = ""
  let in_string = false
  for (const line of text.split("\n")) {
    let last_char = null
    for (const cur_char of line) {
      if (last_char !== "\\" && cur_char === '"') {
        in_string = !in_string
      }
      if (!in_string && last_char === "/" && cur_char === "/") {
        // found the beginning of a line comment
        last_char = null
        break
      }
      if (last_char != null) {
        result = result + last_char
      }
      last_char = cur_char
    }
    if (last_char != null) {
      result = result + last_char
    }
    result = result.trim() + "\n"
  }
  return result.substring(0, result.length - 1)
}

/// parses the given JSONC text into a JS object
export function parse(text: string): any {
  return JSON.parse(stripComments(text))
}

/// reads a JS object from the file with the given name
export async function load(filePath: string): Promise<string> {
  return parse(await fs.readFile(filePath, "utf-8"))
}
