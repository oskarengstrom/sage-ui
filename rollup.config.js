import babel from "@rollup/plugin-babel";
import external from "rollup-plugin-peer-deps-external";
import del from "rollup-plugin-delete";
import pkg from "./package.json";
// import resolve from "rollup-plugin-node-resolve";
// import commonjs from "rollup-plugin-commonjs";

export default {
  input: pkg.source,
  output: [
    { file: pkg.main, format: "cjs" },
    { file: pkg.module, format: "esm" },
  ],
  plugins: [
    external(),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
    }),
    // resolve({
    //   mainFields: ["index", "main"],
    //   // preferBuiltins: true,
    // }),
    // commonjs(),
    del({ targets: ["dist/*"] }),
  ],
  external: (id) => {
    return Object.keys(pkg.peerDependencies || {}).includes(id);
  },
};
