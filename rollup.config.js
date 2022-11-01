import typescript from "@rollup/plugin-typescript";
import terser from '@rollup/plugin-terser';
import copy from  'rollup-plugin-copy';

const packageJson = require("./package.json");

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs'
      },
      {
        file: packageJson.module,
        format: "esm",
      },
    ],
    plugins: [
      typescript({ tsconfig: './tsconfig.json' }),
      copy({
        targets: [{ src: './src/public-types.d.ts', dest: './dist', rename: 'index.d.ts' }]
      }),
      terser(),
    ],
    external: ['react'],
  },
]
