module.exports = {
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "plugins": [
        "react",
        "import"
    ],
    "env": {
        "browser": true,
        "es6": true,
    },
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "rules": {
        // disable rules from base configurations
        "no-console": "off",
        "comma-dangle": "off",
        "no-undef": "off",
        "no-unused-vars": "off"
    }
};
