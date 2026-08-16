## Layout Equality Smoke Test

```bash
npm run layoutEquality -- '<glob>'
```

Example for all JSON graphs in the sibling `elk-models` checkout:

```bash
npm run layoutEquality -- '../elk-models/**/*.json'
```

## What It Compares

For each input graph, the script runs three implementations:

1. `elk` in Java
2. local `elkjs` GWT build from `lib/main.js`
3. local `elkjs` Wasm build from `lib/wasm-node.mjs`

It then compares the resulting layout JSON pairwise:

1. `elk` vs `elkjs` GWT
2. `elk` vs `elkjs` Wasm
3. `elkjs` GWT vs `elkjs` Wasm

The comparison currently checks:

- node positions
- port positions
- edge section start points
- edge section end points
- edge bend points
