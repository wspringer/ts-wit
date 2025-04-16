import { parseWit } from "./model.semantics";

describe("model.semantics", () => {
  it("should parse a package declaration", () => {
    const input = "package foo:bar@0.0.1;";
    expect(() => parseWit(input)).not.toThrow();
    const parsed = parseWit(input);
    expect(parsed).toMatchSnapshot();
  });

  it("should parse an interface declaration", () => {
    const input = `interface bar {
    }`;
    expect(() => parseWit(input)).not.toThrow();
    const parsed = parseWit(input);
    expect(parsed).toMatchSnapshot();
  });

  it("should parse an interface declaration with a parameterless function", () => {
    const input = `interface bar {
      method: func() -> string;
    }`;
    expect(() => parseWit(input)).not.toThrow();
    const parsed = parseWit(input);
    expect(parsed).toMatchSnapshot();
  });

  it("should parse an interface declaration with a parameterized function", () => {
    const input = `interface bar {
      method: func(a: string) -> string;
    }`;
    expect(() => parseWit(input)).not.toThrow();
    const parsed = parseWit(input);
    expect(parsed).toMatchSnapshot();
  });

  it("should parse an interface with a type alias", () => {
    const input = `interface bar {
      type foo = string;
    }`;
    expect(() => parseWit(input)).not.toThrow();
    const parsed = parseWit(input);
    expect(parsed).toMatchSnapshot();
  });

  it("should parse an interface with a type alias pointing to a list", () => {
    const input = `interface bar {
      type foo = list<string>;
    }`;
    expect(() => parseWit(input)).not.toThrow();
    const parsed = parseWit(input);
    expect(parsed).toMatchSnapshot();
  });

  it("should parse an interface with a type alias pointing to an option", () => {
    const input = `interface bar {
      type foo = option<string>;
    }`;
    expect(() => parseWit(input)).not.toThrow();
    const parsed = parseWit(input);
    expect(parsed).toMatchSnapshot();
  });

  it("should parse an interface with a type alias pointing to a result", () => {
    const input = `interface bar {
      type foo = result<string, string>;
    }`;
    expect(() => parseWit(input)).not.toThrow();
    const parsed = parseWit(input);
    expect(parsed).toMatchSnapshot();
  });

  it("should parse an interface with a type alias pointing to a tuple", () => {
    const input = `interface bar {
      type foo = tuple<string, s16>;
    }`;
    expect(() => parseWit(input)).not.toThrow();
    const parsed = parseWit(input);
    expect(parsed).toMatchSnapshot();
  });

  it("should parse an interface with an enum", () => {
    const input = `interface bar {
      enum foo {
        A,
        B,
        C,
      }
    }`;
    expect(() => parseWit(input)).not.toThrow();
    const parsed = parseWit(input);
    expect(parsed).toMatchSnapshot();
  });

  it("should parse an interface with a variant", () => {
    const input = `interface bar {
      variant foo {
        A(string),
        B,
        C,
      }
    }`;
    expect(() => parseWit(input)).not.toThrow();
    const parsed = parseWit(input);
    expect(parsed).toMatchSnapshot();
  });

  it("should parse a record", () => {
    const input = `interface bar {
      record foo {
        a: string,
        b: int,
      }
    }`;
    expect(() => parseWit(input)).not.toThrow();
    const parsed = parseWit(input);
    expect(parsed).toMatchSnapshot();
  });

  it("should parse flags", () => {
    const input = `interface bar {
      flags foo {
        A, B, C
      }
    }`;
    expect(() => parseWit(input)).not.toThrow();
    const parsed = parseWit(input);
    expect(parsed).toMatchSnapshot();
  });

  it("should parse nested packages", () => {
    const input = `
    package foo:bar@0.0.1 {
      interface baz {
        method: func() -> string;
      }
    }
    `;
    expect(() => parseWit(input)).not.toThrow();
    const parsed = parseWit(input);
    expect(parsed).toMatchSnapshot();
  });

  it("should parse a world", () => {
    const input = `
    world foo {
    }
    `;
    expect(() => parseWit(input)).not.toThrow();
    const parsed = parseWit(input);
    expect(parsed).toMatchSnapshot();
  });

  it("should parse a world with an exported function", () => {
    const input = `
    world foo {
      export bar: func() -> string;
    }
    `;
    expect(() => parseWit(input)).not.toThrow();
    const parsed = parseWit(input);
    expect(parsed).toMatchSnapshot();
  });

  it("should parse a world with an exported interface", () => {
    const input = `
    world foo {
      export bar: interface {}
    }
    `;
    const parsed = parseWit(input);
    expect(parsed).toMatchSnapshot();
  });

  it("should parse a world with an interface with members ", () => {
    const input = `
    world foo {
      export bar: interface {
        method: func() -> string;
      }
    }
    `;
    const parsed = parseWit(input);
    expect(parsed).toMatchSnapshot();
  });
});
