// eslint.config.js

import js from '@eslint/js'
import globals from 'globals'
import prettier from 'eslint-config-prettier'

export default [
    js.configs.recommended,
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.jest,
                ...globals.node,
            },
        },
        rules: {},
    },
    prettier,
]
