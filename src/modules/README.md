# Modules

<!-- prettier-ignore-start -->
<!-- TOC -->

- [Modules](#modules)
- [What is a **module**?](#what-is-a-module)
- [Rules](#rules)

<!-- /TOC -->
<!-- prettier-ignore-end -->

# What is a **module**?

Redux における state, action, reducer のまとまりを指す概念。  
実体は、state と action の型定義と、reducer の処理を記述した TS ファイル。

画面部品のまとまりではなく **データ構造の観点** でまとめる。

[Ducks: Redux Reducer Bundles](https://github.com/erikras/ducks-modular-redux) (a proposal for bundling reducers, action types and actions when using Redux) を参考にしている。

# Rules

1. **MUST** Reducer は default import、state の型や action の型は named import できるようにする。  
   つまり `import someReducer, { SomeState, SomeModAction } from './modules/someMod'` という書式で import できるようにする。
2. **MUST** 各 action は `[modName]Action` 型のメンバーとして作成する。  
   つまり `ValueOf<SomeModAction>` という書式で全 action の交差型を得られるようにしたり、`SomeModAction['Change']` という書式で個別の action を参照できたりする必要がある。
3. **MUST** Action の型は [Flux Standard Action](https://github.com/redux-utilities/flux-standard-action) に準拠する。
4. **SHOULD** Action の type の値は、action の型名と同一とすることが推奨される。  
   さらに `SomeMod.Change` のように、ほかの module 内の action と衝突しない名前をつけるのがよい。
5. **MAY** State の型を module 外のファイルでまとめて re-export したり、新しい型を定義したりしてよい。

1 を満たすには、次のように 1 ファイルに書いてもよいし:

`modules/someMod.ts`

```ts
export interface SomeState {
  foo: string
  bar: boolean
}

export type SomeModAction = {
  Change: {
    type: 'SomeMod.Change'
    payload: string
  }

  Confirm: {
    type: 'SomeMod.Confirm'
    payload: {
      foo: string
      fooIsValid: boolean
    }
  }
}

const reducer: Reducer<SomeState, ValueOf<SomeModAction>> = function(
  someState = {},
  action,
  rootState,
) {
  return someState
}

export default reducer
```

次のように複数ファイルに分けてもよい:

`modules/someMod/index.ts`

```ts
import { SomeState } from './state'

export * from './state'

export type SomeModAction = {
  Change: {
    type: 'SomeMod.Change'
    payload: string
  }

  Confirm: {
    type: 'SomeMod.Confirm'
    payload: {
      foo: string
      fooIsValid: boolean
    }
  }
}

const reducer: Reducer<SomeState, ValueOf<SomeModAction>> = function(
  someState = {},
  action,
  rootState,
) {
  return someState
}

export default reducer
```

`modules/someMod/state.ts`

```ts
export interface SomeState {
  foo: string
  bar: boolean
}
```

「Module が小さいうちは前者、大きくなってきたら後者」という切りかえも可能。  
1 の書式を守れば、module 利用側の変更は一切不要なため。
