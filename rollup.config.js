const html = require('@web/rollup-plugin-html').default;
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { importMetaAssets } = require('@web/rollup-plugin-import-meta-assets');

export default {
  input: 'index.html',
  output: { dir: 'dist' },
  plugins: [html(), nodeResolve(), importMetaAssets()],
};
