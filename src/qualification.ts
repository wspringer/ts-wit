import {
  Func,
  InterfaceDef,
  MetaOf,
  NestedPackage,
  TypeDef,
  Wit,
  World,
} from "./ast";
import { isInterfaceDef } from "./guards";

export type QualificationProps = {
  fqn: string;
};

export type Qualified = {
  TypeDef: QualificationProps;
  InterfaceDef: QualificationProps;
  NestedPackage: QualificationProps;
  Func: QualificationProps;
  World: QualificationProps;
};

export function qualify(wit: Wit): Wit<Qualified> {
  return {
    ...wit,
    interfaces: wit.interfaces.map((iface) =>
      qualifyInterfaceDef(wit.name || "", iface)
    ),
    worlds: wit.worlds.map((world) => qualifyWorld(wit.name || "", world)),
  } as Wit<Qualified>;
}

export function qualifyInterfaceDef(
  scope: string,
  iface: InterfaceDef
): InterfaceDef<Qualified> {
  const fqn = `${scope}/${iface.name}`;
  return {
    name: iface.name,
    functions: iface.functions.map((func) => qualifyFunc(fqn, func)),
    typeDefs: iface.typeDefs.map((typeDef) => qualifyTypeDef(fqn, typeDef)),
    fqn,
  };
}

export function qualifyTypeDef(
  scope: string,
  typeDef: TypeDef
): TypeDef<Qualified> {
  const fqn = `${scope}/${typeDef.name}`;
  return {
    ...typeDef,
    fqn,
  } as TypeDef<Qualified>;
}

export function qualifyNestedPackage(
  scope: string,
  pkg: NestedPackage
): NestedPackage<Qualified> {
  const fqn = `${scope}/${pkg.name}`;
  return {
    ...pkg,
    fqn,
    interfaces: pkg.interfaces.map((iface) => qualifyInterfaceDef(fqn, iface)),
  };
}

export function qualifyFunc(scope: string, func: Func): Func<Qualified> {
  return {
    ...func,
    fqn: `${scope}/${func.name}`,
  };
}

export function qualifyWorld(scope: string, world: World): World<Qualified> {
  const fqn = `${scope}/${world.name}`;
  return {
    ...world,
    typeDefs: world.typeDefs.map((typeDef) => qualifyTypeDef(fqn, typeDef)),
    exports: {
      functions: world.exports.functions.map((func) => qualifyFunc(fqn, func)),
      interfaces: world.exports.interfaces.map((iface) =>
        isInterfaceDef(iface) ? qualifyInterfaceDef(fqn, iface) : iface
      ),
    },
    imports: {
      functions: world.imports.functions.map((func) => qualifyFunc(fqn, func)),
      interfaces: world.exports.interfaces.map((iface) =>
        isInterfaceDef(iface) ? qualifyInterfaceDef(fqn, iface) : iface
      ),
    },
    fqn,
  } as World<Qualified>;
}
