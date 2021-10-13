/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const defaultSourceExts = require("metro-config/src/defaults/defaults").sourceExts;
module.exports = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-react-bridge/lib/plugin'),
    // babelTransformerPath: require.resolve(__dirname),

    //'react-native-react-bridge/lib/plugin'
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    extraNodeModules: {
      crypto: require.resolve('react-native-crypto'),
      fs: require.resolve('react-native-fs'),
      path: require.resolve('react-native-path'),
      os: require.resolve('react-native-os'),
      "regenerator-runtime": require.resolve("regenerator-runtime"),
      // "big-integer": require.resolve("big-integer"),yarn cache clean
      // "snarkjs": require.resolve("snarkjs"),
      // "readline": require.resolve("readline"),






      // snarkjs: require.resolve('./node_modules/react-native-snarkjs/build/snarkjs.js'),
      // snarkjs: require.resolve('/Users/vladyslavmunin/Projects/mobile/react-newsnarkjs/node_modules/react-native-snarkjs/build/snarkjs.js'),
    },
    sourceExts: [
      ...defaultSourceExts,
      'cjs'
    ]
  }
};
