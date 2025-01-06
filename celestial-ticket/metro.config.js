const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);
config.resolver.assetExts.push(
  // Adds support for `.db` files for SQLite databases
  "glb",
  "gltf",
  "png",
  "jpg",
  "json" // Add 'json' to the list of supported asset extensions
);

module.exports = withNativeWind(config, { input: "./global.css" });
