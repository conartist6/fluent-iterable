import { AnyIterable, AsyncPredicate, Predicate } from 'augmentative-iterable';

export interface CountFunction {
  /**
   * Returns the number of elements that matches a predicate in the iterable. This is a resolving operation, will cause a full loop through all the elements of the iterable.<br>
   *   Examples:<br>
   *     * `fluent(['anchor', 'almond', 'bound', 'alpine']).count()` returns **4**<br>
   *     * `fluent(['anchor', 'almond', 'bound', 'alpine']).count(word => word[0] === 'a')` returns **3**
   * @param predicate The count will consider elements which match this predicate. Defaults to the always true function and thus, counts all the elements in the iterable if omitted.
   * @returns The number of elements matching the specified predicate.
   */
  <T = any>(predicate?: Predicate<T>): (it: Iterable<T>) => number;
  /**
   * Returns the number of elements that matches a predicate in the iterable. This is a resolving operation, will cause a full loop through all the elements of the iterable.
   * @param predicate The count will consider elements which match this predicate. Defaults to the always true function and thus, counts all the elements in the iterable if omitted.
   * @returns The number of elements matching the specified predicate.
   */
  <R extends keyof T, T = any>(predicate: R): (it: Iterable<T>) => number;
}
export interface AsyncCountFunction {
  /**
   * Returns the number of elements that matches an asynchronous predicate in the iterable. This is a resolving operation, will cause a full loop through all the elements of the iterable.
   * @param predicate The count will consider elements which match this asynchronous predicate.
   * @returns A promise of the number of elements matching the specified predicate.
   */
  <T = any>(predicate?: AsyncPredicate<T>): (it: AnyIterable<T>) => Promise<number>;
  /**
   * Returns the number of elements that matches a predicate in the iterable. This is a resolving operation, will cause a full loop through all the elements of the iterable.
   * @param predicate The count will consider elements which match this predicate. Defaults to the always true function and thus, counts all the elements in the iterable if omitted.
   * @returns A promise of the number of elements matching the specified predicate.
   */
  <R extends keyof T, T = any>(predicate: R): (it: AnyIterable<T>) => Promise<number>;
}
