
module.exports = function (api) {
    api.cache(true);  // use forever() instead of (true, false) in TypeScript
    return {
      presets: [
        ["babel-preset-expo", { jsxImportSource: "nativewind" }],
        "nativewind/babel",
      ],
    };
  };