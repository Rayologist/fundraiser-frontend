import pluginQuery from '@tanstack/eslint-plugin-query';
import mantine from 'eslint-config-mantine';
import tseslint from 'typescript-eslint';

export default tseslint.config([...mantine, ...pluginQuery], {
  ignores: ['**/*.{mjs,cjs,js,d.ts,d.mts}'],
});
