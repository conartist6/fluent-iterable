import { AnyIterable, AsyncMapper, Mapper } from 'augmentative-iterable';
import { FluentAsyncIterable, FluentIterable } from '../base';

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
  <It extends Iterable<T>, T, R>(
    mapper?: Mapper<T, R>,
    maxOcurrences?: number,
  ): (it: It) => Iterable<T>;

  /**
   * Returns distinct elements from the iterable.<br>
   *   Examples:<br>
   *     * `fluent(['anchor', 'almond', 'anchor', 'alpine']).distinct()` yields *anchor*, *almond* and *alpine*<br>
   *     * `fluent(['anchor', 'almond', 'bound', 'alpine']).distinct(word => word[0])` yields *anchor* and *bound*
   * @typeparam R The type of the data the element equality is based on.
   * @returns The [[FluentIterable]] of the distinct elements.
   */
  <It extends Iterable<T>, T>(maxOcurrences?: number): (
    this: It,
  ) => Iterable<T>;

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
  <It extends Iterable<T>, T, R extends keyof T>(
    mapper?: R,
    maxOcurrences?: number,
  ): (it: It) => Iterable<T>;
  /**
   * Returns distinct elements from the iterable from a certain asynchronous projections perspective.
   * @typeparam R The type of the data the element equality is based on.
   * @param mapper The asynchronous projection to use to determine element equality. Identity mapping is used if omitted.
   * @param maxOcurrences The number of accepted occurrences for each item. Default: 1
   * @returns The [[FluentAsyncIterable]] of the distinct elements.
   */
  <It extends AnyIterable<T>, T, R>(
    mapper?: AsyncMapper<T, R>,
    maxOcurrences?: number,
  ): (it: It) => AsyncIterable<T>;
}
export interface AsyncDistinctFunction {
  /**
   * Returns distinct elements from the iterable from a certain asynchronous projections perspective.
   * @typeparam R The type of the data the element equality is based on.
   * @param mapper The asynchronous projection to use to determine element equality. Identity mapping is used if omitted.
   * @param maxOcurrences The number of accepted occurrences for each item. Default: 1
   * @returns The [[FluentAsyncIterable]] of the distinct elements.
   */
  <It extends AsyncIterable<T>, T, R extends keyof T>(
    mapper: R,
    maxOcurrences?: number,
  ): (it: It) => AsyncIterable<T>;
}
