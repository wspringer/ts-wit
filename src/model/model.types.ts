/**
 * A utility type used for resolving extra metadata associated to WIT types.
 * Used to create data structures that are similar but extended in depth at
 * various stages of the parsing process. (This prevents use from having to
 * repeat the same structures over and over again.)
 */
type MetaOf<M, T extends string> = M extends {
  [K in T]: infer U;
}
  ? U
  : {};

export type Package<M> = {
  packages: NestedPackage<M>[];
} & InterfaceContainer<M>;

export type QualifiedPackage<M> = {
  name: string;
  version: string;
};

export type AnonymousPackage<M> = {
  name?: undefined;
  version?: undefined;
};

export type RootPackage<M> = Package<M> &
  (QualifiedPackage<M> | AnonymousPackage<M>) & {
    packages: NestedPackage<M>[];
  };

export type NestedPackage<M> = Package<M> & {
  name: string;
};

export type Wit<M = {}> = RootPackage<M> &
  WorldContainer<M> & {
    uses: Use<M>[];
  };

export type Use<M> = {
  path: string;
  alias?: string;
};

export type WorldContainer<M> = {
  worlds: World<M>[];
};

export type InterfaceContainer<M> = {
  interfaces: Interface<M>[];
};

export type World<M> = {
  name: string;
  exports: {
    functions: Func<M>[];
    interfaces: (Interface<M> | InterfaceRef<M>)[];
  };
  imports: {
    functions: Func<M>[];
    interfaces: (Interface<M> | InterfaceRef<M>)[];
  };
};

export type Func<M> = {
  name: string;
  params: Param<M>[];
  result?: Ty<M>;
};

export type Param<M> = {
  name: string;
  type: Ty<M>;
};

export type Interface<M> = {
  name: string;
  functions: Func<M>[];
  typeDefs: TypeDef<M>[];
} & MetaOf<M, "Interface">;

export type InterfaceRef<M> = {
  name: string;
} & MetaOf<M, "InterfaceRef">;

export type TypeDef<M> = (
  | AliasDef<M>
  | EnumDef<M>
  | VariantDef<M>
  | RecordDef<M>
) &
  MetaOf<M, "TypeDef">;

export type TupleType<M> = {
  items: Ty<M>[];
};

export type SimpleType<M> =
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

export type RecordDef<M> = {
  kind: "record";
  name: string;
  fields: RecordField<M>[];
};

export type RecordField<M> = {
  name: string;
  type: Ty<M>;
};

export type EnumDef<M> = {
  kind: "enum";
  name: string;
  cases: string[];
};

export type OptionType<M> = {
  kind: "option";
  type: Ty<M>;
};

export type ListType<M> = {
  kind: "list";
  type: Ty<M>;
};

export type ResultType<M> = {
  kind: "result";
  ok?: Ty<M>;
  error?: Ty<M>;
};

export type VariantDef<M> = {
  kind: "variant";
  name: string;
  cases: VariantCase<M>[];
};

export type VariantCase<M> = {
  name: string;
  type?: Ty<M>;
};

export type AliasDef<M> = {
  kind: "alias";
  name: string;
  type: Ty<M>;
};

export type Ty<M> =
  | TypeRef<M>
  | SimpleType<M>
  | OptionType<M>
  | ListType<M>
  | ResultType<M>
  | TupleType<M>;

export type TypeRef<M> = {
  name: string;
} & MetaOf<M, "TypeRef">;

export type Qualified = {
  fqn: string;
};

export type Resolved<T> = {
  resolved: T | null;
};

/**
 * A qualified Wit is a Wit with all the types and interfaces qualified with
 * their FQN. (e.g. `other:foo/bar`)
 */
export type QualifiedWit = Wit<{
  TypeRef: Qualified;
  TypeDef: Qualified;
  Interface: Qualified;
  InterfaceRef: Qualified;
}>;

/**
 * A resolved Wit is a Wit with all the types and interfaces resolved to their
 * actual type definitions.
 */
export type ResolvedWit = Wit<{
  TypeRef: Resolved<TypeDef<ResolvedWit>>;
  InterfaceRef: Resolved<Interface<ResolvedWit>>;
}>;

export const test: Wit = {
  name: "foo",
  version: "0.0.1",
  packages: [],
  interfaces: [
    {
      name: "foo",
      functions: [],
      typeDefs: [
        {
          kind: "record",
          name: "bar",
          fields: [
            {
              name: "message",
              type: "string",
            },
          ],
        },
      ],
    },
  ],
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
