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
  IncludeNamesItem,
  Gate,
  GateItem,
  UnstableGate,
  SinceGate,
  DeprecatedGate,
  ResourceItem,
  ResourceMethod,
  ResourceMethodItem,
  ResourceStaticMethod,
  ResourceConstructor,
} from "./ast.types";
import { WitSemantics } from "./grammar.ohm-bundle";

export function defineAST(semantics: WitSemantics) {

  semantics.addOperation<Node>("resolve", {
    File(packageDecl, semicolon, items) {
      const file: File = {
        kind: "file",
        location: {
          start: this.source.startIdx,
          end: this.source.endIdx,
        },
        package:
          packageDecl.children.length > 0
            ? packageDecl.children[0].resolve()
            : undefined,
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
        name: name.resolve().value,
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

    InterfaceDefinition(item) {
      return item.resolve();
    },

    TypedefItem(item) {
      const resolvedItem = item.resolve();
      const typedefItem: TypedefItem = {
        kind: "typedef",
        location: {
          start: this.source.startIdx,
          end: this.source.endIdx,
        },
        item: resolvedItem,
      };
      return typedefItem;
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

    RecordItem(record, name, lbrace, fields, comma, rbrace) {
      const recordItem: RecordItem = {
        kind: "record",
        location: {
          start: record.source.startIdx,
          end: rbrace.source.endIdx,
        },
        name: name.sourceString,
        fields: fields.asIteration().children.map((child) => child.resolve()),
      };
      return recordItem;
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

    EnumItem(enum_, name, lbrace, cases, comma, rbrace) {
      const enumItem: EnumItem = {
        kind: "enum",
        location: {
          start: enum_.source.startIdx,
          end: rbrace.source.endIdx,
        },
        name: name.sourceString,
        cases: cases.asIteration().children.map((child) => child.sourceString),
      };
      return enumItem;
    },

    VariantItem(variant, name, lbrace, cases, comma, rbrace) {
      const variantItem: VariantItem = {
        kind: "variant",
        location: {
          start: variant.source.startIdx,
          end: rbrace.source.endIdx,
        },
        name: name.sourceString,
        cases: cases.asIteration().children.map((child) => child.resolve()),
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
        type: type?.children[0]?.resolve(),
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

    FuncType(async, func, params, arrow, result) {
      const funcType: FuncType = {
        kind: "funcType",
        location: {
          start: async.source.startIdx,
          end: result ? result.source.endIdx : params.source.endIdx,
        },
        async: async.sourceString === "async",
        params: params?.resolve().items || [],
        result: result?.children[0]?.resolve(),
      };
      return funcType;
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

    TypeRef(type) {
      const resolvedType = type.resolve();
      const typeRef: TypeRef = {
        kind: "typeRef",
        location: {
          start: this.source.startIdx,
          end: this.source.endIdx,
        },
        type: resolvedType,
      };
      return typeRef;
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

    TupleType(tuple, langle, first, comma, rest, rangle) {
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

    packageIdentifier(idents, colons, package_, at, version) {
      const identsStr = idents.children
        .map((child, i) => child.sourceString + colons.children[i].sourceString)
        .join("");
      const packageStr = package_.sourceString;
      const versionStr = version.sourceString
        ? at.sourceString + version.sourceString
        : "";
      return {
        kind: "packageIdentifier",
        location: {
          start: this.source.startIdx,
          end: this.source.endIdx,
        },
        value: identsStr + packageStr + versionStr,
      };
    },

    ResourceItem(resource, name, lbrace, methods, rbrace) {
      const resourceItem: ResourceItem = {
        kind: "resource",
        location: {
          start: resource.source.startIdx,
          end: rbrace.source.endIdx,
        },
        name: name.sourceString,
        methods: methods.children.map((child) => child.resolve()),
      };
      return resourceItem;
    },

    ResourceMethod(method) {
      return method.resolve();
    },

    ResourceMethod_method(name, colon, funcType, semicolon) {
      const methodItem: ResourceMethodItem = {
        kind: "resourceMethod",
        location: {
          start: name.source.startIdx,
          end: semicolon.source.endIdx,
        },
        name: name.sourceString,
        type: funcType.resolve(),
      };
      return methodItem;
    },

    ResourceMethod_static(name, colon, static_, funcType, semicolon) {
      const staticMethod: ResourceStaticMethod = {
        kind: "resourceStaticMethod",
        location: {
          start: name.source.startIdx,
          end: semicolon.source.endIdx,
        },
        name: name.sourceString,
        type: funcType.resolve(),
      };
      return staticMethod;
    },

    ResourceMethod_constructor(constructor_, params, semicolon) {
      const constructor: ResourceConstructor = {
        kind: "resourceConstructor",
        location: {
          start: constructor_.source.startIdx,
          end: semicolon.source.endIdx,
        },
        params:
          params.children[1].children.length > 0
            ? params.children[1].children[0].resolve().items
            : [],
      };
      return constructor;
    },

    ParamList(lparen, params, rparen) {
      const result = params.children[0].resolve();
      return result;
    },

    NamedTypeList(first, _comma, rest) {
      const result = {
        kind: "namedTypeList",
        location: {
          start: first.source.startIdx,
          end: rest?.source.endIdx || first.source.endIdx,
        },
        items: [
          first.resolve(),
          ...rest.children.map((child) => child.resolve()),
        ],
      };
      return result;
    },

    IncludeItem_simple(include, path, semicolon) {
      const includeItem: IncludeItem = {
        kind: "include",
        location: {
          start: include.source.startIdx,
          end: semicolon.source.endIdx,
        },
        path: path.resolve(),
      };
      return includeItem;
    },

    IncludeItem_aliased(include, path, with_, lbrace, names, rbrace) {
      const includeItem: IncludeItem = {
        kind: "include",
        location: {
          start: include.source.startIdx,
          end: rbrace.source.endIdx,
        },
        path: path.resolve(),
        names: names.asIteration().children.map((child) => child.resolve()),
      };
      return includeItem;
    },

    IncludeNamesItem(name, as, alias) {
      const includeName: IncludeNamesItem = {
        kind: "includeName",
        location: {
          start: name.source.startIdx,
          end: alias.source.endIdx,
        },
        name: name.sourceString,
        alias: alias.sourceString,
      };
      return includeName;
    },

    WorldItem(gate, world, name, lbrace, items, rbrace) {
      gate.children[0] //?
      const worldItem: WorldItem = {
        kind: "world",
        location: {
          start: gate.source.startIdx,
          end: rbrace.source.endIdx,
        },
        gate: gate.resolve(),
        name: name.sourceString,
        items: items.children.map((child) => child.resolve()),
      };
      return worldItem;
    },

    WorldItems(gate, item) {
      return item.resolve();
    },

    WorldDefinition(item) {
      return item.resolve();
    },

    Gate(items) {
      const gate: Gate = {
        kind: "gate",
        location: {
          start: this.source.startIdx,
          end: this.source.endIdx,
        },
        items: items.children.map((child) => child.resolve()),
      };
      return gate;
    },

    GateItem(item) {
      return item.resolve();
    },

    SinceGate(since, lparen, version, rparen) {
      const sinceGate: SinceGate = {
        kind: "sinceGate",
        location: {
          start: since.source.startIdx,
          end: rparen.source.endIdx,
        },
        version: version.sourceString,
      };
      return sinceGate;
    },

    DeprecatedGate(deprecated, lparen, version, rparen) {
      const deprecatedGate: DeprecatedGate = {
        kind: "deprecatedGate",
        location: {
          start: deprecated.source.startIdx,
          end: rparen.source.endIdx,
        },
        version: version.sourceString,
      };
      return deprecatedGate;
    },
  });
}
