// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push(
  // Adds support for `.db` files for SQLite databases
  "glb",
  "gltf",
  "png",
  "jpg",
  "json" // Add 'json' to the list of supported asset extensions
);

module.exports = config;
