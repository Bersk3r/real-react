const config = require('./.babelrc.common.js'); // 클라이언트와 서버 측 설정에서는 .babel.common.js 파일의 설정을 가져와서 사용함
config.presets.push('@babel/preset-env'); // 클라이언트에 프리셋을 추가함
module.exports = config;