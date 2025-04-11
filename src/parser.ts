import { grammar } from "./grammar";
import { createSemantics } from "./ast";
import { File } from "./ast.types";

/**
 * Parses a WIT (WebAssembly Interface Types) input string and returns the AST.
 * @param input The WIT input string to parse
 * @returns The parsed AST as a File node
 * @throws Error if parsing fails
 */
export function parseWit(input: string): File {
  // Create a new semantics instance
  const semantics = createSemantics();

  // Parse the input
  const match = grammar.match(input);
  if (match.failed()) {
    throw new Error(`Failed to parse WIT: ${match.message}`);
  }

  // Build and return the AST
  return semantics(match).resolve() as File;
}
