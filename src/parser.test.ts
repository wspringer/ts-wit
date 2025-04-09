import { parseWit } from "./parser";
import {
  InterfaceItem,
  FuncItem,
  SimpleType,
  InterfaceItemElement,
  TypeRef,
  TypedefItem,
  TypeItem,
} from "./types";

function isTypedefItem(item: InterfaceItemElement): item is TypedefItem {
  return item.kind === "typedef";
}

function isFuncItem(item: InterfaceItemElement): item is FuncItem {
  return item.kind === "func";
}

function isTypeItem(item: TypedefItem["item"]): item is TypeItem {
  return item.kind === "type";
}

function isSimpleTypeRef(
  type: TypeRef
): type is TypeRef & { type: SimpleType } {
  return type.type.kind === "simple";
}

describe("parseWit", () => {
  it("should parse a simple WIT file", () => {
    const input = `
      package my-package:fii;
    `;

    const ast = parseWit(input);

    expect(ast.kind).toBe("file");
    expect(ast.package?.name).toBe("my-package:fii");
    expect(ast.items).toHaveLength(0);
  });

  it("should throw an error for invalid WIT", () => {
    const input = "invalid wit content";

    expect(() => parseWit(input)).toThrow("Failed to parse WIT");
  });

  it("should parse an interface with a type definition", () => {
    const input = `
      package my-package:fii;

      interface greet {
        type name = string;
        greet: func(name: string) -> string;
      }
    `;

    const ast = parseWit(input);

    expect(ast.kind).toBe("file");
    expect(ast.package?.name).toBe("my-package:fii");
    expect(ast.items).toHaveLength(1);

    const interfaceItem = ast.items[0] as InterfaceItem;
    expect(interfaceItem.kind).toBe("interface");
    expect(interfaceItem.name).toBe("greet");
    expect(interfaceItem.items).toHaveLength(2);

    const typeItem = interfaceItem.items[0];
    expect(typeItem.kind).toBe("typedef");
    if (isTypedefItem(typeItem) && isTypeItem(typeItem.item)) {
      expect(typeItem.item.name).toBe("name");
      expect(typeItem.item.type.kind).toBe("typeRef");
      expect(isSimpleTypeRef(typeItem.item.type)).toBe(true);
      if (isSimpleTypeRef(typeItem.item.type)) {
        expect(typeItem.item.type.type.name).toBe("string");
      }
    }

    const funcItem = interfaceItem.items[1];
    expect(funcItem.kind).toBe("func");
    expect(isFuncItem(funcItem)).toBe(true);
    if (isFuncItem(funcItem)) {
      expect(funcItem.name).toBe("greet");
      expect(funcItem.type.kind).toBe("funcType");
      expect(funcItem.type.params).toHaveLength(1);
      expect(funcItem.type.params[0].name).toBe("name");
      const paramType = funcItem.type.params[0].type;
      expect(paramType.kind).toBe("typeRef");
      expect(isSimpleTypeRef(paramType)).toBe(true);
      if (isSimpleTypeRef(paramType)) {
        expect(paramType.type.name).toBe("string");
      }
      const resultType = funcItem.type.result;
      if (resultType) {
        expect(resultType.kind).toBe("typeRef");
        expect(isSimpleTypeRef(resultType)).toBe(true);
        if (isSimpleTypeRef(resultType)) {
          expect(resultType.type.name).toBe("string");
        }
      }
    }
  });
});
