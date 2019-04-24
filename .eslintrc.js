module.exports = {
    parser: 'babel-eslint',
	extends: [
		"airbnb-base",
		"eslint:recommended",
		"plugin:react/recommended",
	],
	"env": {
		"browser": true,
		"node": true,
        "jasmine": true,
        "jest": true
	},
	"rules": {
        "indent": [
            "warn",
            "tab"
        ],
        "no-unused-vars": ["warn", { "vars": "all" }],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-shadow": ["error", {
            "builtinGlobals": false,
            "hoist": "functions",
            "allow": ["state", "getters"]
        }],
        "no-param-reassign": ["error", {
            "props": true,
            "ignorePropertyModificationsFor": ["state"]
        }],
        "no-use-before-define": ["error", {
            "functions": false,
            "classes": true
        }],
        "eqeqeq": ["error", "smart"],
        "consistent-return": ["error", {
            "treatUndefinedAsUnspecified": true
        }],
        "prefer-destructuring": ["error", {
            "object": true,
            "array": false
        }],
        "import/no-extraneous-dependencies": ["off"],
        "no-console": process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        "no-debugger": process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        "newline-before-return": ["warn"],
    }
};
