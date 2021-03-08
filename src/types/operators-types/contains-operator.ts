export interface ContainsFunction {
  /**
   * Determines whether the iterable contains a specified element. This is a partial resolving operation, will cause a partial or - if needed - a full loop through the elements of the iterable.<br>
   *   Example: `fluent(['anchor', 'almond', 'bound', 'alpine']).contains('bound')` returns `true`
   * @param item The element to check.
   * @returns `true` if the specified element exists in the iterable, `false` otherwise.
   */
  <T = any>(item: T): (it: Iterable<T>) => boolean;
}

export interface AsyncContainsFunction {
  /**
   * Determines whether the iterable contains a specified element. This is a partial resolving operation, will cause a partial or - if needed - a full loop through the elements of the iterable.<br>
   *   Example: `fluent(['anchor', 'almond', 'bound', 'alpine']).contains('bound')` returns `true`
   * @param item The element to check.
   * @returns `true` if the specified element exists in the iterable, `false` otherwise.
   */
  <T = any>(item: T): (it: Iterable<T>) => Promise<boolean>;
}
