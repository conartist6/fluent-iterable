import { AnyIterable, AsyncMapper, Mapper } from 'augmentative-iterable';

export interface MinFunction {
  /**
   * Finds the numeric minimum element of the iterable using a projection. This is a resolving operation, will cause a full loop through all the elements of the iterable.<br>
   *   Example: `fluent(['anchor', 'almond', 'bound', 'alpine']).min(word => word.length)` returns *bound*, the shortest word in the iterable
   * @returns The minimum of the iterable's projected elements.
   */
  <T = any>(): (it: Iterable<T>) => T | undefined;
  /**
   * Finds the numeric minimum element of the iterable using a projection. This is a resolving operation, will cause a full loop through all the elements of the iterable.<br>
   *   Example: `fluent(['anchor', 'almond', 'bound', 'alpine']).min(word => word.length)` returns *bound*, the shortest word in the iterable
   * @param mapper The function which projects the elements of the iterable into the comparable value. Falls back to the identity function if omitted.
   * @returns The minimum of the iterable's projected elements.
   */
  <R, T = any>(mapper: Mapper<T, R>): (it: Iterable<T>) => T | undefined;
  /**
   * Finds the numeric minimum element of the iterable using a projection. This is a resolving operation, will cause a full loop through all the elements of the iterable.<br>
   *   Example: `fluent(['anchor', 'almond', 'bound', 'alpine']).min(word => word.length)` returns *bound*, the shortest word in the iterable
   * @param mapper The function which projects the elements of the iterable into the comparable value. Falls back to the identity function if omitted.
   * @returns The minimum of the iterable's projected elements.
   */
  <R extends keyof T, T = any>(mapper: R): (it: Iterable<T>) => T | undefined;
}
export interface AsyncMinFunction {
  /**
   * Finds the numeric minimum element of the iterable using an asynchronous projection. This is a resolving operation, will cause a full loop through all the elements of the iterable.
   * @returns A promise of the minimum of the iterable's projected elements.
   */
  <T = any>(): (it: AnyIterable<T>) => Promise<T | undefined>;
  /**
   * Finds the numeric minimum element of the iterable using an asynchronous projection. This is a resolving operation, will cause a full loop through all the elements of the iterable.
   * @param mapper The asynchronous function which projects the elements of the iterable into the comparable value. Falls back to the identity function if omitted.
   * @returns A promise of the minimum of the iterable's projected elements.
   */
  <R, T = any>(mapper?: AsyncMapper<T, R>): (it: AnyIterable<T>) => Promise<T | undefined>;
  /**
   * Finds the numeric minimum element of the iterable using an asynchronous projection. This is a resolving operation, will cause a full loop through all the elements of the iterable.
   * @param mapper The asynchronous function which projects the elements of the iterable into the comparable value. Falls back to the identity function if omitted.
   * @returns A promise of the minimum of the iterable's projected elements.
   */
  <R extends keyof T, T = any>(mapper: R): (it: AnyIterable<T>) => Promise<T | undefined>;
}
