// Setup file to fix jest-expo compatibility issue with React Native NativeModules
// jest-expo expects NativeModules.default, but React Native uses CommonJS exports

// Ensure React Native globals exist BEFORE requiring NativeModules
if (typeof global.nativeModuleProxy === "undefined") {
  global.nativeModuleProxy = {};
}

if (typeof global.__fbBatchedBridgeConfig === "undefined") {
  global.__fbBatchedBridgeConfig = {
    remoteModuleConfig: [],
  };
}

// Pre-load NativeModules and ensure it has .default property
// This must happen before jest-expo's setup.js runs
try {
  const nativeModulesPath = require.resolve(
    "react-native/Libraries/BatchedBridge/NativeModules"
  );
  // Clear any existing cache
  delete require.cache[nativeModulesPath];

  // Load NativeModules
  const NativeModules = require(nativeModulesPath);

  // Ensure it's an object and has .default
  if (NativeModules && typeof NativeModules === "object") {
    if (!NativeModules.default) {
      NativeModules.default = NativeModules;
    }
  } else {
    // If NativeModules is not an object, create a mock
    const mockModules = {};
    mockModules.default = mockModules;
    // Replace in cache
    require.cache[nativeModulesPath].exports = mockModules;
  }
} catch (e) {
  // If we can't load NativeModules, create a mock in the require cache
  const Module = require("module");
  const mockModules = {};
  mockModules.default = mockModules;

  const nativeModulesPath = require.resolve(
    "react-native/Libraries/BatchedBridge/NativeModules"
  );
  if (!require.cache[nativeModulesPath]) {
    require.cache[nativeModulesPath] = {
      exports: mockModules,
      loaded: true,
    };
  } else {
    require.cache[nativeModulesPath].exports = mockModules;
  }
}
