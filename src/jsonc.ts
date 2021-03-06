import fs from "fs"

/// converts the given JSONC text to valid JSON by stripping all comments
export function stripComments(text: string): string {
  let result = ""
  let in_string = false
  for (const line of text.split("\n")) {
    let last_char = null
    for (const cur_char of line) {
      if (last_char !== "\\" && cur_char === "\"") {
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
    // the loop above doesn't add the last character of the line to the result,
    // let's do that here
    if (last_char != null) {
      result = result + last_char
    }
    result = result.trim()
    result = result + "\n"
  }
  return result.substr(0, result.length - 1)
}

/// parses the given JSONC text into a JS object
export function parse(text: string): any {
  return JSON.parse(stripComments(text))
}

/// reads a JS object from the file with the given name
export function loadSync(filePath: string): string {
  return parse(fs.readFileSync(filePath, "utf-8"))
}
