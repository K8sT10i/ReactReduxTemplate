# TypeScript と React の速習 Tips

<!-- prettier-ignore-start -->
<!-- TOC -->

- [TypeScript と React の速習 Tips](#typescript-と-react-の速習-tips)
- [TypeScript とは？](#typescript-とは)
    - [JavaScript でよく使う概念](#javascript-でよく使う概念)
        - [関数はオブジェクト](#関数はオブジェクト)
    - [チートシート（文法早見表）](#チートシート文法早見表)
        - [ローカル変数を定義したい](#ローカル変数を定義したい)
        - [モジュール（＝ファイル）をまたいで変数や関数を共有したい](#モジュール＝ファイルをまたいで変数や関数を共有したい)
        - [別のファイルから関数や変数をインポートしたい](#別のファイルから関数や変数をインポートしたい)
        - [`=>` って何？](#-って何)
        - [二つのオブジェクトをマージしたい](#二つのオブジェクトをマージしたい)
        - [オブジェクトに新しいキーを追加して拡張したい](#オブジェクトに新しいキーを追加して拡張したい)
        - [`function MyComp({ value, onChange }: Props)` の意味は？](#function-mycomp-value-onchange--props-の意味は)
        - [配列から特定の値を選別したい](#配列から特定の値を選別したい)
- [React とは？](#react-とは)
    - [React でよく使う概念](#react-でよく使う概念)
        - [JSX 式（TSX 式）](#jsx-式tsx-式)
        - [コンポーネント](#コンポーネント)
        - [Presentational Components / Container Components](#presentational-components--container-components)
        - [API コンポーネントと表示コンポーネント](#api-コンポーネントと表示コンポーネント)
        - [Hooks とは](#hooks-とは)
    - [Redux とは](#redux-とは)
        - [三原則](#三原則)
        - [Ducks プロポーザル](#ducks-プロポーザル)
    - [チートシート（文法早見表）](#チートシート文法早見表-1)
        - [配列データをコンポーネントの繰り返しとして表示したい](#配列データをコンポーネントの繰り返しとして表示したい)
        - [条件によって描画するコンポーネントを切り替えたい](#条件によって描画するコンポーネントを切り替えたい)
        - [要素を横並びにするには？](#要素を横並びにするには)
- [DOs and DONTs](#dos-and-donts)
    - [DOs](#dos)
    - [DONTs](#donts)
- [書きたいけど書けていないこと](#書きたいけど書けていないこと)

<!-- /TOC -->
<!-- prettier-ignore-end -->

# TypeScript とは？

JavaScript (ECMAScript) からの派生言語。

- JavaScript のスーパーセット
- 静的型付け言語。モダンで強力な型推論

これらの特徴から、JavaScript 以上の学習コストをかけることなく、IDE の補完や静的型検査による品質向上の恩恵を受けられる。  
つまり、文法について不明な点がある場合は、JavaScript 仕様について検索すればほぼ解決する。

関数の結果や型の動きが気になるときは [TypeScript Playground](https://www.typescriptlang.org/play/#) で、かんたんに動作を確認できる。

<sup>TypeScript そのままではブラウザーで実行できないので、事前にトランスパイルが必要。  
環境構築をいちからできるようになるには、それなりの学習コストがかかる。</sup>

## JavaScript でよく使う概念

### 関数はオブジェクト

関数（メソッド）はオブジェクトの一種なので、関数を変数に代入したり、参照したりができる。

```ts
const myFunc = () => console.log('hello')
```

## チートシート（文法早見表）

### ローカル変数を定義したい

```ts
// 原則 const を使う
const someVar = 'FOO bar'

// if/switch で値を変えたいときは let を使う。
// が、const を使えないか見直したほうがいい。
let result: string
if (x === 0) {
  result = 'OK'
} else {
  result = 'NG'
}
return result

// 上記の書き方はさすがに酷い。
// return できるなら早めに return して、コードを読む負担を下げること。
if (x === 0) {
  return 'OK'
} else {
  return 'NG'
}
```

### モジュール（＝ファイル）をまたいで変数や関数を共有したい

```ts
// 名前付きエクスポートの場合
export const globalSettings = {
  x: 'X',
}
export const myCalc = (x, y) => x + y

// デフォルトエクスポート（一モジュールにつきひとつ以下）の場合
export default {
  x: 'X',
}
export default (x, y) => x + y

// 名前付きの場合とデフォルトの場合でインポートの仕方が異なる。
// 名前付き
import { globalSettings, myCalc } from '../settings'
// デフォルト
import globalSettings from '../settings'
```

### 別のファイルから関数や変数をインポートしたい

```ts
import React from 'react'
// ここでの `React` という名前はローカル変数と同じ扱い。
// ファイル内で自由に決められる。
import MyReact from 'react'
// つまりこう書いても OK

import { FieldText } from '../components/Field'
// 外部ライブラリー以外のモジュールは相対パスの書き方でインポートする。
// `{}` 内の名前は、読み込み元モジュールで定義された名前を参照する。
import { TextField as FabricText } from 'office-ui-fabric'
// `as` を使って名前を変えつつインポートもできる。

import React, { Component, createContext } from 'react'
// こういう書き方もできる。
// カンマで区切って複数インポート。
```

### `=>` って何？

```ts
// アロー関数。
const callMyName = (name: string) => {
  console.log(name)
  return true
}

// {} を省くこともできる。
const someCalc = (x: number, y: number) => x + y
// 次と等価。
const someCalc = (x: number, y: number) => {
  return x + y
}

// {} を省きつつオブジェクトを返すときは、() で囲む。
const someMerge = (p1: Props, p2: Props) => ({
  ...p1,
  ...p2,
})

// 関数は次のようにも書けるが、統一のため、理由がなければやめる。
function callMyName(name: string) {
  console.log(name)
  return true
}
```

### 二つのオブジェクトをマージしたい

```ts
const basicProfile = {
  name: 'SORANO/TARO',
  age: 30,
}
const additionalProfile = {
  amc: '1234567890',
}

// ... でオブジェクトを展開。
const profile = {
  ...basicProfile,
  ...additionalProfile,
}
console.log(profile)
// {
//   name: 'SORANO/TARO',
//   age: 30,
//   amc: '1234567890',
// }
```

### オブジェクトに新しいキーを追加して拡張したい

```ts
const basicProfile = {
  name: 'SORANO/TARO',
  age: 30,
}

// ... でオブジェクトを展開。
const profile = {
  ...basicProfile,
  amc: '1234567890',
}

// こうやると上書きになる。
const profile = {
  ...basicProfile,
  age: 60,
}
```

### `function MyComp({ value, onChange }: Props)` の意味は？

```ts
// 次と等価。
function MyComp(props: Props) {
  let value = props.value
  let onChange = props.onChange
}

// 次とも等価。
function MyComp(props: Props) {
  let { value, onChange } = props
}

// 値がないときのデフォルト値を指定することもできる。
function MyComp({ value = {}, onChange = () => {} }: Props) {}
```

### 配列から特定の値を選別したい

```ts
const tasks = [
  { title: 'A', status: 'CLOSED' },
  { title: 'B', status: 'OPEN' },
  { title: 'C', status: 'OPEN' },
]

// filter() に渡したコールバック t => t.status === 'OPEN' が true を返す要素だけが残る。
// openTasks には B と C だけが格納される。
const openTasks = tasks.filter(t => t.status === 'OPEN')
```

# React とは？

Web 向けの UI フレームワーク。

## React でよく使う概念

### JSX 式（TSX 式）

次のように、JS/TS のコードに HTML タグの書き方が混じった文法。

```tsx
import React from 'react'
import Title from './title'

export const App = () => (
  <div>
    <Title size="xl">THE TITLE</Title>
    <p>This is the app</p>
  </div>
)
```

`<div>` の部分は、トランスパイルによって次のように変換される：

```ts
import React from 'react'
import Title from './title'

export const App = () =>
  React.createElement(
    'div',
    null,
    React.createElement(Title, { size: 'xl' }, 'THE TITLE'),
    React.createElement('p', null, 'This is the app'),
  )
```

### コンポーネント

コンポーネントは

- `React.Component` を継承したクラス
- JSX 要素を返す関数

のどちらか。  
できるだけ後者を使うほうがいい。

```tsx
class Title extends React.Component {
  render() {
    switch (this.props.size) {
      case 'xl':
        return <h1>{this.props.children}</h1>

      default:
        return <p>{this.props.children}</p>
    }
  }
}
```

```tsx
const Title = props => {
  switch (props.size) {
    case 'xl':
      return <h1>{props.children}</h1>

    default:
      return <p>{props.children}</p>
  }
}
```

### Presentational Components / Container Components

コンポーネントを分割したときの、役割に応じたコンポーネントの分類。

- Presentational components: 表示・見た目・レイアウトをつかさどるコンポーネント
- Container components: 機能・状態を持つコンポーネント

Redux の作者によって提唱された ([Presentational and Container Components – Dan Abramov – Medium](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)) が、2019 年になって「React Hooks が登場し、この分け方を推奨する理由はなくなった」と追記されている。

しかし、コンポーネント設計の一手法として知っておくのは依然として有益。  
このプロトタイプでも大体の場合、styled-components で presentational components を作り、hooks で container components を作るという書き方になっている。

```tsx
// export default で、機能性を持ったコンポーネント（container components 相当）をファイル外に公開。
// 自然と 1 ファイルにつき 1 コンポーネントとなる。
export default function SomeArea() {
  // ロジックはなるべく hooks（単なる "use" 接頭辞の関数）に隠蔽するのがよい。
  const { value, handleChange } = useXxx()

  return (
    <Wrapper>
      <Title>TITLE: {value.title}</Title>
      <MainText>{value.mainText}</MainText>
    </Wrapper>
  )
}

// styled-components で見た目のためのコンポーネントを定義（presentational components 相当）。
// export しないのでローカル変数と同じ扱い、自由に作ってよい。
const Wrapper = styled.div``
const Title = styled.h1`
  color: red;
`
const MainText = styled.p`
  color: blue;
`
```

### API コンポーネントと表示コンポーネント

本プロジェクト独自の概念。React コンポーネントを API 呼び出しと表示に分けることで、責務を明確化する。
表示コンポーネント（例: VIP 検索*検索結果.tsx）は値を受け取って表示するのみに注力する。また、API コンポーネント（例: APTO1001*国際便情報検索\_API.tsx）は API 呼び出しと受け取った値を State に反映することのみに注力する。コンポーネントの設計手法は以下を参考のこと。

- [API コンポーネント](https://tech.recruit-mp.co.jp/front-end/react-effect-component/)
- 表示コンポーネント → [Presentational Components / Container Components](#presentational-components--container-components)

### Hooks とは

[Hooks](https://ja.reactjs.org/docs/hooks-overview.html) とは React 16.8 で追加された新機能。state などの React の機能を、クラスを書かずに使えるようになる。
本プロジェクトで使用している Hooks は以下の 3 種類がある

- React 標準の Hooks (useState, useEffect, etc.)。
- [Redux の Custom Hooks](https://react-redux.js.org/api/hooks) (useSelector, useDispatch, etc.)。
- プロジェクト固有の Custom Hooks (useEditState, useGetItemName, etc.)

## Redux とは

[Redux](https://redux.js.org/basics/usage-with-react) とは状態管理ライブラリ。API から受け取った値や、画面でモーダルが開いているかどうか、といった状態 (State) を管理する。各画面の State は Store に集約され、コンポーネントから以下のように読み出す。

```tsx
const ceRecord = useSelector(state => state.ceRecord)
```

useSelector でアクセスするデータを「グローバルな値」、一方、useState などを利用したコンポーネント内に閉じたデータを「ローカルな値」と言ったりする。

### 三原則

以下の思想に則って実装を心がけてほしい。

- Single source of truth
- State in read-only
- Changes are made with pure functions
  より詳しい解説は[こちら](https://qiita.com/syossan27/items/7e1b2e07ac68b96bdaa7#redux%E3%81%AE%E4%B8%89%E5%8E%9F%E5%89%87)

### Ducks プロポーザル

本プロジェクトでは、Redux の運用に [Ducks](https://github.com/erikras/ducks-modular-redux) というプロポーザル（提案）を採用している。要は、Action と Reducer を一つのファイルにまとめること。ファイル間の行き来を減らすことができる。

## チートシート（文法早見表）

### 配列データをコンポーネントの繰り返しとして表示したい

```tsx
// Array#map() を使い、値の配列をコンポーネントの配列に変換する。
const MyList = props => (
  <div>
    {props.value.map(v => (
      <List key={v.key}>{v.text}</List>
    ))}
  </div>
)

// <MyList value={[
//   { key: 'A', text: 'AAA' },
//   { key: 'B', text: 'BBB' },
// ]} />
// とした場合、次と等価
const MyList = () => (
  <div>
    <List key={'A'}>{'AAA'}</List>
    <List key={'B'}>{'BBB'}</List>
  </div>
)
```

### 条件によって描画するコンポーネントを切り替えたい

```tsx
// switch 文で
const Title = props => {
  switch (props.size) {
    case 'xl':
      return <h1>{props.children}</h1>

    default:
      return <p>{props.children}</p>
  }
}

// 表示・非表示の切り替えは論理式で可能
// 次の例では、props.lastupdate が渡されたときだけ、その値を表示している
const Title = props => {
  return (
    <h1>
      {props.children}
      {props.lastupdate && <Date>{props.lastupdate}</Date>}
    </h1>
  )
}
```

### 要素を横並びにするには？

[Stack](https://developer.microsoft.com/en-us/fluentui#/controls/web/stack) コンポーネントを利用して横並びにする

```tsx
// horizontal を追加すると子のブロック要素を横並びにできる
const ItemA = props => {
  return (
    <Stack horizontal>
      <div>{props.label}</div>
      <div>{props.value}</div>
    </Stack>
  )
}

// horizontalAlign や verticalAlign で
// 要素の寄せ方（上下左右）を指定できる
const ItemB = props => {
  return (
    // 右寄せ
    <Stack horizontal horizontalAlign="end">
      <div>{props.label}</div>
      <div>{props.value}</div>
    </Stack>
  )
}
```

# DOs and DONTs

## DOs

- reducer に「複雑さ」を集めよう
  **可能な限り、値の加工処理は API コンポーネントの reducer 内で行う。** 実装の複雑さ（ビジネスロジック等）をどこに集約するか、つまり、if 文（条件）をどこに書くかという問題に直面したときに指標としてほしい考え方。もちろん、表示と連動する条件は表示コンポーネント内で実装する。

- [アーリー・リターン](https://qiita.com/nskydiving/items/1076c411b002b0a3aec9)で深いネストを避ける

```tsx
// BAD
if (APxx1001Status === 'NEED_TO_REFRESH') {
  // なんらかの処理
}

// GOOD
if (APxx1001Status !== 'NEED_TO_REFRESH') return
```

## DONTs

- 重複して State を持たせない
  同じデータを複数箇所に持たせるのは混乱を招くため、State は必要最小限に留める。「複数の API から同じデータが返却されるのに、インタフェース名が統一されていない」といったことがあるので、不安なときは都度、担当者に確認しよう。

<sup>例外として、ユーザのテキストデータを保持する目的で、照会した値を入れる State と 更新する値を入れる State で同じデータが入ることはある。</sup>

# 書きたいけど書けていないこと

- CSS のエッセンス共有、チートシート作成
  - inline-block と flex の使いどころ。float, table-cell はわかりづらいのでやめる。
  - DOs and DONTs
  - マージン・パディングは 8px の倍数で
  - width は決めない（レスポンシブ）。min-width は決める。
  - width は 40px の倍数で。
  - マージン・パディング・幅・高さ（＝サイズに関するもの）は各コンポーネント好きに決めていい。タイポグラフィーは統一的にする。
- React のエッセンス共有、アーキテクチャー共有
  - コンポーネント指向とは
  - Redux による中央集権 store
  - DOs and DONTs
  - Page コンポーネントは connect しない。
  - エリアごとに connect する
  - Local state is fine!
