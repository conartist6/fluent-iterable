import { AnyIterable } from 'augmentative-iterable';

export interface TakeFunction {
  /**
   * Returns a specified number of contiguous elements from the start of the iterable.
   * @param n The number of elements to take.
   * @returns A [[FluentAsyncIterable]] of the first `n` elements.
   */
  <T>(n: number): (it: Iterable<T>) => Iterable<T>;
}

export interface AsyncTakeFunction {
  /**
   * Returns a specified number of contiguous elements from the start of the iterable.
   * @param n The number of elements to take.
   * @returns A [[FluentAsyncIterable]] of the first `n` elements.
   */
  <T>(n: number): (it: AnyIterable<T>) => AsyncIterable<T>;
}
