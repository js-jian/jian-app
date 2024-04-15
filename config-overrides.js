const { override, fixBabelImports } = require("customize-cra");
/**
 * addLessLoader 如果从customize-cra导入会出现一下错误
 * ValidationError: Invalid options object. PostCSS Loader has been initialized using an options object that does not match the API schema.
 * 解决办法：安装customize-cra-less-loader并从中导入 addLessLoader
 */
const addLessLoader = require("customize-cra-less-loader");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addLessLoader({
    lessLoaderOptions: {
      lessOptions: {
        javascriptEnabled: true
      }
    }
  })
)