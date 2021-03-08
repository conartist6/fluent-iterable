export interface ToArrayFunction {
  /**
   * Translates the iterable into an array. This is a resolving operation, will cause a full loop through all the elements of the iterable.<br>
   *   Example: `fluent(['anchor', 'almond', 'bound', 'alpine']).toArray()` returns `['anchor', 'almond', 'bound', 'alpine']`
   * @returns The array equivalent of the iterable.
   */
  <T = any>(): (it: Iterable<T>) => T[];
}

export interface AsyncToArrayFunction {
  /**
   * Translates the iterable into an array. This is a resolving operation, will cause a full loop through all the elements of the iterable.<br>
   *   Example: `fluent(['anchor', 'almond', 'bound', 'alpine']).toArray()` returns `['anchor', 'almond', 'bound', 'alpine']`
   * @returns A promise that resolves to the array equivalent of the async iterable.
   */
  <T = any>(): (it: Iterable<T>) => Promise<T[]>;
}
