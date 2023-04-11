module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "add",
        "fix",
        "docs",
        "style",
        "refactor",
        "test",
        "revert",
        "update",
      ],
    ],
    "subject-full-stop": [0, "never"],
    "subject-case": [0, "never"],
  },
};
