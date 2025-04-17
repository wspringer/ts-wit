# README

This is a WIT parser built in TypeScript directly. It was built largely on the
specification found
[here](https://github.com/WebAssembly/component-model/blob/main/design/mvp/WIT.md).

## Caution

This is all very much work in progress, and there's a fair chance I will never
finish it at all. If you're looking for a **serious** WIT parser, then you should
probably take a look at the [wit-parser](https://crates.io/crates/wit-parser)
crate. This NPM module is far from complete. You have been warned.

## How to use it

```javascript --run std --hide
const { parseWit } = require("./dist/index.js");
```

You import the `parseWit` function.

```javascript
import { parseWit } from "ts-wit";
```

You call `parseWit` on the WIT file.ß

```javascript --run std
const wit = `
package local:crypto;

interface algorithm {
  type encrypted = string;
  enum error {
    unknown,
    invalid-input,
    expired,
  }
  encrypt: func(in: string) -> result<encrypted, error>;
  decrypt: func(in: encrypted) -> result<string, error>;
}

world simple-encryption {
  export algorithm;
}`;
```

You will get a TypeScript model of the structure defined by the WIT file. Think
of it as an AST with some extra properties.

```javascript --run std
parseWit(wit); //RESULT
```

The type structure might be a bit cryptic, but it's defined [here](src/ast.ts).
