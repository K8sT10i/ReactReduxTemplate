// テストやデバッグ用に使える領域を確保する

// テスト/デバッグ用なので any を許可する
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Debug = any

export type DebugAction = {
  type: 'Debug.Mutate'
  // テスト/デバッグ用なので any を許可する
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any
  meta: {
    debug: true
  }
}
