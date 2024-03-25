const { override } = require("customize-cra");
/**
 * addLessLoader 如果从customize-cra导入会出现一下错误
 * ValidationError: Invalid options object. PostCSS Loader has been initialized using an options object that does not match the API schema.
 * 解决办法：安装customize-cra-less-loader并从中导入 addLessLoader
 */
const addLessLoader = require("customize-cra-less-loader");

module.exports = override(
  addLessLoader()
)