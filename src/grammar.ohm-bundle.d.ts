// AUTOGENERATED FILE
// This file was generated from grammar.ohm by `ohm generateBundles`.

import {
  BaseActionDict,
  Grammar,
  IterationNode,
  Node,
  NonterminalNode,
  Semantics,
  TerminalNode
} from 'ohm-js';

export interface WitActionDict<T> extends BaseActionDict<T> {
  File?: (this: NonterminalNode, arg0: IterationNode, arg1: IterationNode, arg2: IterationNode) => T;
  PackageDecl?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode) => T;
  NestedPackageDefinition?: (this: NonterminalNode, arg0: NonterminalNode, arg1: TerminalNode, arg2: IterationNode, arg3: TerminalNode) => T;
  PackageItem?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  WorldItem?: (this: NonterminalNode, arg0: NonterminalNode, arg1: TerminalNode, arg2: NonterminalNode, arg3: TerminalNode, arg4: IterationNode, arg5: TerminalNode) => T;
  WorldItems?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode) => T;
  WorldDefinition?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  ExportItem?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  ExportItemExternType?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode, arg2: TerminalNode, arg3: NonterminalNode) => T;
  ExportItemUsePath?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode, arg2: TerminalNode) => T;
  ImportItem?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  ImportItemExternType?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode, arg2: TerminalNode, arg3: NonterminalNode) => T;
  ImportItemUsePath?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode, arg2: TerminalNode) => T;
  IncludeItem_simple?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode, arg2: TerminalNode) => T;
  IncludeItem_aliased?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode, arg2: TerminalNode, arg3: TerminalNode, arg4: NonterminalNode, arg5: TerminalNode) => T;
  IncludeItem?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  IncludeNamesList?: (this: NonterminalNode, arg0: NonterminalNode, arg1: IterationNode, arg2: IterationNode) => T;
  IncludeNamesItem?: (this: NonterminalNode, arg0: NonterminalNode, arg1: TerminalNode, arg2: NonterminalNode) => T;
  UseItem?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode, arg2: TerminalNode, arg3: TerminalNode, arg4: NonterminalNode, arg5: TerminalNode) => T;
  UseNamesList?: (this: NonterminalNode, arg0: NonterminalNode, arg1: IterationNode, arg2: IterationNode) => T;
  UseNamesItem?: (this: NonterminalNode, arg0: NonterminalNode, arg1: IterationNode, arg2: IterationNode) => T;
  ExternType?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  ExternTypeFunc?: (this: NonterminalNode, arg0: NonterminalNode, arg1: TerminalNode) => T;
  ExternTypeInterface?: (this: NonterminalNode, arg0: TerminalNode, arg1: TerminalNode, arg2: IterationNode, arg3: TerminalNode) => T;
  ToplevelUseItem?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode, arg2: IterationNode, arg3: IterationNode, arg4: TerminalNode) => T;
  UsePath?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  BareUsePath?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  QualifiedUsePath?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  InterfaceItem?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode, arg2: TerminalNode, arg3: IterationNode, arg4: TerminalNode) => T;
  InterfaceItems?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode) => T;
  InterfaceDefinition?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  TypedefItem?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  Gate?: (this: NonterminalNode, arg0: IterationNode) => T;
  GateItem?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  UnstableGate?: (this: NonterminalNode, arg0: TerminalNode, arg1: TerminalNode, arg2: NonterminalNode, arg3: TerminalNode) => T;
  SinceGate?: (this: NonterminalNode, arg0: TerminalNode, arg1: TerminalNode, arg2: NonterminalNode, arg3: TerminalNode) => T;
  DeprecatedGate?: (this: NonterminalNode, arg0: TerminalNode, arg1: TerminalNode, arg2: NonterminalNode, arg3: TerminalNode) => T;
  FeatureField?: (this: NonterminalNode, arg0: TerminalNode, arg1: TerminalNode, arg2: NonterminalNode) => T;
  VersionField?: (this: NonterminalNode, arg0: TerminalNode, arg1: TerminalNode, arg2: NonterminalNode) => T;
  FlagsItems?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode, arg2: TerminalNode, arg3: NonterminalNode, arg4: TerminalNode) => T;
  FlagsFields?: (this: NonterminalNode, arg0: NonterminalNode, arg1: IterationNode, arg2: IterationNode) => T;
  FlagsField?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  TypeItem?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode, arg2: TerminalNode, arg3: NonterminalNode, arg4: TerminalNode) => T;
  VariantItem?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode, arg2: TerminalNode, arg3: NonterminalNode, arg4: TerminalNode) => T;
  VariantCases?: (this: NonterminalNode, arg0: NonterminalNode, arg1: IterationNode, arg2: IterationNode) => T;
  VariantCase?: (this: NonterminalNode, arg0: NonterminalNode, arg1: IterationNode, arg2: IterationNode, arg3: IterationNode) => T;
  EnumItem?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode, arg2: TerminalNode, arg3: NonterminalNode, arg4: TerminalNode) => T;
  EnumCases?: (this: NonterminalNode, arg0: NonterminalNode, arg1: IterationNode, arg2: IterationNode) => T;
  EnumCase?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  RecordItem?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode, arg2: TerminalNode, arg3: NonterminalNode, arg4: TerminalNode) => T;
  RecordFields?: (this: NonterminalNode, arg0: NonterminalNode, arg1: IterationNode, arg2: IterationNode) => T;
  RecordField?: (this: NonterminalNode, arg0: NonterminalNode, arg1: TerminalNode, arg2: NonterminalNode) => T;
  ResourceItem?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode, arg2: TerminalNode, arg3: IterationNode, arg4: TerminalNode) => T;
  ResourceMethod_method?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  ResourceMethod_static?: (this: NonterminalNode, arg0: NonterminalNode, arg1: TerminalNode, arg2: TerminalNode, arg3: NonterminalNode, arg4: TerminalNode) => T;
  ResourceMethod_constructor?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode, arg2: TerminalNode) => T;
  ResourceMethod?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  FuncItem?: (this: NonterminalNode, arg0: NonterminalNode, arg1: TerminalNode, arg2: NonterminalNode, arg3: TerminalNode) => T;
  FuncType?: (this: NonterminalNode, arg0: IterationNode, arg1: TerminalNode, arg2: NonterminalNode, arg3: IterationNode) => T;
  ParamList?: (this: NonterminalNode, arg0: TerminalNode, arg1: IterationNode, arg2: TerminalNode) => T;
  NamedTypeList?: (this: NonterminalNode, arg0: NonterminalNode, arg1: IterationNode, arg2: IterationNode) => T;
  NamedType?: (this: NonterminalNode, arg0: NonterminalNode, arg1: TerminalNode, arg2: NonterminalNode) => T;
  ResultList?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode) => T;
  TypeRef?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  RefType?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  ResultType?: (this: NonterminalNode, arg0: TerminalNode, arg1: TerminalNode, arg2: NonterminalNode, arg3: IterationNode, arg4: IterationNode, arg5: TerminalNode) => T;
  TupleType?: (this: NonterminalNode, arg0: TerminalNode, arg1: TerminalNode, arg2: NonterminalNode, arg3: IterationNode, arg4: IterationNode, arg5: TerminalNode) => T;
  OptionType?: (this: NonterminalNode, arg0: TerminalNode, arg1: TerminalNode, arg2: NonterminalNode, arg3: TerminalNode) => T;
  ListType?: (this: NonterminalNode, arg0: TerminalNode, arg1: TerminalNode, arg2: NonterminalNode, arg3: TerminalNode) => T;
  SimpleType?: (this: NonterminalNode, arg0: TerminalNode) => T;
  packageIdentifier?: (this: NonterminalNode, arg0: IterationNode, arg1: IterationNode, arg2: NonterminalNode, arg3: IterationNode, arg4: IterationNode) => T;
  version?: (this: NonterminalNode, arg0: IterationNode, arg1: TerminalNode, arg2: IterationNode, arg3: TerminalNode, arg4: IterationNode) => T;
  package?: (this: NonterminalNode, arg0: NonterminalNode, arg1: IterationNode, arg2: IterationNode) => T;
  ident?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  label?: (this: NonterminalNode, arg0: NonterminalNode, arg1: IterationNode, arg2: IterationNode) => T;
  fragment?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  word?: (this: NonterminalNode, arg0: NonterminalNode, arg1: IterationNode) => T;
  acronym?: (this: NonterminalNode, arg0: NonterminalNode, arg1: IterationNode) => T;
  space?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  whitespace?: (this: NonterminalNode, arg0: TerminalNode) => T;
  lineComment?: (this: NonterminalNode, arg0: TerminalNode, arg1: IterationNode, arg2: TerminalNode) => T;
  multiLineComment?: (this: NonterminalNode, arg0: TerminalNode, arg1: IterationNode, arg2: TerminalNode) => T;
}

export interface WitSemantics extends Semantics {
  addOperation<T>(name: string, actionDict: WitActionDict<T>): this;
  extendOperation<T>(name: string, actionDict: WitActionDict<T>): this;
  addAttribute<T>(name: string, actionDict: WitActionDict<T>): this;
  extendAttribute<T>(name: string, actionDict: WitActionDict<T>): this;
}

export interface WitGrammar extends Grammar {
  createSemantics(): WitSemantics;
  extendSemantics(superSemantics: WitSemantics): WitSemantics;
}

declare const grammar: WitGrammar;
export default grammar;

