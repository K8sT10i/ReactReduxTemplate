// https://storybook.js.org/docs/configurations/custom-webpack-config/#full-control-mode
module.exports = ({ config }) => {
  // // eslint-loader を除外
  // // よくわからないエラーが出るので回避。
  // // lint は lint コマンドでチェックすればいい
  // config.module.rules = config.module.rules.filter(function isNotEslintLoader(
  //   rule,
  // ) {
  //   return (
  //     rule &&
  //     rule.use &&
  //     rule.use instanceof Array &&
  //     rule.use.some(
  //       config =>
  //         config && config.loader && config.loader.includes('eslint-loader'),
  //     )
  //   )
  // })

  // TypeScript のトランスパイルを追加
  // https://storybook.js.org/docs/configurations/typescript-config/#setting-up-typescript-to-work-with-storybook-1
  const tsTranspile = {
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    // Automatically hoist .babelrc at the project root.
  }
  config.module.rules.push(tsTranspile)
  config.resolve.extensions.push('.ts', '.tsx')

  // コンソール出力が多すぎるので抑制する
  // https://webpack.js.org/configuration/stats/
  config.devServer = { stats: 'minimal' }

  return config
}
