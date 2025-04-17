<!--
  -- This file is auto-generated from README.js.md. Changes should be made there.
  -->

# README

This is a WIT parser built in TypeScript directly. It was built largely on the
specification found
[here](https://github.com/WebAssembly/component-model/blob/main/design/mvp/WIT.md).

This is all very much work in progress, and there's a fair chance I will never
finish it at all. If you're looking for a **serious** WIT parser, then you should
probably take a look at the [wit-parser](https://crates.io/crates/wit-parser)
crate. This NPM module is far from complete. You have been warned.

## How to use it

You import the `parseWit` function.

```javascript
import { parseWit } from "ts-wit";
```

You call `parseWit` on the WIT file.ß

```javascript
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

You will get a TypeScript representaton of the structure defined by the WIT
file.

```javascript
parseWit(wit); // ⇨
// {
//   name: 'local:crypto',
//   uses: [],
//   packages: [],
//   interfaces: [
//     {
//       name: 'algorithm',
//       functions: [
//         {
//           name: 'encrypt',
//           params: [ { name: 'in', type: 'string' } ],
//           result: { kind: 'result', ok: 'encrypted', error: 'error' }
//         },
//         {
//           name: 'decrypt',
//           params: [ { name: 'in', type: 'encrypted' } ],
//           result: { kind: 'result', ok: 'string', error: 'error' }
//         }
//       ],
//       typeDefs: [
//         { kind: 'alias', name: 'encrypted', type: 'string' },
//         { kind: 'enum', name: 'error', cases: [ 'unknown', 'invalid-input', 'expired' ] }
//       ]
//     }
//   ],
//   worlds: [
//     {
//       name: 'simple-encryption',
//       exports: { functions: [], interfaces: [ { ref: 'algorithm' } ] },
//       imports: { functions: [], interfaces: [] },
//       includes: [],
//       typeDefs: []
//     }
//   ]
// }
```
