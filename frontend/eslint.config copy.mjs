import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  ...compat.env({ browser: true, es2020: true }),
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'eslint-config-prettier',
  ),
  {
    ignores: [
      '.husky',
      '.open-next',
      '.sst',
      'node_modules',
      'next-env.d.ts',
      'sst-env.d.ts',
    ],
  },
];

export default eslintConfig;
