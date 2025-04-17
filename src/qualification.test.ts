import { parseWit } from "./parser";
import { qualify } from "./qualification";
describe("qualification", () => {
  it("should qualify a Wit", () => {
    const wit = parseWit(`
      package foo:bar@1.0.0;

      world ranger {
        export sky: interface {
          type weird = string;
        }
        import limit: interface {
          resolve: func() -> result<string, string>;
        }
      }

      interface foo {
        type weird = string;
      }
    `);

    const qualified = qualify(wit);
    expect(qualified).toMatchSnapshot();
  });
});
