<!--
  -- This file is auto-generated from README.js.md. Changes should be made there.
  -->

# README

This is a WIT parser built in TypeScript directly. It was built largely on the
specification found
[here](https://github.com/WebAssembly/component-model/blob/main/design/mvp/WIT.md).

It's very much work in progress, and there's a fair chance I will never finish
it at all. If you're looking for a serious serious WIT parser, then you should
probably take a look at the wit-parser crate. This parser is far from complete.

## How to use it

You import the `parseWit` function.

```javascript
import { parseWit } from "ts-wit";
```

You call `parseWit` on the WIT file.ß

```javascript
const wit = `
package local:crypto;

interface algorithm {
  type encrypted = string;
  enum error {
    unknown,
    invalid-input,
    expired,
  }
  encrypt: func(in: string) -> result<encrypted, error>;
  decrypt: func(in: encrypted) -> result<string, error>;
}

world simple-encryption {
  export algorithm;
}`;
```

You will get a TypeScript representaton of the structure defined by the WIT
file.

```javascript
parseWit(wit); // ⇨
// {
//   name: 'local:crypto',
//   uses: [],
//   packages: [],
//   interfaces: [
//     {
//       name: 'algorithm',
//       functions: [
//         {
//           name: 'encrypt',
//           params: [ { name: 'in', type: 'string' } ],
//           result: { kind: 'result', ok: 'encrypted', error: 'error' }
//         },
//         {
//           name: 'decrypt',
//           params: [ { name: 'in', type: 'encrypted' } ],
//           result: { kind: 'result', ok: 'string', error: 'error' }
//         }
//       ],
//       typeDefs: [
//         { kind: 'alias', name: 'encrypted', type: 'string' },
//         { kind: 'enum', name: 'error', cases: [ 'unknown', 'invalid-input', 'expired' ] }
//       ]
//     }
//   ],
//   worlds: [
//     {
//       name: 'simple-encryption',
//       exports: { functions: [], interfaces: [ { ref: 'algorithm' } ] },
//       imports: { functions: [], interfaces: [] },
//       includes: [],
//       typeDefs: []
//     }
//   ]
// }
```

<!-- TSDOC_START -->


## Types

- [MetaOf](#metaof)
- [Package](#package)
- [RootPackage](#rootpackage)
- [NestedPackage](#nestedpackage)
- [Wit](#wit)
- [Use](#use)
- [WorldContainer](#worldcontainer)
- [InterfaceContainer](#interfacecontainer)
- [World](#world)
- [Include](#include)
- [Func](#func)
- [Param](#param)
- [InterfaceDef](#interfacedef)
- [InterfaceRef](#interfaceref)
- [TypeDef](#typedef)
- [ResourceDef](#resourcedef)
- [TupleType](#tupletype)
- [SimpleType](#simpletype)
- [RecordDef](#recorddef)
- [RecordField](#recordfield)
- [EnumDef](#enumdef)
- [FlagsDef](#flagsdef)
- [OptionType](#optiontype)
- [ListType](#listtype)
- [ResultType](#resulttype)
- [VariantDef](#variantdef)
- [VariantCase](#variantcase)
- [AliasDef](#aliasdef)
- [Ty](#ty)
- [TypeRef](#typeref)
- [Gated](#gated)
- [Resolved](#resolved)
- [ResolvedWit](#resolvedwit)

### MetaOf

A utility type used for resolving extra metadata associated to WIT types.
Used to create data structures that are similar but extended in depth at
various stages of the parsing process. (This prevents use from having to
repeat the same structures over and over again.)

| Type | Type |
| ---------- | ---------- |
| `MetaOf` | `M extends { [K in T]: infer U; } ? U : {}` |

### Package

| Type | Type |
| ---------- | ---------- |
| `Package` | `{ packages: NestedPackage<M>[]; } and InterfaceContainer<M>` |

### RootPackage

| Type | Type |
| ---------- | ---------- |
| `RootPackage` | `Package<M> and { name?: string; packages: NestedPackage<M>[]; }` |

### NestedPackage

| Type | Type |
| ---------- | ---------- |
| `NestedPackage` | `{ name: string; } and InterfaceContainer<M> and MetaOf<M, "NestedPackage">` |

### Wit

| Type | Type |
| ---------- | ---------- |
| `Wit` | `RootPackage<M> and WorldContainer<M> and { uses: Use<M>[]; }` |

### Use

| Type | Type |
| ---------- | ---------- |
| `Use` | `{ path: string; alias?: string; } and MetaOf<M, "Use">` |

### WorldContainer

| Type | Type |
| ---------- | ---------- |
| `WorldContainer` | `{ worlds: World<M>[]; }` |

### InterfaceContainer

| Type | Type |
| ---------- | ---------- |
| `InterfaceContainer` | `{ interfaces: InterfaceDef<M>[]; }` |

### World

| Type | Type |
| ---------- | ---------- |
| `World` | `{ name: string; exports: { functions: Func<M>[]; interfaces: (InterfaceDef<M> or InterfaceRef<M>)[]; }; imports: { functions: Func<M>[]; interfaces: (InterfaceDef<M> or InterfaceRef<M>)[]; }; includes: Include<M>[]; typeDefs: TypeDef<M>[]; } and Gated and MetaOf<M, "World">` |

### Include

| Type | Type |
| ---------- | ---------- |
| `Include` | `{ path: string; aliases?: { [key: string]: string; }; } and MetaOf<M, "Include">` |

### Func

| Type | Type |
| ---------- | ---------- |
| `Func` | `{ name: string; params: Param<M>[]; result?: Ty<M>; } and MetaOf<M, "Func">` |

### Param

| Type | Type |
| ---------- | ---------- |
| `Param` | `{ name: string; type: Ty<M>; }` |

### InterfaceDef

| Type | Type |
| ---------- | ---------- |
| `InterfaceDef` | `{ name: string; functions: Func<M>[]; typeDefs: TypeDef<M>[]; } and Gated and MetaOf<M, "InterfaceDef">` |

### InterfaceRef

| Type | Type |
| ---------- | ---------- |
| `InterfaceRef` | `{ ref: string; } and MetaOf<M, "InterfaceRef">` |

### TypeDef

| Type | Type |
| ---------- | ---------- |
| `TypeDef` | `( or AliasDef<M> or EnumDef<M> or VariantDef<M> or RecordDef<M> or FlagsDef<M> or ResourceDef<M> ) and MetaOf<M, "TypeDef">` |

### ResourceDef

| Type | Type |
| ---------- | ---------- |
| `ResourceDef` | `{ kind: "resource"; name: string; methods: Func<M>[]; staticMethods: Func<M>[]; constructor?: { params: Param<M>[] }; } and MetaOf<M, "ResourceDef">` |

### TupleType

| Type | Type |
| ---------- | ---------- |
| `TupleType` | `{ kind: "tuple"; items: Ty<M>[]; } and MetaOf<M, "TupleType">` |

### SimpleType

| Type | Type |
| ---------- | ---------- |
| `SimpleType` | `| "s8" or "s16" or "s32" or "s64" or "u8" or "u16" or "u32" or "u64" or "f32" or "f64" or "bool" or "string" or "char` |

### RecordDef

| Type | Type |
| ---------- | ---------- |
| `RecordDef` | `{ kind: "record"; name: string; fields: RecordField<M>[]; } and MetaOf<M, "RecordDef">` |

### RecordField

| Type | Type |
| ---------- | ---------- |
| `RecordField` | `{ name: string; type: Ty<M>; } and MetaOf<M, "RecordField">` |

### EnumDef

| Type | Type |
| ---------- | ---------- |
| `EnumDef` | `{ kind: "enum"; name: string; cases: string[]; } and MetaOf<M, "EnumDef">` |

### FlagsDef

| Type | Type |
| ---------- | ---------- |
| `FlagsDef` | `{ kind: "flags"; name: string; fields: string[]; } and MetaOf<M, "FlagsDef">` |

### OptionType

| Type | Type |
| ---------- | ---------- |
| `OptionType` | `{ kind: "option"; type: Ty<M>; }` |

### ListType

| Type | Type |
| ---------- | ---------- |
| `ListType` | `{ kind: "list"; type: Ty<M>; }` |

### ResultType

| Type | Type |
| ---------- | ---------- |
| `ResultType` | `{ kind: "result"; ok?: Ty<M>; error?: Ty<M>; }` |

### VariantDef

| Type | Type |
| ---------- | ---------- |
| `VariantDef` | `{ kind: "variant"; name: string; cases: VariantCase<M>[]; } and MetaOf<M, "VariantDef">` |

### VariantCase

| Type | Type |
| ---------- | ---------- |
| `VariantCase` | `{ name: string; type?: Ty<M>; } and MetaOf<M, "VariantCase">` |

### AliasDef

| Type | Type |
| ---------- | ---------- |
| `AliasDef` | `{ kind: "alias"; name: string; type: Ty<M>; } and MetaOf<M, "AliasDef">` |

### Ty

| Type | Type |
| ---------- | ---------- |
| `Ty` | `| TypeRef<M> or SimpleType or OptionType<M> or ListType<M> or ResultType<M> or TupleType<M>` |

### TypeRef

| Type | Type |
| ---------- | ---------- |
| `TypeRef` | `{ ref: string; } and MetaOf<M, "TypeRef">` |

### Gated

| Type | Type |
| ---------- | ---------- |
| `Gated` | `{ since?: string; until?: string; // aka deprecated unstable?: string; }` |

### Resolved

| Type | Type |
| ---------- | ---------- |
| `Resolved` | `{ resolved: T or null; }` |

### ResolvedWit

A resolved Wit is a Wit with all the types and interfaces resolved to their
actual type definitions.

| Type | Type |
| ---------- | ---------- |
| `ResolvedWit` | `Wit<{ TypeRef: Resolved<TypeDef<ResolvedWit>>; InterfaceRef: Resolved<InterfaceDef<ResolvedWit>>; }>` |


<!-- TSDOC_END -->
