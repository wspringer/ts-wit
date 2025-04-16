import {
  isAliasDef,
  isEnumDef,
  isVariantDef,
  isRecordDef,
  isTypeRef,
  isSimpleType,
  isOptionType,
  isListType,
  isResultType,
  isTupleType,
} from "./guards";
import { AliasDef, Ty, TypeDef } from "./ast";

describe("Type Guards", () => {
  describe("TypeDef Guards", () => {
    test("isAliasDef", () => {
      const aliasDef: TypeDef = {
        kind: "alias",
        name: "MyAlias",
        type: "string",
      };
      expect(isAliasDef(aliasDef)).toBe(true);
      expect(isAliasDef({ kind: "enum", name: "MyEnum", cases: [] })).toBe(
        false
      );
    });

    test("isEnumDef", () => {
      const enumDef: TypeDef = {
        kind: "enum",
        name: "MyEnum",
        cases: ["A", "B"],
      };
      expect(isEnumDef(enumDef)).toBe(true);
      expect(
        isEnumDef({ kind: "alias", name: "MyAlias", type: "string" })
      ).toBe(false);
    });

    test("isVariantDef", () => {
      const variantDef: TypeDef = {
        kind: "variant",
        name: "MyVariant",
        cases: [{ name: "A" }],
      };
      expect(isVariantDef(variantDef)).toBe(true);
      expect(isVariantDef({ kind: "enum", name: "MyEnum", cases: [] })).toBe(
        false
      );
    });

    test("isRecordDef", () => {
      const recordDef: TypeDef = {
        kind: "record",
        name: "MyRecord",
        fields: [],
      };
      expect(isRecordDef(recordDef)).toBe(true);
      expect(
        isRecordDef({ kind: "alias", name: "MyAlias", type: "string" })
      ).toBe(false);
    });
  });

  describe("Ty Guards", () => {
    test("isTypeRef", () => {
      const typeRef = { name: "MyType" };
      expect(isTypeRef(typeRef)).toBe(true);
      expect(isTypeRef("string")).toBe(false);
      expect(isTypeRef({ kind: "option", type: "string" })).toBe(false);
    });

    test("isSimpleType", () => {
      expect(isSimpleType("string")).toBe(true);
      expect(isSimpleType("s8")).toBe(true);
      expect(isSimpleType("u32")).toBe(true);
      expect(isSimpleType("f64")).toBe(true);
      expect(isSimpleType("bool")).toBe(true);
      expect(isSimpleType("char")).toBe(true);
      expect(
        isSimpleType({
          kind: "list",
          type: "string",
        })
      ).toBe(false);
      expect(isSimpleType({ name: "MyType" })).toBe(false);
    });

    test("isOptionType", () => {
      const optionType: Ty = { kind: "option", type: "string" };
      expect(isOptionType(optionType)).toBe(true);
      expect(isOptionType("string")).toBe(false);
      expect(isOptionType({ name: "MyType" })).toBe(false);
    });

    test("isListType", () => {
      const listType: Ty = { kind: "list", type: "string" };
      expect(isListType(listType)).toBe(true);
      expect(isListType("string")).toBe(false);
      expect(isListType({ name: "MyType" })).toBe(false);
    });

    test("isResultType", () => {
      const resultType: Ty = { kind: "result", ok: "string", error: "string" };
      expect(isResultType(resultType)).toBe(true);
      expect(isResultType("string")).toBe(false);
      expect(isResultType({ name: "MyType" })).toBe(false);
    });

    test("isTupleType", () => {
      const tupleType: Ty = { kind: "tuple", items: ["string", "u16"] };
      expect(isTupleType(tupleType)).toBe(true);
      expect(isTupleType("string")).toBe(false);
      expect(isTupleType({ name: "MyType" })).toBe(false);
      expect(isTupleType({ kind: "option", type: "string" })).toBe(false);
    });
  });
});
