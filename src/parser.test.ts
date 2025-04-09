import { parseWit } from "./parser";
import {
  InterfaceItem,
  FuncItem,
  SimpleType,
  InterfaceItemElement,
  TypeRef,
  TypedefItem,
  TypeItem,
  EnumItem,
  VariantItem,
  RecordItem,
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

    expect(ast.items[0].kind).toBe("interface");
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

  it("should parse an interface with an enum definition", () => {
    const input = `
      package my-package:fii;

      interface colors {
        enum color { red, green, blue }
      }
    `;

    const ast = parseWit(input);

    expect(ast.kind).toBe("file");
    expect(ast.package?.name).toBe("my-package:fii");
    expect(ast.items).toHaveLength(1);

    expect(ast.items[0].kind).toBe("interface");
    const interfaceItem = ast.items[0] as InterfaceItem;
    expect(interfaceItem.kind).toBe("interface");
    expect(interfaceItem.name).toBe("colors");
    expect(interfaceItem.items).toHaveLength(1);

    const typeItem = interfaceItem.items[0];
    expect(typeItem.kind).toBe("typedef");
    if (isTypedefItem(typeItem)) {
      expect(typeItem.item.kind).toBe("enum");
      const enumItem = typeItem.item as EnumItem;
      expect(enumItem.name).toBe("color");
      expect(enumItem.cases).toEqual(["red", "green", "blue"]);
    }
  });

  it("should parse an interface with a variant definition", () => {
    const input = `
      interface result {
        variant result {
          ok(string),
          error
        }
      }
    `;

    const ast = parseWit(input);

    expect(ast.kind).toBe("file");
    expect(ast.items).toHaveLength(1);

    expect(ast.items[0].kind).toBe("interface");
    const interfaceItem = ast.items[0] as InterfaceItem;
    expect(interfaceItem.kind).toBe("interface");
    expect(interfaceItem.name).toBe("result");
    expect(interfaceItem.items).toHaveLength(1);

    const typeItem = interfaceItem.items[0];
    expect(typeItem.kind).toBe("typedef");
    if (isTypedefItem(typeItem)) {
      expect(typeItem.item.kind).toBe("variant");
      const variantItem = typeItem.item as VariantItem;
      expect(variantItem.name).toBe("result");
      expect(variantItem.cases).toHaveLength(2);

      const okCase = variantItem.cases[0];
      expect(okCase.name).toBe("ok");
      expect(okCase.type).toBeDefined();
      if (okCase.type) {
        expect(okCase.type.kind).toBe("typeRef");
        expect(isSimpleTypeRef(okCase.type)).toBe(true);
        if (isSimpleTypeRef(okCase.type)) {
          expect(okCase.type.type.name).toBe("string");
        }
      }

      const errorCase = variantItem.cases[1];
      expect(errorCase.name).toBe("error");
      expect(errorCase.type).toBeUndefined();
    }
  });

  it("should parse an interface with a record definition", () => {
    const input = `
      interface point {
        record point {
          x: f32,
          y: f32
        }
      }
    `;

    const ast = parseWit(input);

    expect(ast.kind).toBe("file");
    expect(ast.items).toHaveLength(1);

    expect(ast.items[0].kind).toBe("interface");
    const interfaceItem = ast.items[0] as InterfaceItem;
    expect(interfaceItem.kind).toBe("interface");
    expect(interfaceItem.name).toBe("point");
    expect(interfaceItem.items).toHaveLength(1);

    const typeItem = interfaceItem.items[0];
    expect(typeItem.kind).toBe("typedef");
    if (isTypedefItem(typeItem)) {
      expect(typeItem.item.kind).toBe("record");
      const recordItem = typeItem.item as RecordItem;
      expect(recordItem.name).toBe("point");
      expect(recordItem.fields).toHaveLength(2);

      const xField = recordItem.fields[0];
      expect(xField.name).toBe("x");
      expect(xField.type.kind).toBe("typeRef");
      expect(isSimpleTypeRef(xField.type)).toBe(true);
      if (isSimpleTypeRef(xField.type)) {
        expect(xField.type.type.name).toBe("f32");
      }

      const yField = recordItem.fields[1];
      expect(yField.name).toBe("y");
      expect(yField.type.kind).toBe("typeRef");
      expect(isSimpleTypeRef(yField.type)).toBe(true);
      if (isSimpleTypeRef(yField.type)) {
        expect(yField.type.type.name).toBe("f32");
      }
    }
  });
});
