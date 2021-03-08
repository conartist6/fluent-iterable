import { FluentAsyncIterable, FluentIterable } from '../base';

export interface SkipFunction {
  /**
   * Bypasses a specified number of elements in the iterable and then returns the remaining elements.
   * @param n The number of elements to skip.
   * @returns A [[FluentAsyncIterable]] of all the elements after the first `n` elements.
   */
  <It extends Iterable<T>, T>(n: number): (it: It) => Iterable<T>;
}

export interface AsyncSkipFunction {
  /**
   * Bypasses a specified number of elements in the iterable and then returns the remaining elements.
   * @param n The number of elements to skip.
   * @returns A [[FluentAsyncIterable]] of all the elements after the first `n` elements.
   */
  <It extends AsyncIterable<T>, T>(n: number): (it: It) => AsyncIterable<T>;
}
