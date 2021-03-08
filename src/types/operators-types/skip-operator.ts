import { AnyIterable } from 'augmentative-iterable';

export interface SkipFunction {
  /**
   * Bypasses a specified number of elements in the iterable and then returns the remaining elements.
   * @param n The number of elements to skip.
   * @returns A [[FluentAsyncIterable]] of all the elements after the first `n` elements.
   */
  <T>(n: number): (it: Iterable<T>) => Iterable<T>;
}

export interface AsyncSkipFunction {
  /**
   * Bypasses a specified number of elements in the iterable and then returns the remaining elements.
   * @param n The number of elements to skip.
   * @returns A [[FluentAsyncIterable]] of all the elements after the first `n` elements.
   */
  <T>(n: number): (it: AnyIterable<T>) => AsyncIterable<T>;
}
