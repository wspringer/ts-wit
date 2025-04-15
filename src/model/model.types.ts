export type Package = {
  packages: NestedPackage[];
} & InterfaceContainer;

export type QualifiedPackage = {
  name: string;
  version: string;
};

export type AnonymousPackage = {
  name?: undefined;
  version?: undefined;
};

export type RootPackage = Package &
  (QualifiedPackage | AnonymousPackage) & {
    packages: NestedPackage[];
  };

export type NestedPackage = Package & {
  name: string;
};

export type Wit = RootPackage &
  WorldContainer & {
    uses: Use[];
  };

export type Use = {
  path: string;
  alias?: string;
};

export type WorldContainer = {
  worlds: World[];
};

export type InterfaceContainer = {
  interfaces: Interface[];
};

export type World = {
  name: string;
  exports: {
    functions: Func[];
    interfaces: (Interface | InterfaceRef)[];
  };
  imports: {
    functions: Func[];
    interfaces: (Interface | InterfaceRef)[];
  };
};

export type Func = {
  name: string;
  params: Param[];
  result?: Type;
};

export type Param = {
  name: string;
  type: Type;
};

export type Interface = {
  name: string;
  functions: Func[];
  typeDefs: TypeDef[];
};

export type InterfaceRef = {
  name: string;
};

export type TypeDef = AliasDef | EnumDef | VariantDef | RecordDef;

export type TupleType = {
  items: Type[];
};

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

export type RecordDef = {
  name: string;
  fields: RecordField[];
};

export type RecordField = {
  name: string;
  type: Type;
};

export type EnumDef = {
  name: string;
  cases: string[];
};

export type OptionType = {
  kind: "option";
  type: Type;
};

export type ListType = {
  kind: "list";
  type: Type;
};

export type ResultType = {
  kind: "result";
  ok?: Type;
  error?: Type;
};

export type VariantDef = {
  name: string;
  cases: VariantCase[];
};

export type VariantCase = {
  name: string;
  type?: Type;
};

export type AliasDef = {
  name: string;
  type: Type;
};

export type Type =
  | TypeRef
  | SimpleType
  | OptionType
  | ListType
  | ResultType
  | TupleType;

export type TypeRef = {
  name: string;
};

export const test: Wit = {
  name: "foo",
  version: "0.0.1",
  packages: [],
  interfaces: [],
  uses: [
    {
      path: "other:math/operations.add",
      alias: "add",
    },
  ],
  worlds: [
    {
      name: "foo",
      exports: {
        functions: [
          {
            name: "bar",
            params: [
              {
                name: "message",
                type: {
                  kind: "option",
                  type: "string",
                },
              },
            ],
            result: {
              kind: "result",
              ok: "string",
              error: "string",
            },
          },
        ],
        interfaces: [],
      },
      imports: {
        functions: [],
        interfaces: [],
      },
    },
  ],
};
