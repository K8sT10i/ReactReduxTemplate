# npm パッケージの選定理由

似たパッケージの中から特定のパッケージを選んだ理由がとくにあるものを、ピックアップして記載している。  
パッケージを変えたいとき（メンテナンス終了や機能性の不足のとき）の判断材料に。

<!-- prettier-ignore-start -->
<!-- TOC -->

- [npm パッケージの選定理由](#npm-パッケージの選定理由)
- [Dependencies](#dependencies)
    - [@handsontable/react, handsontable](#handsontablereact-handsontable)
    - [office-ui-fabric-react, @uifabric/fluent-theme](#office-ui-fabric-react-uifabricfluent-theme)
    - [dayjs](#dayjs)
    - [fast-memoize](#fast-memoize)
    - [ky](#ky)
    - [lodash](#lodash)
    - [react](#react)
    - [redux](#redux)
    - [ress](#ress)
    - [styled-components](#styled-components)
- [Dev dependencies](#dev-dependencies)
    - [eslint](#eslint)
    - [eslint-config-airbnb](#eslint-config-airbnb)
    - [express](#express)
    - [parcel-bundler (aka Parcel)](#parcel-bundler-aka-parcel)
    - [prettier](#prettier)

<!-- /TOC -->
<!-- prettier-ignore-end -->

# Dependencies

## @handsontable/react, handsontable

Alternatives: ag-Grid など多数

操作感が Excel に近く、また Excel とコピー＆ペーストの相性が良いから。

## office-ui-fabric-react, @uifabric/fluent-theme

## dayjs

Alternatives: moment, luxon, date-fns

[こちらの記事](https://qiita.com/yagi_suke/items/2848c8981ea6d9f26587) を参考にした。  
バンドルサイズが小さいことが決め手。

## fast-memoize

Alternatives: lodash/memoize, nano-memoize, moize (cf. https://github.com/anywhichway/nano-memoize)

バンドルサイズが小さく、高速とうたっていたので。  
やたらとバンドルサイズを増やさず、高速でメモリリークがなければ、なんでもいい。  
（fast-memoize でメモリリークがないかどうかは検証できていない）

## ky

Alternatives: axios, superagent

コールバックで記述する superagent よりは、async/await で記述できる ky or axios のほうが書きやすい。  
axios より後発の ky は fetch API の薄めのラッパーといった感じで、将来性がありそうなので。

## lodash

## react

Alternatives: Angular, Vue.js

TypeScript と JSX 式の相性が良いため。  
Vue.js もテンプレート式に型制約が付くようになって TypeScript との相性が格段に高まったが、Vue.js は同じことを実現するのに様々な書き方ができてしまい、統一が効かなくなるのでやめた。

また、React Native という派生ライブラリーがあって、モバイルアプリ開発にも流用できる可能性があるため。

## redux

## ress

Alternatives: Normalize.css, Reboot.css (cf. https://webdesign-trends.net/entry/8137)

なんでもいいが、新しめだったので。

## styled-components

Alternatives: Emotion

# Dev dependencies

## eslint

Alternatives: TSLint

TSLint が deprecated になったため。

## eslint-config-airbnb

Alternatives: Google, Standard など (cf. https://codeburst.io/5-javascript-style-guides-including-airbnb-github-google-88cbc6b2b7aa)

好みの面が大きいが、有名で [ドキュメント](https://github.com/airbnb/javascript) が読みやすいと感じたので。

## express

Alternatives: Koa, Hapi

スタブ API を記述するためなのでなんでもいいが、storybook > express という依存ですでに使われていて、開発 PC のディスク容量を節約できるので。

## parcel-bundler (aka Parcel)

Alternatives: webpack, Create React App, GatsbyJS, Next.js, React Static

当初は GatsbyJS を使っていたが、Office UI Fabric との相性が悪く (\*1) ([issue](https://github.com/OfficeDev/office-ui-fabric-react/issues/616))、一時期 Create React App に切り替えた。  
しかし CRA は設定がほとんど変えられない点 (\*2) が不満だった（わざわざ [ライブラリー](https://www.npmjs.com/package/@craco/craco) を追加して設定を変えていた）ので、最終的に Parcel に乗り換えた。

webpack を使わないのは、基本的なアセットしかビルドしないこのプロジェクトでは Parcel の簡易さが勝るためと、Parcel だと Node.js スクリプトもトランスパイルをかけやすいため。

**(\*1)**  
GatsbyJS や同種のツールは、静的 HTML をエクスポートする際に Node.js で Server Side Rendering (SSR) をかけている。  
Office UI Fabric の CSS スタイル管理の仕組みがこの SSR でうまく動かず、スタイルが崩れてしまう。  
CRA や Parcel はすべて Client Side Rendering (CSR) なので、この問題がない。

**(\*2)**  
`react-scripts eject` で設定を変えられるようにはなるが、すべてのスクリプトを自分でメンテしないといけなくなって、react-scripts を使う意味がなくなってしまう。

## prettier

フロントエンド領域ではデファクトのようだし、ルールにもとくに不満はないので、代替品を探していない。
