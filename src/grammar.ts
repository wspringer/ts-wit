import * as ohm from "ohm-js";

export const grammar = ohm.grammar(String.raw`
Wit {
  File
    = (PackageDecl ";")? (PackageItem | NestedPackageDefinition)*

  PackageDecl
    = "package" packageIdentifier

  NestedPackageDefinition = PackageDecl "{" PackageItem* "}"

  PackageItem = ToplevelUseItem | InterfaceItem | WorldItem

  WorldItem = Gate "world" ident "{" WorldItems* "}"

  WorldItems = Gate WorldDefinition

  WorldDefinition = ExportItem | ImportItem | UseItem | TypedefItem | IncludeItem

  ExportItem = ExportItemExternType | ExportItemUsePath

  ExportItemExternType = "export" ident ":" ExternType

  ExportItemUsePath = "export" UsePath ";"

  ImportItem = ImportItemExternType | ImportItemUsePath

  ImportItemExternType = "import" ident ":" ExternType

  ImportItemUsePath = "import" UsePath ";"

  IncludeItem =
  	  "include" UsePath ";"                                 -- simple
    | "include" UsePath "with" "{" IncludeNamesList "}"     -- aliased

  IncludeNamesList = IncludeNamesItem ("," IncludeNamesItem)*

  IncludeNamesItem = ident "as" ident

  UseItem = "use" UsePath "." "{" UseNamesList "}"

  UseNamesList =
  	UseNamesItem ("," UseNamesItem)*

  UseNamesItem = ident ("as" ident)?

  ExternType =
	  ExternTypeFunc
    | ExternTypeInterface

  ExternTypeFunc = FuncType ";"

  ExternTypeInterface = "interface" "{" InterfaceItems* "}"

  ToplevelUseItem = "use" UsePath ("as" ident)? ";"

  UsePath = QualifiedUsePath | BareUsePath

  BareUsePath = ident

  QualifiedUsePath = packageIdentifier

  InterfaceItem
    = "interface" ident "{" InterfaceItems* "}"

  InterfaceItems = Gate InterfaceDefinition

  InterfaceDefinition = TypedefItem | UseItem | FuncItem

  TypedefItem = TypeItem | RecordItem | EnumItem | VariantItem | FlagsItems | FuncItem

  Gate
    = GateItem*

  GateItem =
  	UnstableGate | SinceGate| DeprecatedGate

  UnstableGate = "@unstable" "(" FeatureField ")"

  SinceGate = "@since" "(" VersionField ")"

  DeprecatedGate = "@deprecated" "(" VersionField ")"

  FeatureField = "feature" "=" ident

  VersionField = "version" "=" version

  FlagsItems
    = "flags" ident "{" FlagsFields "}"

  FlagsFields = FlagsField ("," FlagsField)*

  FlagsField = ident

  TypeItem
    = "type" ident "=" TypeRef ";"

  VariantItem
    = "variant" ident "{" VariantCases "}"

  VariantCases
  	= VariantCase ("," VariantCase)*

  VariantCase
    = ident ("(" TypeRef ")")?

  EnumItem
    = "enum" ident "{" EnumCases "}"

  EnumCases
  	= EnumCase ("," EnumCase)*

  EnumCase
    = ident

  RecordItem
    = "record" ident "{" RecordFields "}"

  RecordFields
  	= RecordField ("," RecordField)*

  RecordField
    = ident ":" TypeRef

  ResourceItem
  	= "resource" ident "{" "}"

  FuncItem = ident ":" FuncType ";"

  FuncType = "async"? "func" ParamList ResultList?

  ParamList = "(" NamedTypeList? ")"

  NamedTypeList = NamedType ("," NamedType)*

  NamedType = ident ":" TypeRef

  ResultList = "->" TypeRef

  TypeRef
  	= SimpleType | ResultType | TupleType | OptionType | ListType

  ResultType = "result<" TypeRef ("," TypeRef)? ">"

  TupleType = "tuple<" TypeRef ("," TypeRef)* ">"

  OptionType = "option<" TypeRef ">"

  ListType = "list<" TypeRef ">"

  SimpleType
  	= "s8" | "s16" | "s32" | "s64" |
      "u8" | "u16" | "u32" | "u64" |
      "f8" | "f16" | "f32" | "f64" |
      "boolean" | "string" | "stream"

  packageIdentifier
  	= (ident ":")+ package ("@" version)?

  version
    = (digit+) "." (digit+) "." (digit+)

  package
  	= ident ("/" ident)*

  ident
    = (lower+) ("-" lower*)*

}
  `.trim());
