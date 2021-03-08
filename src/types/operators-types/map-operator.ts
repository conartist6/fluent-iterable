import { AnyIterable, AsyncMapper, Mapper } from 'augmentative-iterable';

export interface MapFunction {
  /**
   * Transforms the iterable of `T` into an iterable of `R` by mapping all elements to an element of `R`.<br>
   *   Example: `fluent(['anchor', 'almond', 'bound', 'alpine']).map(word => word.toUpperCase())` yields *ANCHOR*, *ALMOND*, *BOUND* and *ALPINE*.
   * @typeparam R The destination type of the mapping.
   * @param mapper The operation which maps an instance of `T` into an instance of `R`.
   * @returns A [[FluentIterable]] of the mapped elements.
   */
  <T, R>(mapper: Mapper<T, R>): (it: Iterable<T>) => Iterable<R>;
  /**
   * Transforms the iterable of `T` into an iterable of `R` by mapping all elements to an element of `R`.<br>
   *   Example: `fluent(['anchor', 'almond', 'bound', 'alpine']).map(word => word.toUpperCase())` yields *ANCHOR*, *ALMOND*, *BOUND* and *ALPINE*.
   * @typeparam R The destination type of the mapping.
   * @param mapper The operation which maps an instance of `T` into an instance of `R`.
   * @returns A [[FluentIterable]] of the mapped elements.
   */
  <T, R extends keyof T>(mapper: R): (it: Iterable<T>) => Iterable<T[R]>;
}
export interface AsyncMapFunction {
  /**
   * Transforms the iterable of `T` into an iterable of `R` by mapping all elements to an element of `R`.
   * @typeparam R The destination type of the mapping.
   * @param mapper The asynchronous operation which maps an instance of `T` into an instance of `R`.
   * @returns A [[FluentAsyncIterable]] of the mapped elements.
   */
  <T, R>(mapper: AsyncMapper<T, R>): (it: AnyIterable<T>) => AsyncIterable<R>;
  /**
   * Transforms the iterable of `T` into an iterable of `R` by mapping all elements to an element of `R`.
   * @typeparam R The destination type of the mapping.
   * @param mapper The asynchronous operation which maps an instance of `T` into an instance of `R`.
   * @returns A [[FluentAsyncIterable]] of the mapped elements.
   */
  <T, R extends keyof T>(mapper: R): (
    it: AnyIterable<T>,
  ) => AsyncIterable<T[R]>;
}
