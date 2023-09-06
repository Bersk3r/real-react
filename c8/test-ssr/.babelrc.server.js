const config = require('./.babelrc.common.js');
config.plugins.push('@babel/plugin-transform-modules-commonjs'); // 서버에 필요한 플러그인을 추가함
module.exports = config;