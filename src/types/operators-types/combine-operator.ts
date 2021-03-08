import { AnyIterable, Mapper } from 'augmentative-iterable';

export interface CombineFunction {
  /**
   * Join the iterable with another one, returning a new iterable with a NxN combination
   * @param iterable The iterable to be combined
   */
  <T, U>(iterable: Iterable<U>): (it: Iterable<T>) => Iterable<[T, U]>;

  /**
   * Join the iterable with another one, returning a new iterable with the inner matching combinations
   * @param iterable The right iterable to be combined
   * @param keyA A mapper that returns the key map value from the left iterable
   * @param keyB A mapper that returns the key map value from the right iterable
   */
  <T, U, K>(iterable: Iterable<U>, keyA: Mapper<T, K>, keyB: Mapper<U, K>): (
    it: Iterable<T>,
  ) => Iterable<[T, U]>;

  /**
   * Join the iterable with another one, returning a new iterable with the inner matching combinations
   * @param iterable The right iterable to be combined
   * @param keyA A property name with value will be used as for comparison with the key of the second iterable
   * @param keyB A mapper that returns the key map value from the right iterable
   */
  <U, K, T>(iterable: Iterable<U>, keyA: keyof T, keyB: Mapper<U, K>): (
    it: Iterable<T>,
  ) => Iterable<[T, U]>;

  /**
   * Join the iterable with another one, returning a new iterable with the inner matching combinations
   * @param iterable The right iterable to be combined
   * @param keyA A mapper that returns the key map value from the left iterable
   * @param keyB A property name with value will be used as for comparison with the key of the first iterable
   */
  <T, U, K>(iterable: Iterable<U>, keyA: Mapper<T, K>, keyB: keyof U): (
    it: Iterable<T>,
  ) => Iterable<[T, U]>;

  /**
   * Join the iterable with another one, returning a new iterable with the inner matching combinations
   * @param iterable The right iterable to be combined
   * @param keyA A property name with value will be used as for comparison with the key of the second iterable
   * @param keyB A property name with value will be used as for comparison with the key of the first iterable
   */
  <T, U>(iterable: Iterable<U>, keyA: keyof T, keyB: keyof U): (
    it: Iterable<T>,
  ) => Iterable<[T, U]>;
}
export interface AsyncCombineFunction {
  /**
   * Join the iterable with an async one, returning a new async iterable with a NxN combination
   * @param iterable The iterable to be combined
   */
  <T, U>(iterable: AnyIterable<U>): (
    it: AnyIterable<T>,
  ) => AsyncIterable<[T, U]>;

  /**
   * Join the iterable with another one, returning a new async iterable with the inner matching combinations
   * @param iterable The right iterable to be combined
   * @param keyA A mapper that returns the key map value from the left iterable
   * @param keyB A mapper that returns the key map value from the right iterable
   */
  <T, U, K>(iterable: AnyIterable<U>, keyA: Mapper<T, K>, keyB: Mapper<U, K>): (
    it: AnyIterable<T>,
  ) => AsyncIterable<[T, U]>;

  /**
   * Join the iterable with another one, returning a new async iterable with the inner matching combinations
   * @param iterable The right iterable to be combined
   * @param keyA A property name with value will be used as for comparison with the key of the second iterable
   * @param keyB A mapper that returns the key map value from the right iterable
   */
  <T, U, K>(iterable: AnyIterable<U>, keyA: keyof T, keyB: Mapper<U, K>): (
    it: AnyIterable<T>,
  ) => AsyncIterable<[T, U]>;

  /**
   * Join the iterable with another one, returning a new async iterable with the inner matching combinations
   * @param iterable The right iterable to be combined
   * @param keyA A mapper that returns the key map value from the left iterable
   * @param keyB A property name with value will be used as for comparison with the key of the first iterable
   */
  <T, U, K>(iterable: AnyIterable<U>, keyA: Mapper<T, K>, keyB: keyof U): (
    it: AnyIterable<T>,
  ) => AsyncIterable<[T, U]>;

  /**
   * Join the iterable with another one, returning a new async iterable with the inner matching combinations
   * @param iterable The right iterable to be combined
   * @param keyA A property name with value will be used as for comparison with the key of the second iterable
   * @param keyB A property name with value will be used as for comparison with the key of the first iterable
   */
  <T, U>(iterable: AnyIterable<U>, keyA: keyof T, keyB: keyof U): (
    it: AnyIterable<T>,
  ) => AsyncIterable<[T, U]>;
}
