import { parseWit } from "./parser";

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

  it("should parse a world with an imported function", () => {
    const input = `
    world foo {
      import bar: func() -> string;
    }
    `;
    const parsed = parseWit(input);
    expect(parsed).toMatchSnapshot();
  });

  it("should parse a world with an imported interface", () => {
    const input = `
    world foo {
      import bar: interface {}
    }
    `;
    const parsed = parseWit(input);
    expect(parsed).toMatchSnapshot();
  });

  it("should parse top level use statements", () => {
    const input = `
    use foo:bar@0.0.1;
    `;
    const parsed = parseWit(input);
    expect(parsed).toMatchSnapshot();
  });

  it("should parse top level use statements with an alias", () => {
    const input = `
    use foo:bar@0.0.1 as baz;
    `;
    const parsed = parseWit(input);
    expect(parsed).toMatchSnapshot();
  });

  it("should parse include statements", () => {
    const input = `
    world foo {
      include foo:bar@0.0.1;
    }
  `;
    const parsed = parseWit(input);
    expect(parsed).toMatchSnapshot();
  });

  it("should parse include statements with aliases", () => {
    const input = `
    world foo {
      include foo:bar@0.0.1 with { baz as qux }
    }
    `;
    const parsed = parseWit(input);
    expect(parsed).toMatchSnapshot();
  });

  it("should parse type defs in a world", () => {
    const input = `
    world foo {
      type bar = string;
    }
    `;
    const parsed = parseWit(input);
    expect(parsed).toMatchSnapshot();
  });

  it("should parse gates in a world", () => {
    const input = `
    @unstable(feature=jazz) world foo {
    }
    `;
    const parsed = parseWit(input);
    expect(parsed).toMatchSnapshot();
  });

  it("should parse since gates in a world", () => {
    const input = `
    @since(version=1.0.0) world foo {
    }
    `;
    const parsed = parseWit(input);
    expect(parsed).toMatchSnapshot();
  });

  it("should parse deprecated gates in a world", () => {
    const input = `
    @deprecated(version=1.0.0) world foo {
    }
    `;
    const parsed = parseWit(input);
    expect(parsed).toMatchSnapshot();
  });

  it("should parse gates on interfaces", () => {
    const input = `
    @unstable(feature=jazz) interface bar {
    }`;
    const parsed = parseWit(input);
    expect(parsed).toMatchSnapshot();
  });

  it("should parse gates on interfaces with members", () => {
    const input = `
    interface bar {
      @unstable(feature=jazz) method: func() -> string;
    }`;
    const parsed = parseWit(input);
    expect(parsed).toMatchSnapshot();
  });

  it("should parse gates on functions of interfaces exported from a world", () => {
    const input = `
    world foo {
      export bar: interface {
        @unstable(feature=jazz) method: func() -> string;
      }
    }
    `;
    const parsed = parseWit(input);
    expect(parsed).toMatchSnapshot();
  });

  it("should parse resources", () => {
    const input = `
    interface bar {
      resource foo {
        method: func() -> string;
        test: static func() -> string;
      }
    }
    `;
    const parsed = parseWit(input);
    expect(parsed).toMatchSnapshot();
  });

  it("should parse resources with a constructor", () => {
    const input = `
    interface bar {
      resource foo {
        method: func() -> string;
        test: static func(a: string) -> string;
        constructor(a: string, b: int);
      }
    }
    `;
    const parsed = parseWit(input);
    expect(parsed).toMatchSnapshot();
  });

  it("should parse export statements", () => {
    const input = `world foo {
      export bar;
    }`;
    const parsed = parseWit(input);
    expect(parsed).toMatchSnapshot();
  });

  it("should parse a typeref", () => {
    const input = `interface bar {
      type foo = string;
      type bnd = list<option<foo>>;
    }`;
    const parsed = parseWit(input);
    expect(parsed).toMatchSnapshot();
  });
});
