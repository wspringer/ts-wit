import { NonterminalNode, TerminalNode } from "ohm-js";
import { grammar } from "./grammar";
import {
  WITType,
  EnumType,
  RecordType,
  VariantType,
  FlagsType,
  TypeAlias,
} from "./types";

export class Resolver {
  private types: Map<string, WITType> = new Map();

  resolve(input: string): Map<string, WITType> {
    const match = grammar.match(input);
    if (!match.succeeded()) {
      throw new Error(`Failed to parse WIT: ${match.message}`);
    }

    const semantics = grammar.createSemantics();
    const resolver = this;
    let currentPackage = "";

    semantics.addOperation("resolve", {
      File(
        packageDecl: TerminalNode,
        semicolon: TerminalNode,
        items: NonterminalNode
      ) {
        if (packageDecl.sourceString.startsWith("package")) {
          currentPackage = packageDecl.sourceString
            .replace(/^package\s+/, "")
            .replace(/;$/, "");
        }
        for (const item of items.children) {
          if (item.isNonterminal) {
            item.resolve();
          }
        }
      },
      InterfaceItem(
        interface_: TerminalNode,
        name: NonterminalNode,
        lbrace: TerminalNode,
        items: NonterminalNode,
        rbrace: TerminalNode
      ) {
        if (!currentPackage) {
          currentPackage = name.sourceString;
        }
        for (const item of items.children) {
          if (item.isNonterminal) {
            item.resolve();
          }
        }
      },
      InterfaceItems(gate: NonterminalNode, definition: NonterminalNode) {
        if (definition.isNonterminal) {
          definition.resolve();
        }
      },
      InterfaceDefinition(item: NonterminalNode) {
        if (item.isNonterminal) {
          item.resolve();
        }
      },
      TypedefItem(item: NonterminalNode) {
        if (item.isNonterminal) {
          item.resolve();
        }
      },
      EnumItem(
        enum_: TerminalNode,
        name: NonterminalNode,
        lbrace: TerminalNode,
        cases: NonterminalNode,
        rbrace: TerminalNode
      ) {
        const enumName = currentPackage
          ? `${currentPackage}.${name.sourceString}`
          : name.sourceString;
        const enumCases = cases.resolve();

        const enumType: EnumType = {
          kind: "enum",
          name: enumName,
          location: {
            start: enum_.source.startIdx,
            end: rbrace.source.endIdx,
          },
          cases: enumCases,
        };

        resolver.types.set(enumType.name, enumType);
      },
      RecordItem(
        record: TerminalNode,
        name: NonterminalNode,
        lbrace: TerminalNode,
        fields: NonterminalNode,
        rbrace: TerminalNode
      ) {
        const recordName = currentPackage
          ? `${currentPackage}.${name.sourceString}`
          : name.sourceString;
        const recordFields = fields.resolve();

        const recordType: RecordType = {
          kind: "record",
          name: recordName,
          location: {
            start: record.source.startIdx,
            end: rbrace.source.endIdx,
          },
          fields: recordFields,
        };

        resolver.types.set(recordType.name, recordType);
      },
      VariantItem(
        variant: TerminalNode,
        name: NonterminalNode,
        lbrace: TerminalNode,
        cases: NonterminalNode,
        rbrace: TerminalNode
      ) {
        const variantName = currentPackage
          ? `${currentPackage}.${name.sourceString}`
          : name.sourceString;
        const variantCases = cases.resolve();

        const variantType: VariantType = {
          kind: "variant",
          name: variantName,
          location: {
            start: variant.source.startIdx,
            end: rbrace.source.endIdx,
          },
          cases: variantCases,
        };

        resolver.types.set(variantType.name, variantType);
      },
      FlagsItems(
        flags: TerminalNode,
        name: NonterminalNode,
        lbrace: TerminalNode,
        fields: NonterminalNode,
        rbrace: TerminalNode
      ) {
        const flagsName = currentPackage
          ? `${currentPackage}.${name.sourceString}`
          : name.sourceString;
        const flagsList = fields.resolve();

        const flagsType: FlagsType = {
          kind: "flags",
          name: flagsName,
          location: {
            start: flags.source.startIdx,
            end: rbrace.source.endIdx,
          },
          flags: flagsList,
        };

        resolver.types.set(flagsType.name, flagsType);
      },
      TypeItem(
        type_: TerminalNode,
        name: NonterminalNode,
        equals: TerminalNode,
        typeRef: NonterminalNode,
        semicolon: TerminalNode
      ) {
        const typeName = currentPackage
          ? `${currentPackage}.${name.sourceString}`
          : name.sourceString;
        const resolvedType = typeRef.resolveTypeRef();
        const typeAlias: TypeAlias = {
          kind: "type",
          name: typeName,
          location: {
            start: type_.source.startIdx,
            end: semicolon.source.endIdx,
          },
          type: Array.isArray(resolvedType) ? resolvedType[0] : resolvedType,
        };

        resolver.types.set(typeAlias.name, typeAlias);
      },
      FuncItem(
        name: NonterminalNode,
        colon: TerminalNode,
        funcType: NonterminalNode,
        semicolon: TerminalNode
      ) {
        const funcName = currentPackage
          ? `${currentPackage}.${name.sourceString}`
          : name.sourceString;
        const resolvedType = funcType.resolveTypeRef();
        const functionType: TypeAlias = {
          kind: "type",
          name: funcName,
          location: {
            start: name.source.startIdx,
            end: semicolon.source.endIdx,
          },
          type: Array.isArray(resolvedType) ? resolvedType[0] : resolvedType,
        };

        resolver.types.set(functionType.name, functionType);
      },
      FuncType(
        async: TerminalNode,
        func: TerminalNode,
        params: NonterminalNode,
        result: NonterminalNode
      ) {
        const paramList = params.resolve();
        const resultType = result ? result.resolveTypeRef() : undefined;
        return {
          kind: "function",
          params: Array.isArray(paramList) ? paramList : [],
          result: resultType,
        };
      },
      ParamList(
        lparen: TerminalNode,
        params: NonterminalNode,
        rparen: TerminalNode
      ) {
        if (!params) return [];
        return params.resolve();
      },
      NamedTypeList(
        first: NonterminalNode,
        comma: TerminalNode,
        rest: NonterminalNode
      ) {
        const types = [first.resolve()];
        if (rest && rest.children) {
          for (let i = 0; i < rest.children.length; i += 2) {
            types.push(rest.children[i].resolve());
          }
        }
        return types;
      },
      NamedType(
        name: NonterminalNode,
        colon: TerminalNode,
        type: NonterminalNode
      ) {
        return {
          name: name.sourceString.trim(),
          type: type.resolveTypeRef(),
        };
      },
      ResultList(arrow: TerminalNode, type: NonterminalNode) {
        return type.resolveTypeRef();
      },
      SimpleType(type_: TerminalNode) {
        return {
          kind: "simple",
          name: type_.sourceString,
        };
      },
      ResultType(
        result: TerminalNode,
        langle: TerminalNode,
        firstType: NonterminalNode,
        comma: TerminalNode,
        secondType: NonterminalNode,
        rangle: TerminalNode
      ) {
        const ok = firstType.resolve();
        const error = secondType ? secondType.resolve() : undefined;
        return {
          kind: "result",
          ok: Array.isArray(ok) ? ok[0] : ok,
          error: error ? (Array.isArray(error) ? error[0] : error) : undefined,
        };
      },
      TupleType(
        tuple: TerminalNode,
        firstType: NonterminalNode,
        comma: TerminalNode,
        remainingTypes: NonterminalNode,
        rangle: TerminalNode
      ) {
        const types = [
          firstType.resolveTypeRef(),
          ...remainingTypes.children.map((t: NonterminalNode) =>
            t.resolveTypeRef()
          ),
        ];
        return {
          kind: "tuple",
          types,
        };
      },
      OptionType(
        option: TerminalNode,
        type: NonterminalNode,
        rangle: TerminalNode
      ) {
        return {
          kind: "option",
          type: type.resolveTypeRef(),
        };
      },
      ListType(
        list: TerminalNode,
        type: NonterminalNode,
        rangle: TerminalNode
      ) {
        return {
          kind: "list",
          type: type.resolveTypeRef(),
        };
      },
      EnumCases(
        first: NonterminalNode,
        _comma: TerminalNode,
        rest: NonterminalNode
      ) {
        return [
          first.sourceString.trim(),
          ...rest.children.map((c: NonterminalNode) => c.sourceString.trim()),
        ];
      },
      RecordFields(
        first: NonterminalNode,
        _comma: TerminalNode,
        rest: NonterminalNode
      ) {
        const fields = [first, ...rest.children];
        return fields.map((f: NonterminalNode) => ({
          name: f.child(0).sourceString.trim(),
          type: f.child(2).resolveTypeRef(),
        }));
      },
      VariantCases(
        first: NonterminalNode,
        comma: TerminalNode,
        rest: NonterminalNode
      ) {
        const cases = [first.resolve()];
        if (rest && rest.children) {
          for (let i = 0; i < rest.children.length; i += 2) {
            cases.push(rest.children[i].resolve());
          }
        }
        return cases;
      },
      VariantCase(
        name: NonterminalNode,
        lparen: TerminalNode,
        type: NonterminalNode,
        rparen: TerminalNode
      ) {
        const resolved = type ? type.resolveTypeRef() : undefined;
        return {
          name: name.sourceString.trim(),
          type: Array.isArray(resolved) ? resolved[0] : resolved,
        };
      },
      FlagsFields(
        first: NonterminalNode,
        _comma: TerminalNode,
        rest: NonterminalNode
      ) {
        return [
          first.sourceString.trim(),
          ...rest.children.map((c: NonterminalNode) => c.sourceString.trim()),
        ];
      },
      _terminal() {
        return this.sourceString;
      },
      _iter(...children: NonterminalNode[]) {
        return children.map((child) => child.resolve());
      },
    });

    semantics.addOperation("resolveTypeRef", {
      TypeRef(type: NonterminalNode) {
        if (type.isNonterminal) {
          return type.resolveTypeRef();
        }
        return {
          kind: "ref",
          name: type.sourceString,
        };
      },
      ident(
        _first: NonterminalNode,
        _rest: NonterminalNode,
        _last: NonterminalNode
      ) {
        return {
          kind: "ref",
          name: this.sourceString,
        };
      },
      FuncType(
        async: TerminalNode,
        func: TerminalNode,
        params: NonterminalNode,
        result: NonterminalNode
      ) {
        const paramList = params.resolve();
        const resultType = result ? result.resolveTypeRef() : undefined;
        return {
          kind: "function",
          params: Array.isArray(paramList) ? paramList : [],
          result: resultType,
        };
      },
      ParamList(
        lparen: TerminalNode,
        params: NonterminalNode,
        rparen: TerminalNode
      ) {
        if (!params) return [];
        return params.resolve();
      },
      NamedTypeList(
        first: NonterminalNode,
        comma: TerminalNode,
        rest: NonterminalNode
      ) {
        const types = [first.resolve()];
        if (rest && rest.children) {
          for (let i = 0; i < rest.children.length; i += 2) {
            types.push(rest.children[i].resolve());
          }
        }
        return types;
      },
      NamedType(
        name: NonterminalNode,
        colon: TerminalNode,
        type: NonterminalNode
      ) {
        return {
          name: name.sourceString.trim(),
          type: type.resolveTypeRef(),
        };
      },
      ResultList(arrow: TerminalNode, type: NonterminalNode) {
        return type.resolveTypeRef();
      },
      RecordField(
        name: NonterminalNode,
        colon: TerminalNode,
        type: NonterminalNode
      ) {
        const resolved = type.resolveTypeRef();
        return {
          name: name.sourceString.trim(),
          type: Array.isArray(resolved) ? resolved[0] : resolved,
        };
      },
      SimpleType(type: NonterminalNode) {
        return {
          kind: "simple",
          name: type.sourceString,
        };
      },
      ResultType(
        result: TerminalNode,
        langle: TerminalNode,
        firstType: NonterminalNode,
        comma: TerminalNode,
        secondType: NonterminalNode,
        rangle: TerminalNode
      ) {
        const ok = firstType.resolve();
        const error = secondType ? secondType.resolve() : undefined;
        return {
          kind: "result",
          ok: Array.isArray(ok) ? ok[0] : ok,
          error: error ? (Array.isArray(error) ? error[0] : error) : undefined,
        };
      },
      TupleType(
        tuple: TerminalNode,
        firstType: NonterminalNode,
        comma: TerminalNode,
        remainingTypes: NonterminalNode,
        rangle: TerminalNode
      ) {
        const types = [
          firstType.resolveTypeRef(),
          ...remainingTypes.children.map((t: NonterminalNode) =>
            t.resolveTypeRef()
          ),
        ];
        return {
          kind: "tuple",
          types,
        };
      },
      OptionType(
        option: TerminalNode,
        type: NonterminalNode,
        rangle: TerminalNode
      ) {
        return {
          kind: "option",
          type: type.resolveTypeRef(),
        };
      },
      ListType(
        list: TerminalNode,
        type: NonterminalNode,
        rangle: TerminalNode
      ) {
        return {
          kind: "list",
          type: type.resolveTypeRef(),
        };
      },
      _terminal() {
        return this.sourceString;
      },
      _iter(...children: NonterminalNode[]) {
        return children.map((child) => child.resolve());
      },
    });

    semantics(match).resolve();
    return this.types;
  }
}
