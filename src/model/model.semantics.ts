import { WitSemantics } from "../grammar.ohm-bundle";
import {
  AliasDef,
  EnumDef,
  FlagsDef,
  Func,
  InterfaceDef,
  ListType,
  NestedPackage,
  OptionType,
  Package,
  Param,
  RecordDef,
  RecordField,
  ResultType,
  SimpleType,
  Ty,
  TypeDef,
  VariantCase,
  VariantDef,
  Wit,
} from "./model.types";
import { grammar } from "../grammar";

type Item<K, T> = {
  kind: K;
  boxed: T;
};

function defineModel(semantics: WitSemantics) {
  semantics.addOperation<any>("toModel", {
    File(packageDecl, semicolon, packageItems): Wit {
      const items: Item<any, any>[] = packageItems.children.map((child) =>
        child.toModel()
      );
      const interfaces: InterfaceDef[] = items
        .filter((item) => item.kind === "interface")
        .map((item) => item.boxed);
      const packages: NestedPackage[] = items
        .filter((item) => item.kind === "package")
        .map((item) => item.boxed);

      return {
        name: packageDecl.children[0]?.toModel(),
        uses: [],
        packages,
        interfaces,
        worlds: [],
      };
    },

    PackageDecl(package_, name): string {
      return name.sourceString;
    },

    InterfaceItem(
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
          name: name.sourceString,
          functions,
          typeDefs,
        },
      };
    },

    InterfaceItems(gate, definition): InterfaceDef {
      return definition.toModel();
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

    FuncType(async_, func, params, result): Omit<Func, "name"> {
      return {
        params: params.toModel(),
        // params: [],
        result: result?.children[0]?.toModel(),
      };
    },

    ParamList(openParen, params, closeParen): Param[] {
      return params.toModel();
    },

    NamedTypeList(params): Param[] {
      params.children[0].children.length; //?
      return params.children[0].children.map((child) => child.toModel());
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
        error: error.children[1]?.toModel(),
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

export function parseWit(input: string): Wit {
  const semantics = grammar.createSemantics();
  defineModel(semantics);
  const match = grammar.match(input);
  if (match.failed()) {
    throw new Error(match.message);
  }
  return semantics(match).toModel();
}
