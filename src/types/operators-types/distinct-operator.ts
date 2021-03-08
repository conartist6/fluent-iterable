import { AnyIterable, AsyncMapper, Mapper } from 'augmentative-iterable';

export interface DistinctFunction {
  /**
   * Returns distinct elements from the iterable from a certain projections perspective.<br>
   *   Examples:<br>
   *     * `fluent(['anchor', 'almond', 'anchor', 'alpine']).distinct()` yields *anchor*, *almond* and *alpine*<br>
   *     * `fluent(['anchor', 'almond', 'bound', 'alpine']).distinct(word => word[0])` yields *anchor* and *bound*
   * @typeparam R The type of the data the element equality is based on.
   * @param mapper The projection to use to determine element equality. Identity mapping is used if omitted.
   * @param maxOcurrences The number of accepted occurrences for each item. Default: 1
   * @returns The [[FluentIterable]] of the distinct elements.
   */
  <T, R>(mapper?: Mapper<T, R>, maxOcurrences?: number): (
    it: Iterable<T>,
  ) => Iterable<T>;

  /**
   * Returns distinct elements from the iterable.<br>
   *   Examples:<br>
   *     * `fluent(['anchor', 'almond', 'anchor', 'alpine']).distinct()` yields *anchor*, *almond* and *alpine*<br>
   *     * `fluent(['anchor', 'almond', 'bound', 'alpine']).distinct(word => word[0])` yields *anchor* and *bound*
   * @typeparam R The type of the data the element equality is based on.
   * @returns The [[FluentIterable]] of the distinct elements.
   */
  <T>(maxOcurrences?: number): (it: Iterable<T>) => Iterable<T>;

  /**
   * Returns distinct elements from the iterable from a certain projections perspective.<br>
   *   Examples:<br>
   *     * `fluent(['anchor', 'almond', 'anchor', 'alpine']).distinct()` yields *anchor*, *almond* and *alpine*<br>
   *     * `fluent(['anchor', 'almond', 'bound', 'alpine']).distinct(word => word[0])` yields *anchor* and *bound*
   * @typeparam R The type of the data the element equality is based on.
   * @param mapper The projection to use to determine element equality. Identity mapping is used if omitted.
   * @param maxOcurrences The number of accepted occurrences for each item. Default: 1
   * @returns The [[FluentIterable]] of the distinct elements.
   */
  <T, R extends keyof T>(mapper?: R, maxOcurrences?: number): (
    it: Iterable<T>,
  ) => Iterable<T>;
}
export interface AsyncDistinctFunction {
  /**
   * Returns distinct elements from the iterable from a certain asynchronous projections perspective.
   * @typeparam R The type of the data the element equality is based on.
   * @param mapper The asynchronous projection to use to determine element equality. Identity mapping is used if omitted.
   * @param maxOcurrences The number of accepted occurrences for each item. Default: 1
   * @returns The [[FluentAsyncIterable]] of the distinct elements.
   */
  <T, R>(mapper?: AsyncMapper<T, R>, maxOcurrences?: number): (
    it: AnyIterable<T>,
  ) => AsyncIterable<T>;
  /**
   * Returns distinct elements from the iterable from a certain asynchronous projections perspective.
   * @typeparam R The type of the data the element equality is based on.
   * @param mapper The asynchronous projection to use to determine element equality. Identity mapping is used if omitted.
   * @param maxOcurrences The number of accepted occurrences for each item. Default: 1
   * @returns The [[FluentAsyncIterable]] of the distinct elements.
   */
  <T, R extends keyof T>(mapper: R, maxOcurrences?: number): (
    it: AnyIterable<T>,
  ) => AsyncIterable<T>;
}
