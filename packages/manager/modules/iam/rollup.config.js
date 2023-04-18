import path from 'path';
import rollupConfig from '@ovh-ux/component-rollup-config';
import rollupAlias from '@rollup/plugin-alias';
import jsconfig from './jsconfig.json';

const {
  compilerOptions: { baseUrl, paths },
} = jsconfig;

const config = rollupConfig({
  input: 'src/index.js',
  plugins: [
    rollupAlias({
      entries: Object.entries(paths).map(([find, replacement]) => ({
        replacement: path.resolve(path.join('.', baseUrl, replacement)),
        find,
      })),
    }),
  ],
});

export default [config.es()];
