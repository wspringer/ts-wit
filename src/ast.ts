/**
 * A utility type used for resolving extra metadata associated to WIT types.
 * Used to create data structures that are similar but extended in depth at
 * various stages of the parsing process. (This prevents use from having to
 * repeat the same structures over and over again.)
 */
export type MetaOf<M, T extends string> = M extends {
  [K in T]: infer U;
}
  ? U
  : {};

export type Package<M = {}> = {
  packages: NestedPackage<M>[];
} & InterfaceContainer<M>;

export type RootPackage<M> = Package<M> & {
  name?: string;
  packages: NestedPackage<M>[];
};

export type NestedPackage<M = {}> = {
  name: string;
} & InterfaceContainer<M> &
  MetaOf<M, "NestedPackage">;

export type Wit<M = {}> = RootPackage<M> &
  WorldContainer<M> & {
    uses: Use<M>[];
  };

export type Use<M = {}> = {
  path: string;
  alias?: string;
} & MetaOf<M, "Use">;

export type WorldContainer<M> = {
  worlds: World<M>[];
};

export type InterfaceContainer<M> = {
  interfaces: InterfaceDef<M>[];
};

export type World<M = {}> = {
  name: string;
  exports: {
    functions: Func<M>[];
    interfaces: (InterfaceDef<M> | InterfaceRef<M>)[];
  };
  imports: {
    functions: Func<M>[];
    interfaces: (InterfaceDef<M> | InterfaceRef<M>)[];
  };
  includes: Include<M>[];
  typeDefs: TypeDef<M>[];
} & Gated &
  MetaOf<M, "World">;

export type Include<M = {}> = {
  path: string;
  aliases?: {
    [key: string]: string;
  };
} & MetaOf<M, "Include">;

export type Func<M = {}> = {
  name: string;
  params: Param<M>[];
  result?: Ty<M>;
} & MetaOf<M, "Func">;

export type Param<M = {}> = {
  name: string;
  type: Ty<M>;
};

export type InterfaceDef<M = {}> = {
  name: string;
  functions: Func<M>[];
  typeDefs: TypeDef<M>[];
} & Gated &
  MetaOf<M, "InterfaceDef">;

export type InterfaceRef<M = {}> = {
  ref: string;
} & MetaOf<M, "InterfaceRef">;

export type TypeDef<M = {}> = (
  | AliasDef<M>
  | EnumDef<M>
  | VariantDef<M>
  | RecordDef<M>
  | FlagsDef<M>
  | ResourceDef<M>
) &
  MetaOf<M, "TypeDef">;

export type ResourceDef<M = {}> = {
  kind: "resource";
  name: string;
  methods: Func<M>[];
  staticMethods: Func<M>[];
  constructor?: { params: Param<M>[] };
} & MetaOf<M, "ResourceDef">;

export type TupleType<M = {}> = {
  kind: "tuple";
  items: Ty<M>[];
} & MetaOf<M, "TupleType">;

export type SimpleType =
  | "s8"
  | "s16"
  | "s32"
  | "s64"
  | "u8"
  | "u16"
  | "u32"
  | "u64"
  | "f32"
  | "f64"
  | "bool"
  | "string"
  | "char";

export type RecordDef<M = {}> = {
  kind: "record";
  name: string;
  fields: RecordField<M>[];
} & MetaOf<M, "RecordDef">;

export type RecordField<M = {}> = {
  name: string;
  type: Ty<M>;
} & MetaOf<M, "RecordField">;

export type EnumDef<M = {}> = {
  kind: "enum";
  name: string;
  cases: string[];
} & MetaOf<M, "EnumDef">;

export type FlagsDef<M = {}> = {
  kind: "flags";
  name: string;
  fields: string[];
} & MetaOf<M, "FlagsDef">;

export type OptionType<M = {}> = {
  kind: "option";
  type: Ty<M>;
};

export type ListType<M = {}> = {
  kind: "list";
  type: Ty<M>;
};

export type ResultType<M = {}> = {
  kind: "result";
  ok?: Ty<M>;
  error?: Ty<M>;
};

export type VariantDef<M = {}> = {
  kind: "variant";
  name: string;
  cases: VariantCase<M>[];
} & MetaOf<M, "VariantDef">;

export type VariantCase<M = {}> = {
  name: string;
  type?: Ty<M>;
} & MetaOf<M, "VariantCase">;

export type AliasDef<M = {}> = {
  kind: "alias";
  name: string;
  type: Ty<M>;
} & MetaOf<M, "AliasDef">;

export type Ty<M = {}> =
  | TypeRef<M>
  | SimpleType
  | OptionType<M>
  | ListType<M>
  | ResultType<M>
  | TupleType<M>;

export type TypeRef<M> = {
  ref: string;
} & MetaOf<M, "TypeRef">;

export type Gated = {
  since?: string;
  until?: string; // aka deprecated
  unstable?: string;
};

export type Resolved<T> = {
  resolved: T | null;
};

/**
 * A resolved Wit is a Wit with all the types and interfaces resolved to their
 * actual type definitions.
 */
export type ResolvedWit = Wit<{
  TypeRef: Resolved<TypeDef<ResolvedWit>>;
  InterfaceRef: Resolved<InterfaceDef<ResolvedWit>>;
}>;
