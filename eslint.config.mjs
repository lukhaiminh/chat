import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt([eslintPluginPrettierRecommended, {
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/max-attributes-per-line': ['error', { singleline: 3 }],
    semi: ['error', 'always'],
    'prettier/prettier': ['error', { semi: true }]
  }
}]);