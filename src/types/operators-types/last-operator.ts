import { AnyIterable, AsyncPredicate, Predicate } from 'augmentative-iterable';

export interface LastFunction {
  /**
   * Returns the last element of the iterable matching a predicate, or `undefined` value if no such element is found. This is a resolving operation, will cause a full loop through all the elements of the iterable.<br>
   *   Examples:<br>
   *     * `fluent(['anchor', 'almond', 'bound', 'alpine']).last()` returns *alpine*<br>
   *     * `fluent([]).last()` returns `undefined`<br>
   *     * `fluent(['anchor', 'almond', 'bound', 'alpine']).last(word => word[0] === 'b')` returns *bound*<br>
   *     * `fluent(['anchor', 'almond', 'bound', 'alpine']).last(word => word[0] === 'c')` returns `undefined`
   * @param predicate The last element is to be returned which matches this predicate. Defaults to the always true function and thus, returns the last element in the iterable if omitted.
   * @returns The last element matching the specified predicate, or `undefined` if no such element found.
   */
  <T = any>(predicate?: Predicate<T>): (it: Iterable<T>) => T | undefined;

  /**
   * Returns the last element of the iterable matching a predicate, or `undefined` value if no such element is found. This is a resolving operation, will cause a full loop through all the elements of the iterable.<br>
   *   Examples:<br>
   *     * `fluent(['anchor', 'almond', 'bound', 'alpine']).last()` returns *alpine*<br>
   *     * `fluent([]).last()` returns `undefined`<br>
   *     * `fluent(['anchor', 'almond', 'bound', 'alpine']).last(word => word[0] === 'b')` returns *bound*<br>
   *     * `fluent(['anchor', 'almond', 'bound', 'alpine']).last(word => word[0] === 'c')` returns `undefined`
   * @param predicate The last element is to be returned which matches this predicate. Defaults to the always true function and thus, returns the last element in the iterable if omitted.
   * @returns The last element matching the specified predicate, or `undefined` if no such element found.
   */
  <T = any>(predicate: keyof T): (it: Iterable<T>) => T | undefined;
}
export interface AsyncLastFunction {
  /**
   * Returns the last element of the iterable matching an asynchronous predicate, or `undefined` value if no such element is found. This is a resolving operation, will cause a full loop through all the elements of the iterable.
   * @param predicate The last element is to be returned which matches this asynchronous predicate.
   * @returns A promise of the last element matching the specified predicate, or `undefined` if no such element found.
   */
  <T = any>(predicate?: AsyncPredicate<T>): (it: AnyIterable<T>) => Promise<T | undefined>;

  /**
   * Returns the last element of the iterable matching an asynchronous predicate, or `undefined` value if no such element is found. This is a resolving operation, will cause a full loop through all the elements of the iterable.
   * @param predicate The last element is to be returned which matches this asynchronous predicate.
   * @returns A promise of the last element matching the specified predicate, or `undefined` if no such element found.
   */
  <T = any>(predicate: keyof T): (it: AnyIterable<T>) => Promise<T | undefined>;
}
