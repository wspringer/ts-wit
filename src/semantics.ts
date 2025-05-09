import { WitSemantics } from "./grammar.ohm-bundle";
import {
  AliasDef,
  EnumDef,
  FlagsDef,
  Func,
  Gated,
  Include,
  InterfaceDef,
  InterfaceRef,
  ListType,
  NestedPackage,
  OptionType,
  Package,
  Param,
  RecordDef,
  RecordField,
  ResourceDef,
  ResultType,
  SimpleType,
  TupleType,
  Ty,
  TypeDef,
  Use,
  VariantCase,
  VariantDef,
  Wit,
  World,
} from "./ast";

type Item<K, T> = {
  kind: K;
  boxed: T;
};

export function defineModel(semantics: WitSemantics) {
  semantics.addOperation<any>("toModel", {
    File(packageDecl, semicolon, packageItems): Wit {
      const items: Item<any, any>[] = packageItems.children.map((child) =>
        child.toModel()
      );
      const worlds: World[] = items
        .filter((item) => item.kind === "world")
        .map((item) => item.boxed);
      const interfaces: InterfaceDef[] = items
        .filter((item) => item.kind === "interface")
        .map((item) => item.boxed);
      const packages: NestedPackage[] = items
        .filter((item) => item.kind === "package")
        .map((item) => item.boxed);
      const uses: Use[] = items
        .filter((item) => item.kind === "use")
        .map((item) => item.boxed);

      return {
        name: packageDecl.children[0]?.toModel(),
        uses,
        packages,
        interfaces,
        worlds,
      };
    },

    ToplevelUseItem(use, usePath, as, ident, semicolon): Item<"use", Use> {
      return {
        kind: "use",
        boxed: {
          path: usePath.sourceString,
          alias: ident.children[0]?.toModel(),
        },
      };
    },

    PackageDecl(package_, name): string {
      return name.sourceString;
    },

    Gate(gateItems): Gated {
      const items: Gated[] = gateItems.children.map((child) => child.toModel());
      return items.reduce(
        (acc, item) => ({
          ...acc,
          ...item,
        }),
        {}
      );
    },

    GateItem(gateItem): Gated {
      return gateItem.toModel();
    },

    UnstableGate(unatable, lparen, feature, rparen): Gated {
      return {
        unstable: feature.toModel(),
      };
    },

    FeatureField(feature, eq, ident): string {
      return ident.sourceString;
    },

    SinceGate(since, lparen, version, rparen): Gated {
      return {
        since: version.toModel(),
      };
    },

    DeprecatedGate(deprecated, lparen, version, rparen): Gated {
      return {
        until: version.toModel(),
      };
    },

    VersionField(version, eq, ident): string {
      return ident.sourceString;
    },

    WorldItem(
      gate,
      world,
      ident,
      openBrace,
      worldItems,
      closeBrace
    ): Item<"world", World> {
      const items = worldItems.children.map((child) => child.toModel());
      const exportedFunctions: Func[] = items
        .filter((item) => item.kind === "export-func")
        .map((item) => item.boxed);
      const exportedInterfaces: (InterfaceDef|InterfaceRef)[] = items
        .filter((item) => item.kind === "export-interface")
        .map((item) => item.boxed);
      const importedFunctions: Func[] = items
        .filter((item) => item.kind === "import-func")
        .map((item) => item.boxed);
      const importedInterfaces: (InterfaceDef|InterfaceRef)[] = items
        .filter((item) => item.kind === "import-interface")
        .map((item) => item.boxed);
      const includes: Include[] = items
        .filter((item) => item.kind === "include")
        .map((item) => item.boxed);
      const typeDefs: TypeDef[] = items
        .filter((item) => item.kind === "typeDef")
        .map((item) => item.boxed);
        return {
        kind: "world",
        boxed: {
          name: ident.sourceString,
          ...gate.toModel(),
          exports: {
            functions: exportedFunctions,
            interfaces: exportedInterfaces,
          },
          imports: {
            functions: importedFunctions,
            interfaces: importedInterfaces,
          },
          includes,
          typeDefs,
        },
      };
    },

    WorldItems(
      gate,
      worldDefinition
    ):
      | Item<"export-func", Func>
      | Item<"export-interface", InterfaceDef>
      | Item<"import-func", Func>
      | Item<"import-interface", InterfaceDef> {
      return worldDefinition.toModel();
    },

    IncludeItem_simple(incude, usePath, semicolon): Item<"include", Include> {
      return {
        kind: "include",
        boxed: {
          path: usePath.sourceString,
        },
      };
    },

    IncludeItem_aliased(
      include,
      usePath,
      with_,
      openBrace,
      includeNames,
      closeBrace
    ): Item<"include", Include> {
      const aliases: [string, string][] = includeNames
        .asIteration()
        .children.map((child) => child.toModel());
      return {
        kind: "include",
        boxed: {
          path: usePath.sourceString,
          aliases: Object.fromEntries(aliases),
        },
      };
    },

    IncludeNamesItem(ident, as, alias): [string, string] {
      return [ident.sourceString, alias.sourceString];
    },

    ImportItem(
      importItem
    ): Item<"import-func", Func> | Item<"import-interface", InterfaceDef> {
      return importItem.toModel();
    },

    ExportItem(
      exportItem
    ): Item<"export-func", Func> | Item<"export-interface", InterfaceDef> {
      return exportItem.toModel();
    },

    ImportItemExternType(
      export_,
      ident,
      colon,
      externType
    ): Item<"import-func", Func> | Item<"import-interface", InterfaceDef> {
      const name = ident.sourceString;
      const type = externType.toModel();
      switch (type.kind) {
        case "func":
          return {
            kind: "import-func",
            boxed: {
              name,
              ...type.boxed,
            },
          };
        case "interface":
          return {
            kind: "import-interface",
            boxed: {
              name,
              ...type.boxed,
            },
          };
      }
      throw new Error(`Unknown extern type: ${type.kind}`);
    },

    ExportItemUsePath(export_, usePath, semicolon): Item<"export-interface", InterfaceRef> {
      return {
        kind: "export-interface",
        boxed: {
          ref: usePath.sourceString,
        },
      };
    },

    ExportItemExternType(
      export_,
      ident,
      colon,
      externType
    ): Item<"export-func", Func> | Item<"export-interface", InterfaceDef> {
      const name = ident.sourceString;
      const type = externType.toModel();
      switch (type.kind) {
        case "func":
          return {
            kind: "export-func",
            boxed: {
              name,
              ...type.boxed,
            },
          };
        case "interface":
          return {
            kind: "export-interface",
            boxed: {
              name,
              ...type.boxed,
            },
          };
      }
      throw new Error(`Unknown extern type: ${type.kind}`);
    },

    ExternType(
      externType
    ):
      | Item<"func", Omit<Func, "name">>
      | Item<"interface", Omit<InterfaceDef, "name">> {
      return externType.toModel();
    },

    ExternTypeFunc(funcType, semicolon): Item<"func", Omit<Func, "name">> {
      return {
        kind: "func",
        boxed: {
          ...funcType.toModel(),
        },
      };
    },

    ExternTypeInterface(
      interface_,
      lbrace,
      interfaceItems,
      rbrace
    ): Item<"interface", Omit<InterfaceDef, "name">> {
      const items = interfaceItems.children.map((child) => child.toModel());
      const functions: Func[] = items
        .filter((item) => item.kind === "func")
        .map((item) => item.boxed);
      const typeDefs: TypeDef[] = items
        .filter((item) => item.kind === "typeDef")
        .map((item) => item.boxed);
      return {
        kind: "interface",
        boxed: {
          functions,
          typeDefs,
        },
      };
    },

    InterfaceItem(
      gate,
      interface_,
      name,
      openBrace,
      interfaceItems,
      closeBrace
    ): Item<"interface", InterfaceDef> {
      const items = interfaceItems.children.map((child) => child.toModel());
      const functions: Func[] = items
        .filter((item) => item.kind === "func")
        .map((item) => item.boxed);
      const typeDefs: TypeDef[] = items
        .filter((item) => item.kind === "typeDef")
        .map((item) => item.boxed);
      return {
        kind: "interface",
        boxed: {
          ...gate.toModel(),
          name: name.sourceString,
          functions,
          typeDefs,
        },
      };
    },

    InterfaceItems(gate, definition): Item<any, any> {
      const item: Item<any, object> = definition.toModel();
      return {
        kind: item.kind,
        boxed: {
          ...gate.toModel(),
          ...item.boxed,
        },
      };
    },

    FuncItem(ident, colon, funcType, semicolon): Item<"func", Func> {
      const { params, result } = funcType.toModel();
      const boxed: Func = {
        name: ident.sourceString,
        params,
        result,
      };
      return {
        kind: "func",
        boxed,
      };
    },

    ResourceItem(
      record,
      ident,
      openBrace,
      resourceMethods,
      closeBrace
    ): Item<"typeDef", ResourceDef> {
      const items: (
        | Item<"func", Func>
        | Item<"static", Func>
        | Item<"constructor", { params: Param[] }>
      )[] = resourceMethods.children.map((child) => child.toModel());
      const methods: Func[] = items
        .filter((item) => item.kind === "func")
        .map((item) => item.boxed);
      const staticMethods: Func[] = items
        .filter((item) => item.kind === "static")
        .map((item) => item.boxed);
      const constructor = items.find(
        (item) => item.kind === "constructor"
      )?.boxed;
      return {
        kind: "typeDef",
        boxed: {
          kind: "resource",
          name: ident.sourceString,
          methods,
          staticMethods,
          constructor,
        },
      };
    },

    ResourceMethod_method(funcItem): Item<"func", Func> {
      return funcItem.toModel();
    },

    ResourceMethod_static(
      ident,
      colon,
      static_,
      funcType,
      semicolon
    ): Item<"static", Func> {
      return {
        kind: "static",
        boxed: {
          name: ident.sourceString,
          ...funcType.toModel(),
        },
      };
    },

    ResourceMethod_constructor(
      constructor,
      params,
      semicolon
    ): Item<"constructor", { params: Param[] }> {
      return {
        kind: "constructor",
        boxed: {
          params: params.toModel(),
        },
      };
    },

    FuncType(async_, func, params, result): Omit<Func, "name"> {
      return {
        params: params.toModel(),
        result: result?.children[0]?.toModel(),
      };
    },

    ParamList(openParen, params, closeParen): Param[] {
      return params.toModel();
    },

    NamedTypeList(params): Param[] {
      return params.asIteration().children.map((child) => child.toModel());
    },

    NamedType(name, colon, type): Param {
      return {
        name: name.toModel(),
        type: type.toModel(),
      };
    },

    ResultList(arrow, result): Ty {
      return result.toModel();
    },

    TupleType(tuple, openParen, types, comma, closeParen): TupleType {
      return {
        kind: "tuple",
        items: types.asIteration().children.map((child) => child.toModel()),
      };
    },

    ListType(list, openAngle, type, closeAngle): ListType {
      return {
        kind: "list",
        type: type.toModel(),
      };
    },

    OptionType(option, openAngle, type, closeAngle): OptionType {
      return {
        kind: "option",
        type: type.toModel(),
      };
    },

    ResultType(result, openAngle, ok, comma, error, closeAngle): ResultType {
      return {
        kind: "result",
        ok: ok.toModel(),
        error: error.children[0]?.toModel(),
      };
    },

    SimpleType(type): SimpleType {
      return type.sourceString as SimpleType;
    },

    EnumItem(
      enum_,
      ident,
      openBrace,
      enumItems,
      comma,
      closeBrace
    ): Item<"typeDef", EnumDef> {
      return {
        kind: "typeDef",
        boxed: {
          kind: "enum",
          name: ident.sourceString,
          cases: enumItems
            .asIteration()
            .children.map((child) => child.toModel()),
        },
      };
    },

    EnumCase(ident): string {
      return ident.sourceString;
    },

    VariantItem(
      variant,
      ident,
      openBrace,
      variantCases,
      comma,
      closeBrace
    ): Item<"typeDef", VariantDef> {
      return {
        kind: "typeDef",
        boxed: {
          kind: "variant",
          name: ident.sourceString,
          cases: variantCases
            .asIteration()
            .children.map((child) => child.toModel()),
        },
      };
    },

    VariantCase(ident, lparen, type, rparen): VariantCase {
      return {
        name: ident.sourceString,
        type: type.children[0]?.toModel(),
      };
    },

    TypeItem(type_, ident, eq, typeRef, semicolon): Item<"typeDef", AliasDef> {
      return {
        kind: "typeDef",
        boxed: {
          kind: "alias",
          name: ident.sourceString,
          type: typeRef.toModel(),
        },
      };
    },

    RecordItem(
      record,
      ident,
      openBrace,
      recordFields,
      comma,
      closeBrace
    ): Item<"typeDef", RecordDef> {
      return {
        kind: "typeDef",
        boxed: {
          kind: "record",
          name: ident.sourceString,
          fields: recordFields
            .asIteration()
            .children.map((child) => child.toModel()),
        },
      };
    },

    RecordField(ident, colon, type): RecordField {
      return {
        name: ident.sourceString,
        type: type.toModel(),
      };
    },

    FlagsItems(
      flags,
      ident,
      openBrace,
      flagsFields,
      comma,
      closeBrace
    ): Item<"typeDef", FlagsDef> {
      return {
        kind: "typeDef",
        boxed: {
          kind: "flags",
          name: ident.sourceString,
          fields: flagsFields
            .asIteration()
            .children.map((child) => child.toModel()),
        },
      };
    },

    FlagsField(ident): string {
      return ident.sourceString;
    },

    NestedPackageDefinition(
      packageDecl,
      lbrace,
      packageItems,
      rbrace
    ): Item<"package", NestedPackage> {
      return {
        kind: "package",
        boxed: {
          name: packageDecl.toModel(),
          interfaces: [],
        },
      };
    },

    _iter(...children) {
      return children.map((child) => child.toModel());
    },

    ident(ident): string {
      return ident.sourceString;
    },
  });
}
