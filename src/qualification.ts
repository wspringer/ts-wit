import { Wit } from "./ast";

export type Qualified = {
  fqn: string;
};

/**
 * A qualified Wit is a Wit with all the types and interfaces qualified with
 * their FQN. (e.g. `other:foo/bar`)
 */
export type QualifiedWit = Wit<{
  TypeDef: Qualified;
  InterfaceDef: Qualified;
}>;
