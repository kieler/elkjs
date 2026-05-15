import { useEffect, useState } from "react";
import { createELK } from "elkjs/wasm";

const graph = {
  id: "root",
  layoutOptions: { "elk.algorithm": "layered" },
  children: [
    { id: "n1", width: 30, height: 30 },
    { id: "n2", width: 30, height: 30 },
    { id: "n3", width: 30, height: 30 },
  ],
  edges: [
    { id: "e1", sources: ["n1"], targets: ["n2"] },
    { id: "e2", sources: ["n1"], targets: ["n3"] },
  ],
};

export default function App() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    let cancelled = false;

    createELK()
      .then((elk) => elk.layout(structuredClone(graph)))
      .then((layout) => {
        if (!cancelled) {
          setResult({
            width: layout.width,
            height: layout.height,
            children: layout.children ? layout.children.length : 0,
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return <pre>{JSON.stringify(result, null, 2)}</pre>;
}
