module.exports = {
    root: true,
    env: {
        node: true,
        es2022: true
    },
    extends: [
        'eslint:recommended'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    rules: {
        'indent': ['error', 4],
        'linebreak-style': ['error', 'unix'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'no-unused-vars': 'warn',
        'valid-jsdoc': ['warn', {
            'requireReturn': false,
            'requireParamType': true,
            'requireReturnType': true
        }]
    },
    ignorePatterns: [
        'dist/',
        'node_modules/',
        'src/connectors/*.{bat,sh,scpt}'
    ]
}
