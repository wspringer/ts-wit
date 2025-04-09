import { grammar } from "./grammar";
import { NonterminalNode, TerminalNode, IterationNode } from "ohm-js";
import {
  Node,
  File,
  PackageDecl,
  NestedPackageDefinition,
  ToplevelUseItem,
  UsePath,
  UseItem,
  UseNamesList,
  UseNamesItem,
  InterfaceItem,
  TypedefItem,
  TypeItem,
  RecordItem,
  RecordField,
  EnumItem,
  VariantItem,
  VariantCase,
  FlagsItem,
  FuncItem,
  FuncType,
  NamedType,
  TypeRef,
  SimpleType,
  ResultType,
  TupleType,
  OptionType,
  ListType,
  RefType,
  WorldItem,
  ExportItem,
  ImportItem,
  ExternType,
  ExternFuncType,
  ExternInterfaceType,
  IncludeItem,
  IncludeNamesList,
  IncludeNamesItem,
  Gate,
  GateItem,
  UnstableGate,
  SinceGate,
  DeprecatedGate,
} from "./types";

export function createSemantics() {
  const semantics = grammar.createSemantics();

  semantics.addOperation<Node>("resolve", {
    File(packageDecl, semicolon, items) {
      const file: File = {
        kind: "file",
        location: {
          start: this.source.startIdx,
          end: this.source.endIdx,
        },
        package: packageDecl.resolve(),
        items: items.children.map((child) => child.resolve()),
      };
      return file;
    },

    PackageDecl(package_, name) {
      const packageDecl: PackageDecl = {
        kind: "package",
        location: {
          start: package_.source.startIdx,
          end: name.source.endIdx,
        },
        name: name.sourceString,
      };
      return packageDecl;
    },

    NestedPackageDefinition(decl, lbrace, items, rbrace) {
      const nestedPackage: NestedPackageDefinition = {
        kind: "nestedPackage",
        location: {
          start: decl.source.startIdx,
          end: rbrace.source.endIdx,
        },
        package: decl.resolve(),
        items: items.children.map((child) => child.resolve()),
      };
      return nestedPackage;
    },

    PackageItem(item) {
      return item.resolve();
    },

    ToplevelUseItem(use, path, as, ident, semicolon) {
      const useItem: ToplevelUseItem = {
        kind: "use",
        location: {
          start: use.source.startIdx,
          end: semicolon.source.endIdx,
        },
        path: path.resolve(),
        alias: as ? ident.sourceString : undefined,
      };
      return useItem;
    },

    UsePath(path) {
      return path.resolve();
    },

    BareUsePath(ident) {
      const usePath: UsePath = {
        kind: "bareUsePath",
        location: {
          start: ident.source.startIdx,
          end: ident.source.endIdx,
        },
        path: ident.sourceString,
      };
      return usePath;
    },

    QualifiedUsePath(ident) {
      const usePath: UsePath = {
        kind: "qualifiedUsePath",
        location: {
          start: ident.source.startIdx,
          end: ident.source.endIdx,
        },
        segments: ident.sourceString.split(":"),
      };
      return usePath;
    },

    InterfaceItem(interface_, name, lbrace, items, rbrace) {
      const interfaceItem: InterfaceItem = {
        kind: "interface",
        location: {
          start: interface_.source.startIdx,
          end: rbrace.source.endIdx,
        },
        name: name.sourceString,
        items: items.children.map((child) => child.resolve()),
      };
      return interfaceItem;
    },

    InterfaceItems(gate, definition) {
      return definition.resolve();
    },

    TypedefItem(item) {
      return item.resolve();
    },

    TypeItem(type_, name, equals, typeRef, semicolon) {
      const typeItem: TypeItem = {
        kind: "type",
        location: {
          start: type_.source.startIdx,
          end: semicolon.source.endIdx,
        },
        name: name.sourceString,
        type: typeRef.resolve(),
      };
      return typeItem;
    },

    RecordItem(record, name, lbrace, fields, rbrace) {
      const recordItem: RecordItem = {
        kind: "record",
        location: {
          start: record.source.startIdx,
          end: rbrace.source.endIdx,
        },
        name: name.sourceString,
        fields: fields.children.map((child) => child.resolve()),
      };
      return recordItem;
    },

    RecordFields(
      fields: NonterminalNode,
      _iter1: IterationNode,
      _iter2: IterationNode
    ) {
      return {
        kind: "recordFields",
        location: {
          start: fields.source.startIdx,
          end: fields.source.endIdx,
        },
        fields: fields.children.map((child: NonterminalNode) =>
          child.resolve()
        ),
      };
    },

    RecordField(name, colon, type) {
      const field: RecordField = {
        kind: "field",
        location: {
          start: name.source.startIdx,
          end: type.source.endIdx,
        },
        name: name.sourceString,
        type: type.resolve(),
      };
      return field;
    },

    EnumItem(enum_, name, lbrace, cases, rbrace) {
      const enumItem: EnumItem = {
        kind: "enum",
        location: {
          start: enum_.source.startIdx,
          end: rbrace.source.endIdx,
        },
        name: name.sourceString,
        cases: cases.children.map((child) => child.sourceString),
      };
      return enumItem;
    },

    VariantItem(variant, name, lbrace, cases, rbrace) {
      const variantItem: VariantItem = {
        kind: "variant",
        location: {
          start: variant.source.startIdx,
          end: rbrace.source.endIdx,
        },
        name: name.sourceString,
        cases: cases.children.map((child) => child.resolve()),
      };
      return variantItem;
    },

    VariantCase(name, lparen, type, rparen) {
      const variantCase: VariantCase = {
        kind: "case",
        location: {
          start: name.source.startIdx,
          end: rparen ? rparen.source.endIdx : name.source.endIdx,
        },
        name: name.sourceString,
        type: type ? type.resolve() : undefined,
      };
      return variantCase;
    },

    FlagsItems(flags, name, lbrace, fields, rbrace) {
      const flagsItem: FlagsItem = {
        kind: "flags",
        location: {
          start: flags.source.startIdx,
          end: rbrace.source.endIdx,
        },
        name: name.sourceString,
        flags: fields.children.map((child) => child.sourceString),
      };
      return flagsItem;
    },

    FuncItem(name, colon, funcType, semicolon) {
      const funcItem: FuncItem = {
        kind: "func",
        location: {
          start: name.source.startIdx,
          end: semicolon.source.endIdx,
        },
        name: name.sourceString,
        type: funcType.resolve(),
      };
      return funcItem;
    },

    FuncType(async, func, params, result) {
      const funcType: FuncType = {
        kind: "funcType",
        location: {
          start: async ? async.source.startIdx : func.source.startIdx,
          end: result ? result.source.endIdx : params.source.endIdx,
        },
        async: !!async,
        params: params.resolve(),
        result: result ? result.resolve() : undefined,
      };
      return funcType;
    },

    ParamList(lparen, params, rparen) {
      const paramList = {
        kind: "paramList",
        location: {
          start: lparen.source.startIdx,
          end: rparen.source.endIdx,
        },
        params: params ? params.children.map((child) => child.resolve()) : [],
      };
      return paramList;
    },

    NamedType(name, colon, type) {
      const namedType: NamedType = {
        kind: "namedType",
        location: {
          start: name.source.startIdx,
          end: type.source.endIdx,
        },
        name: name.sourceString,
        type: type.resolve(),
      };
      return namedType;
    },

    ResultList(arrow, type) {
      return type.resolve();
    },

    TypeRef(type) {
      return type.resolve();
    },

    SimpleType(name) {
      const simpleType: SimpleType = {
        kind: "simple",
        location: {
          start: name.source.startIdx,
          end: name.source.endIdx,
        },
        name: name.sourceString,
      };
      return simpleType;
    },

    ResultType(result, langle, ok, comma, error, rangle) {
      const resultType: ResultType = {
        kind: "result",
        location: {
          start: result.source.startIdx,
          end: rangle.source.endIdx,
        },
        ok: ok.resolve(),
        error: error ? error.resolve() : undefined,
      };
      return resultType;
    },

    TupleType(tuple, langle, first, rest, rangle) {
      const types = [first.resolve()];
      if (rest) {
        for (let i = 0; i < rest.children.length; i += 2) {
          types.push(rest.children[i].resolve());
        }
      }
      const tupleType: TupleType = {
        kind: "tuple",
        location: {
          start: tuple.source.startIdx,
          end: rangle.source.endIdx,
        },
        types,
      };
      return tupleType;
    },

    OptionType(
      this: NonterminalNode,
      option: TerminalNode,
      langle: NonterminalNode,
      type: TerminalNode,
      rangle: TerminalNode
    ): Node {
      const optionType: OptionType = {
        kind: "option",
        location: {
          start: option.source.startIdx,
          end: rangle.source.endIdx,
        },
        type: type.resolve(),
      };
      return optionType;
    },

    ListType(
      this: NonterminalNode,
      list: TerminalNode,
      langle: NonterminalNode,
      type: TerminalNode,
      rangle: TerminalNode
    ): Node {
      const listType: ListType = {
        kind: "list",
        location: {
          start: list.source.startIdx,
          end: rangle.source.endIdx,
        },
        type: type.resolve(),
      };
      return listType;
    },

    RefType(name) {
      const refType: RefType = {
        kind: "ref",
        location: {
          start: name.source.startIdx,
          end: name.source.endIdx,
        },
        name: name.sourceString,
      };
      return refType;
    },
  });

  return semantics;
}
