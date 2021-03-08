import { Comparer } from '../base';
import { FluentAsyncIterable, FluentIterable } from '../base';

export interface SortFunction {
  /**
   * Sorts the elements of the iterable based on a specified comparer. This is a resolving operation, will cause a full loop through all the elements of the iterable.<br>
   *   Examples:<br>
   *     * Alphabetical, ascending: `fluent(['anchor', 'almond', 'bound', 'alpine']).sort()` yields *almond*, *alpine*, *anchor* and *bound*.<br>
   *     * Alphabetical, descending: `fluent(['anchor', 'almond', 'bound', 'alpine']).sort((x, y) => x > y ? -1 : x < y ? 1 : 0)` yields *bound*, *anchor*, *alpine* and *almond*.<br>
   *     * Numerical, ascending: `fluent([5, 3, 4, 1, 2]).sort()` yields *1*, *2*, *3*, *4* and *5*.<br>
   *     * Numerical, descending: `fluent([5, 3, 4, 1, 2]).sort((x, y) => y - x)` yields *5*, *4*, *3*, *2* and *1*.
   * @param comparer The comparer operation to use to determine the order of elements. Alphabetical ascending is used for [[string]] elements and numerical ascending is used for [[number]]
   * @returns The sorted [[FluentIterable]].
   */
  <It extends Iterable<T>, T>(comparer?: Comparer<T>): (
    this: It,
  ) => Iterable<T>;
}

export interface AsyncSortFunction {
  /**
   * Sorts the elements of the iterable based on a specified comparer. This is a resolving operation, will cause a full loop through all the elements of the iterable.
   * @param comparer The comparer operation to use to determine the order of elements. Alphabetical ascending is used for [[string]] elements and numerical ascending is used for [[number]]
   * @returns The sorted [[FluentAsyncIterable]].
   */
  <It extends AsyncIterable<T>, T>(comparer?: Comparer<T>): (
    this: It,
  ) => AsyncIterable<T>;
}
