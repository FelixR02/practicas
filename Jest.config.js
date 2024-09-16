module.exports = {

    preset: "ts-jest",
    transform: {
        "^.+\\.(ts|tsx)?$": "ts-jest",
    },

    moduleFileExtensions: ["ts", "tsx", "js", "json", "node"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",

    },
    roots: ["<rootDir>/src"],
    collectCoverage: true,
    coverageReporters: ["json", "lcov", "clover"],

};

