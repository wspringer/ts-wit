import { NonterminalNode } from "ohm-js";

export interface Type {
  name: string;
  location: {
    start: number;
    end: number;
  };
}

export interface EnumType extends Type {
  kind: "enum";
  cases: string[];
}

export interface RecordType extends Type {
  kind: "record";
  fields: {
    name: string;
    type: TypeRef;
  }[];
}

export interface VariantType extends Type {
  kind: "variant";
  cases: {
    name: string;
    type?: TypeRef;
  }[];
}

export interface FlagsType extends Type {
  kind: "flags";
  flags: string[];
}

export interface TypeAlias extends Type {
  kind: "type";
  type: TypeRef;
}

export type TypeRef =
  | SimpleType
  | ResultType
  | TupleType
  | OptionType
  | ListType
  | RefType;

export interface SimpleType {
  kind: "simple";
  name: string;
}

export interface ResultType {
  kind: "result";
  ok?: TypeRef;
  error?: TypeRef;
}

export interface TupleType {
  kind: "tuple";
  types: TypeRef[];
}

export interface OptionType {
  kind: "option";
  type: TypeRef;
}

export interface ListType {
  kind: "list";
  type: TypeRef;
}

export interface RefType {
  kind: "ref";
  name: string; // The fully qualified name of the referenced type (e.g., "test.point")
}

export type WITType =
  | EnumType
  | RecordType
  | VariantType
  | FlagsType
  | TypeAlias;
