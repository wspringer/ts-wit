import { Resolver } from "./resolver";
import {
  WITType,
  EnumType,
  RecordType,
  VariantType,
  FlagsType,
  TypeAlias,
} from "./types";

describe("Resolver", () => {
  const resolver = new Resolver();

  test("resolves enum types", () => {
    const types = resolver.resolve(`
      interface test {
        enum color {
          red,
          green,
          blue
        }
      }
    `);

    const colorType = types.get("test.color") as EnumType;
    expect(colorType).toBeDefined();
    expect(colorType.kind).toBe("enum");
    expect(colorType.cases).toEqual(["red", "green", "blue"]);
  });

  test("resolves record types", () => {
    const types = resolver.resolve(`
      interface test {
        record point {
          x: s32,
          y: s32
        }
      }
    `);

    const pointType = types.get("test.point") as RecordType;
    expect(pointType).toBeDefined();
    expect(pointType.kind).toBe("record");
    expect(pointType.fields).toHaveLength(2);
    expect(pointType.fields[0].name).toBe("x");
    expect(pointType.fields[0].type).toEqual({ kind: "simple", name: "s32" });
  });

  test("resolves variant types", () => {
    const types = resolver.resolve(`
      interface test {
        variant result {
          ok(string),
          error
        }
      }
    `);

    const resultType = types.get("test.result") as VariantType;
    expect(resultType).toBeDefined();
    expect(resultType.kind).toBe("variant");
    expect(resultType.cases).toHaveLength(2);
    expect(resultType.cases[0].name).toBe("ok");
    expect(resultType.cases[0].type).toEqual({
      kind: "simple",
      name: "string",
    });
    expect(resultType.cases[1].name).toBe("error");
    expect(resultType.cases[1].type).toBeUndefined();
  });

  test("resolves flags types", () => {
    const types = resolver.resolve(`
      interface test {
        flags permissions {
          read,
          write,
          execute
        }
      }
    `);

    const permissionsType = types.get("test.permissions") as FlagsType;
    expect(permissionsType).toBeDefined();
    expect(permissionsType.kind).toBe("flags");
    expect(permissionsType.flags).toEqual(["read", "write", "execute"]);
  });

  test("resolves type aliases", () => {
    const types = resolver.resolve(`
      interface test {
        type number = u32;
        type optional-string = option<string>;
        type result-type = result<string, u32>;
      }
    `);

    const numberType = types.get("test.number") as TypeAlias;
    expect(numberType).toBeDefined();
    expect(numberType.kind).toBe("type");
    expect(numberType.type).toEqual({ kind: "simple", name: "u32" });

    const optionalStringType = types.get("test.optional-string") as TypeAlias;
    expect(optionalStringType).toBeDefined();
    expect(optionalStringType.type).toEqual({
      kind: "option",
      type: { kind: "simple", name: "string" },
    });

    const resultType = types.get("test.result-type") as TypeAlias;
    expect(resultType).toBeDefined();
    expect(resultType.type).toEqual({
      kind: "result",
      ok: { kind: "simple", name: "string" },
      error: { kind: "simple", name: "u32" },
    });
  });

  test("resolves complex nested types", () => {
    const types = resolver.resolve(`
      interface test {
        record complex {
          numbers: list<u32>,
          points: list<tuple<s32, s32>>,
          result: result<option<string>, u32>
        }
      }
    `);

    const complexType = types.get("test.complex") as RecordType;
    expect(complexType).toBeDefined();
    expect(complexType.fields).toHaveLength(3);

    const numbersField = complexType.fields[0];
    expect(numbersField.type).toEqual({
      kind: "list",
      type: { kind: "simple", name: "u32" },
    });

    const pointsField = complexType.fields[1];
    expect(pointsField.type).toEqual({
      kind: "list",
      type: {
        kind: "tuple",
        types: [
          { kind: "simple", name: "s32" },
          { kind: "simple", name: "s32" },
        ],
      },
    });

    const resultField = complexType.fields[2];
    expect(resultField.type).toEqual({
      kind: "result",
      ok: {
        kind: "option",
        type: { kind: "simple", name: "string" },
      },
      error: { kind: "simple", name: "u32" },
    });
  });

  test("resolves function using record type", () => {
    const types = resolver.resolve(`
      interface test {
        record point {
          x: s32,
          y: s32
        }

        add-points: func(a: point, b: point) -> point;
      }
    `);

    const pointType = types.get("test.point") as RecordType;
    expect(pointType).toBeDefined();
    expect(pointType.kind).toBe("record");
    expect(pointType.fields).toHaveLength(2);
    expect(pointType.fields[0].name).toBe("x");
    expect(pointType.fields[0].type).toEqual({ kind: "simple", name: "s32" });
    expect(pointType.fields[1].name).toBe("y");
    expect(pointType.fields[1].type).toEqual({ kind: "simple", name: "s32" });

    // TODO: Once function resolution is implemented, add assertions for the function
    // const addPointsFunc = types.get("test.add-points") as FunctionType;
    // expect(addPointsFunc).toBeDefined();
    // expect(addPointsFunc.kind).toBe("function");
    // expect(addPointsFunc.params).toHaveLength(2);
    // expect(addPointsFunc.params[0].type).toEqual({ kind: "simple", name: "test.point" });
    // expect(addPointsFunc.params[1].type).toEqual({ kind: "simple", name: "test.point" });
    // expect(addPointsFunc.returnType).toEqual({ kind: "simple", name: "test.point" });
  });
});
