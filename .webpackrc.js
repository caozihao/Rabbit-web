export default {
  "entry": "src/index.js",
  // "entry": "src/index.js",
  "hash": true,
  "sass": {},
  "disableCSSModules": true,
  // "html": {
  //   "template": "./src/index.ejs"
  // },
  "theme": {
    // "@primary-color": "#FB7D55",
    "@primary-color": "#00add2",
  },
  "extraBabelPlugins": [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }]
  ],
}
