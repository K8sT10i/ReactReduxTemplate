/**
 * Omit <T, K> imposes an extends keyof T constraint on K
 */
type OmitStrict<T, K extends keyof T> = Omit<T, K>

/**
 * Overwrite the item of T that corresponds to the key of S with S
 */
type Specify<T, S> = Omit<T, keyof S> & S

/**
 * Returns the intersection of all members of T
 */
type ValueOf<T> = T[keyof T]

/**
 * Get the value when the Promise resolves
 * @see https://stackoverflow.com/a/49889856
 */
type Resolved<T> = T extends Promise<infer U> ? U : T

/**
 * DeepReadonly
 * @see https://stackoverflow.com/a/49670389
 */
type DeepReadonly<T> = T extends (infer U)[]
  ? DeepReadonlyArray<U>
  : T extends object
  ? DeepReadonlyObject<T>
  : T

// DeepReadonlyArray will not work as a circular reference unless defined in interface
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

type DeepReadonlyObject<T> = { readonly [P in keyof T]: DeepReadonly<T[P]> }
