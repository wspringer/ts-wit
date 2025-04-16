import { grammar } from "./grammar";
import { defineModel } from "./semantics";
import { Wit } from "./ast";

export function parseWit(input: string): Wit {
  const semantics = grammar.createSemantics();
  defineModel(semantics);
  const match = grammar.match(input);
  if (match.failed()) {
    throw new Error(match.message);
  }
  return semantics(match).toModel();
}
