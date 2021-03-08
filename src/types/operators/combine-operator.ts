import { AnyIterable, Mapper } from 'augmentative-iterable';

export interface CombineFunction {
  /**
   * Join the iterable with another one, returning a new iterable with a NxN combination
   * @param iterable The iterable to be combined
   */
  <It extends Iterable<T>, T, U>(iterable: Iterable<U>): (
    this: It,
  ) => Iterable<[T, U]>;

  /**
   * Join the iterable with another one, returning a new iterable with the inner matching combinations
   * @param iterable The right iterable to be combined
   * @param keyA A mapper that returns the key map value from the left iterable
   * @param keyB A mapper that returns the key map value from the right iterable
   */
  <It extends Iterable<T>, T, U, K>(
    iterable: Iterable<U>,
    keyA: Mapper<T, K>,
    keyB: Mapper<U, K>,
  ): (it: Iterable<T>) => Iterable<[T, U]>;

  /**
   * Join the iterable with another one, returning a new iterable with the inner matching combinations
   * @param iterable The right iterable to be combined
   * @param keyA A property name with value will be used as for comparison with the key of the second iterable
   * @param keyB A mapper that returns the key map value from the right iterable
   */
  <It extends Iterable<T>, U, T, K>(
    iterable: Iterable<U>,
    keyA: keyof T,
    keyB: Mapper<U, K>,
  ): (it: It) => Iterable<[T, U]>;

  /**
   * Join the iterable with another one, returning a new iterable with the inner matching combinations
   * @param iterable The right iterable to be combined
   * @param keyA A mapper that returns the key map value from the left iterable
   * @param keyB A property name with value will be used as for comparison with the key of the first iterable
   */
  <It extends Iterable<T>, T, U, K>(
    iterable: Iterable<U>,
    keyA: Mapper<T, K>,
    keyB: keyof U,
  ): (it: It) => Iterable<[T, U]>;

  /**
   * Join the iterable with another one, returning a new iterable with the inner matching combinations
   * @param iterable The right iterable to be combined
   * @param keyA A property name with value will be used as for comparison with the key of the second iterable
   * @param keyB A property name with value will be used as for comparison with the key of the first iterable
   */
  <It extends Iterable<T>, T, U>(
    iterable: Iterable<U>,
    keyA: keyof T,
    keyB: keyof U,
  ): (it: It) => Iterable<[T, U]>;
}
export interface AsyncCombineFunction {
  /**
   * Join the iterable with an async one, returning a new async iterable with a NxN combination
   * @param iterable The iterable to be combined
   */
  <It extends AnyIterable<T>, T, U>(iterable: AnyIterable<U>): (
    this: It,
  ) => AsyncIterable<[T, U]>;

  /**
   * Join the iterable with another one, returning a new async iterable with the inner matching combinations
   * @param iterable The right iterable to be combined
   * @param keyA A mapper that returns the key map value from the left iterable
   * @param keyB A mapper that returns the key map value from the right iterable
   */
  <It extends AnyIterable<T>, T, U, K>(
    iterable: AnyIterable<U>,
    keyA: Mapper<T, K>,
    keyB: Mapper<U, K>,
  ): (it: It) => AsyncIterable<[T, U]>;

  /**
   * Join the iterable with another one, returning a new async iterable with the inner matching combinations
   * @param iterable The right iterable to be combined
   * @param keyA A property name with value will be used as for comparison with the key of the second iterable
   * @param keyB A mapper that returns the key map value from the right iterable
   */
  <It extends AnyIterable<T>, T, U, K>(
    iterable: AnyIterable<U>,
    keyA: keyof T,
    keyB: Mapper<U, K>,
  ): (it: It) => AsyncIterable<[T, U]>;

  /**
   * Join the iterable with another one, returning a new async iterable with the inner matching combinations
   * @param iterable The right iterable to be combined
   * @param keyA A mapper that returns the key map value from the left iterable
   * @param keyB A property name with value will be used as for comparison with the key of the first iterable
   */
  <It extends AnyIterable<T>, T, U, K>(
    iterable: AnyIterable<U>,
    keyA: Mapper<T, K>,
    keyB: keyof U,
  ): (it: It) => AsyncIterable<[T, U]>;

  /**
   * Join the iterable with another one, returning a new async iterable with the inner matching combinations
   * @param iterable The right iterable to be combined
   * @param keyA A property name with value will be used as for comparison with the key of the second iterable
   * @param keyB A property name with value will be used as for comparison with the key of the first iterable
   */
  <It extends AnyIterable<T>, T, U>(
    iterable: AnyIterable<U>,
    keyA: keyof T,
    keyB: keyof U,
  ): (it: It) => AsyncIterable<[T, U]>;
}
