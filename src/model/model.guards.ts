import {
  TypeDef,
  AliasDef,
  EnumDef,
  VariantDef,
  RecordDef,
  Ty,
  TypeRef,
  SimpleType,
  OptionType,
  ListType,
  ResultType,
  TupleType,
} from "./model.types";

export function isAliasDef<M>(typeDef: TypeDef<M>): typeDef is AliasDef<M> {
  return typeDef.kind === "alias";
}

export function isEnumDef<M>(typeDef: TypeDef<M>): typeDef is EnumDef<M> {
  return typeDef.kind === "enum";
}

export function isVariantDef<M>(typeDef: TypeDef<M>): typeDef is VariantDef<M> {
  return typeDef.kind === "variant";
}

export function isRecordDef<M>(typeDef: TypeDef<M>): typeDef is RecordDef<M> {
  return typeDef.kind === "record";
}

export function isTypeRef<M>(ty: Ty<M>): ty is TypeRef<M> {
  return typeof ty === "object" && "name" in ty && !("kind" in ty);
}

export function isSimpleType<M>(ty: Ty<M>): ty is SimpleType {
  return (
    typeof ty === "string" &&
    [
      "s8",
      "s16",
      "s32",
      "s64",
      "u8",
      "u16",
      "u32",
      "u64",
      "f32",
      "f64",
      "bool",
      "string",
      "char",
    ].includes(ty)
  );
}

export function isOptionType<M>(ty: Ty<M>): ty is OptionType<M> {
  return typeof ty === "object" && "kind" in ty && ty.kind === "option";
}

export function isListType<M>(ty: Ty<M>): ty is ListType<M> {
  return typeof ty === "object" && "kind" in ty && ty.kind === "list";
}

export function isResultType<M>(ty: Ty<M>): ty is ResultType<M> {
  return typeof ty === "object" && "kind" in ty && ty.kind === "result";
}

export function isTupleType<M>(ty: Ty<M>): ty is TupleType<M> {
  return typeof ty === "object" && "items" in ty && ty.kind === "tuple";
}
