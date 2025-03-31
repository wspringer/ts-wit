import { grammar } from "./grammar";

describe("Wit Grammar", () => {
  const matchTest = (input: string) => {
    const match = grammar.match(input);
    if (!match.succeeded()) {
      console.log("ERROR", match.message);
    }
    expect(match.succeeded()).toBe(true);
  };

  const failTest = (input: string) => {
    const match = grammar.match(input);
    expect(match.succeeded()).toBe(false);
  };

  test("basic package declaration", () => {
    matchTest("package test:example/path@1.0.0;");
    matchTest("package my-pkg:core/utils@2.3.4;");
    failTest("package invalid@1.0.0;"); // Missing package identifier format
  });

  test("interface definitions", () => {
    matchTest(`
      interface logger {
        log: func(message: string);
        debug: func(level: u32, message: string) -> boolean;
      }
    `);
  });

  test("world definitions", () => {
    matchTest(`
      world testing {
        export handler: func(msg: string);
        import logger: interface {
          log: func(msg: string);
        }
      }
    `);
  });

  test("type definitions", () => {
    matchTest(`
      interface types {
        type number = u32;
        type optional-string = option<string>;
        type result-type = result<string, u32>;
        type coordinates = tuple<s32, s32>;
        type string-list = list<string>;
      }
    `);
  });

  test("record definitions", () => {
    matchTest(`
      interface records {
        record point {
          x: s32,
          y: s32
        }
      }
    `);
  });

  test("variant definitions", () => {
    matchTest(`
      interface variants {
        variant result {
          ok(string),
          error
        }
      }
    `);
  });

  test("enum definitions", () => {
    matchTest(`
      interface enums {
        enum color {
          red,
          green,
          blue
        }
      }
    `);
  });

  test("flags definitions", () => {
    matchTest(`
      interface permissions {
        flags access {
          read,
          write,
          execute
        }
      }
    `);
  });

  test("gated definitions", () => {
    matchTest(`
      @unstable(feature = beta)
      @since(version = 1.2.3)
      interface gated {
        type test = string;
      }
    `);
  });

  test("use statements", () => {
    matchTest(`
      use other:pkg/name@1.0.0 as other;
      use local-pkg;
      use utils:core/string@2.0.0.{
        format,
        concat as string-concat
      }
    `);
  });
});
