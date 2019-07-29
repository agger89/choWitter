// 프론트 서버 패키지들 분석

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = withBundleAnalyzer({
  distDir: '.next',
  webpack(config) {
    const prod = process.env.NODE_ENV === 'production';
    const plugins = [
      ...config.plugins,
      // tree shraking으로 용량 줄이기
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
    ];
    if (prod) {
      // main.js 확장자뒤에 main.js.gz를 붙여서 용량을 3분의1로 압축 시킴
      // 배포시 필수
      plugins.push(new CompressionPlugin());
    }
    return {
      ...config,
      mode: prod ? 'production' : 'development',
      // hidden-source-map: 소스코드 숨기면서 에러 시 소스맵 제공
      // eval: 빠르게 웹팩 적용
      devtool: prod ? 'hidden-source-map' : 'eval',
      module: {
        ...config.module,
        rules: [
          ...config.module.rules,
          {
            loader: 'webpack-ant-icon-loader',
            enforce: 'pre',
            include: [
              require.resolve('@ant-design/icons/lib/dist'),
            ],
          },
        ],
      },
      plugins,
    };
  },
});
