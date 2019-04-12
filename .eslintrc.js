module.exports = {
    extends: [
        "airbnb-base",
        "eslint:recommended",
        "plugin:react/recommended",
    ],
    rules: {
        indent: [2, "tab"],
        semi: ["error"]
    },
    "env": {
        "browser": true,
        "node": true,
        "jasmine": true
    },
};