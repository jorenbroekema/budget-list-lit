import { rollupPluginHTML as html } from '@web/rollup-plugin-html';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { importMetaAssets } from '@web/rollup-plugin-import-meta-assets';

export default {
  input: 'index.html',
  output: { dir: 'dist' },
  plugins: [html(), nodeResolve(), importMetaAssets()],
};
