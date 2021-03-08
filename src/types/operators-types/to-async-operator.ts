import { FluentAsyncIterable } from '../base';

export interface ToAsyncFunction {
  /**
   * Translates the iterable into a [[FluentAsyncIterable]].
   * @returns The [[FluentAsyncIterable]] instance.
   */
  <T = any>(): (it: Iterable<T>) => FluentAsyncIterable<T>;
}
