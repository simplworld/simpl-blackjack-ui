{
    "parser": "babel-eslint",
    "extends": "eslint-config-airbnb",
    "rules": {
        "comma-dangle": 0,
        // current bug in eslint-plugin-react means this marks false-positives
        // fixed in master, should be fixed in 4.2.2
        // "react/prefer-stateless-function": 0,
        // "react/prefer-es6-class": 0,
        "react/jsx-filename-extension": 0,
        //"jsx-a11y/anchor-is-valid": [ "error", {
        //    "components": [ "Link" ],
        //    "specialLink": [ "to", "hrefLeft", "hrefRight" ],
        //    "aspects": [ "noHref", "invalidHref", "preferButton" ]
        //}]
    },
    "env": {
        "browser": true,
        "jest": true
    }
}
