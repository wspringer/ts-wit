// Base types
export interface Node {
  kind: string;
  location: {
    start: number;
    end: number;
  };
}

export function isNode(node: unknown): node is Node {
  return typeof node === "object" && node !== null && node !== undefined && "kind" in node && "location" in node;
}

// Top level structures
export interface File extends Node {
  kind: "file";
  package?: PackageDecl;
  items: (PackageItem | NestedPackageDefinition)[];
}

export interface PackageDecl extends Node {
  kind: "package";
  name: string;
  version?: string;
}

export interface NestedPackageDefinition extends Node {
  kind: "nestedPackage";
  package: PackageDecl;
  items: PackageItem[];
}

export type PackageItem = ToplevelUseItem | InterfaceItem | WorldItem;

// Use-related types
export interface ToplevelUseItem extends Node {
  kind: "use";
  path: UsePath;
  alias?: string;
}

export type UsePath = BareUsePath | QualifiedUsePath;

export interface BareUsePath extends Node {
  kind: "bareUsePath";
  path: string;
}

export interface QualifiedUsePath extends Node {
  kind: "qualifiedUsePath";
  segments: string[];
  version?: string;
}

export interface UseItem extends Node {
  kind: "use";
  path: UsePath;
  names: UseNamesList;
  gate?: Gate;
}

export interface UseNamesList extends Node {
  kind: "useNames";
  names: UseNamesItem[];
}

export interface UseNamesItem extends Node {
  kind: "useName";
  name: string;
  alias?: string;
}

// Interface-related types
export interface InterfaceItem extends Node {
  kind: "interface";
  name: string;
  items: InterfaceItemElement[];
}

export type InterfaceItemElement = TypedefItem | UseItem | FuncItem;

// Type definitions
export interface TypedefItem extends Node {
  kind: "typedef";
  item:
    | TypeItem
    | RecordItem
    | EnumItem
    | VariantItem
    | FlagsItem
    | ResourceItem;
  gate?: Gate;
}

export interface TypeItem extends Node {
  kind: "type";
  name: string;
  type: TypeRef;
}

export interface RecordItem extends Node {
  kind: "record";
  name: string;
  fields: RecordField[];
}

export interface RecordField extends Node {
  kind: "field";
  name: string;
  type: TypeRef;
}

export interface EnumItem extends Node {
  kind: "enum";
  name: string;
  cases: string[];
}

export interface VariantItem extends Node {
  kind: "variant";
  name: string;
  cases: VariantCase[];
}

export interface VariantCase extends Node {
  kind: "case";
  name: string;
  type?: TypeRef;
}

export interface FlagsItem extends Node {
  kind: "flags";
  name: string;
  flags: string[];
}

export interface FuncItem extends Node {
  kind: "func";
  name: string;
  type: FuncType;
  gate?: Gate;
}

export interface FuncType extends Node {
  kind: "funcType";
  async: boolean;
  params: NamedType[];
  result?: TypeRef;
}

export interface ParamList extends Node {
  kind: "paramList";
  params: NamedType[];
}

export interface NamedType extends Node {
  kind: "namedType";
  name: string;
  type: TypeRef;
}

export interface NamedTypeList extends Node {
  kind: "namedTypeList";
  items: NamedType[];
}

// Type references
export interface TypeRef extends Node {
  kind: "typeRef";
  type: SimpleType | ResultType | TupleType | OptionType | ListType | RefType;
}

export interface SimpleType extends Node {
  kind: "simple";
  name: string;
}

export interface ResultType extends Node {
  kind: "result";
  ok?: TypeRef;
  error?: TypeRef;
}

export interface TupleType extends Node {
  kind: "tuple";
  types: TypeRef[];
}

export interface OptionType extends Node {
  kind: "option";
  type: TypeRef;
}

export interface ListType extends Node {
  kind: "list";
  type: TypeRef;
}

export interface RefType extends Node {
  kind: "ref";
  name: string;
}

// World-related types
export interface WorldItem extends Node {
  kind: "world";
  name: string;
  items: WorldItemElement[];
  gate?: Gate;
}

export type WorldItemElement =
  | ExportItem
  | ImportItem
  | UseItem
  | TypedefItem
  | IncludeItem;

// Export/Import types
export interface ExportItem extends Node {
  kind: "export";
  item: ExternTypeExport | UsePathExport;
  gate?: Gate;
}

export interface ImportItem extends Node {
  kind: "import";
  item: ExternTypeImport | UsePathImport;
  gate?: Gate;
}

export interface ExternTypeExport extends Node {
  kind: "externTypeExport";
  name: string;
  type: ExternType;
}

export interface ExternTypeImport extends Node {
  kind: "externTypeImport";
  name: string;
  type: ExternType;
}

export interface UsePathImport extends Node {
  kind: "usePathImport";
  path: UsePath;
}

export type ExternType = ExternFuncType | ExternInterfaceType;

export interface ExternFuncType extends Node {
  kind: "externFunc";
  type: FuncType;
}

export interface ExternInterfaceType extends Node {
  kind: "externInterface";
  items: InterfaceItemElement[];
}

export interface UsePathExport extends Node {
  kind: "usePathExport";
  path: UsePath;
}

// Include types
export interface IncludeItem extends Node {
  kind: "include";
  path: UsePath;
  names?: IncludeNamesItem[];
  gate?: Gate;
}

export interface IncludeNamesItem extends Node {
  kind: "includeName";
  name: string;
  alias: string;
}

// Gate-related types
export interface Gate extends Node {
  kind: "gate";
  items: GateItem[];
}

export type GateItem = UnstableGate | SinceGate | DeprecatedGate;

export interface UnstableGate extends Node {
  kind: "unstableGate";
  feature: string;
}

export interface SinceGate extends Node {
  kind: "sinceGate";
  version: string;
}

export interface DeprecatedGate extends Node {
  kind: "deprecatedGate";
  version: string;
}

export interface VersionField extends Node {
  kind: "versionField";
  version: string;
}

export interface FeatureField extends Node {
  kind: "featureField";
  feature: string;
}

export interface ResourceItem extends Node {
  kind: "resource";
  name: string;
  methods: ResourceMethod[];
}

export type ResourceMethod =
  | ResourceMethodItem
  | ResourceStaticMethod
  | ResourceConstructor;

export interface ResourceMethodItem extends Node {
  kind: "resourceMethod";
  name: string;
  type: FuncType;
}

export interface ResourceStaticMethod extends Node {
  kind: "resourceStaticMethod";
  name: string;
  type: FuncType;
}

export interface ResourceConstructor extends Node {
  kind: "resourceConstructor";
  params: NamedType[];
}
