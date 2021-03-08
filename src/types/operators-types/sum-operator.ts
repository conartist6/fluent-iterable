import { AnyIterable, AsyncMapper, Mapper } from 'augmentative-iterable';

export interface SumFunction {
  /**
   * Calculates the sum of the elements of the iterable projected into a `number`. This is a resolving operation, will cause a full loop through all the elements of the iterable.<br>
   *   Examples:<br>
   *     * `fluent([5, -2, 9]).sum()` returns *12*
   *     * `fluent(['anchor', 'almond', 'bound', 'alpine']).sum(word => word.length)` returns *23*, the sum of length of all the words in the iterable
   * @param mapper The function which projects the elements of the iterable into `number`s. Falls back to the identity function if omitted.
   * @returns The sum of the projected elements of the iterable.
   */
  <T = any>(mapper?: Mapper<T, number>): (it: Iterable<T>) => number;

  /**
   * Calculates the sum of the elements of the iterable projected into a `number`. This is a resolving operation, will cause a full loop through all the elements of the iterable.<br>
   *   Examples:<br>
   *     * `fluent([5, -2, 9]).sum()` returns *12*
   *     * `fluent(['anchor', 'almond', 'bound', 'alpine']).sum(word => word.length)` returns *23*, the sum of length of all the words in the iterable
   * @param mapper The function which projects the elements of the iterable into `number`s. Falls back to the identity function if omitted.
   * @returns The sum of the projected elements of the iterable.
   */
  <T = any>(mapper: keyof T): (it: Iterable<T>) => number;
}
export interface AsyncSumFunction {
  /**
   * Calculates the sum of the elements of the iterable asynchronously projected into a `number`. This is a resolving operation, will cause a full loop through all the elements of the iterable.
   * @param mapper The asynchronous function which projects the elements of the iterable into `number`s. Falls back to the identity function if omitted.
   * @returns A promise of the sum of the projected elements of the iterable.
   */
  <T = any>(mapper?: AsyncMapper<T, number>): (it: AnyIterable<T>) => Promise<number>;

  /**
   * Calculates the sum of the elements of the iterable asynchronously projected into a `number`. This is a resolving operation, will cause a full loop through all the elements of the iterable.
   * @param mapper The asynchronous function which projects the elements of the iterable into `number`s. Falls back to the identity function if omitted.
   * @returns A promise of the sum of the projected elements of the iterable.
   */
  <T = any>(mapper: keyof T): (it: AnyIterable<T>) => Promise<number>;
}
