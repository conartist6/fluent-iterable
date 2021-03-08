export interface TakeFunction {
  /**
   * Returns a specified number of contiguous elements from the start of the iterable.
   * @param n The number of elements to take.
   * @returns A [[FluentAsyncIterable]] of the first `n` elements.
   */
  <It extends Iterable<T>, T>(n: number): (it: It) => Iterable<T>;
}

export interface AsyncTakeFunction {
  /**
   * Returns a specified number of contiguous elements from the start of the iterable.
   * @param n The number of elements to take.
   * @returns A [[FluentAsyncIterable]] of the first `n` elements.
   */
  <It extends AsyncIterable<T>, T>(n: number): (it: It) => AsyncIterable<T>;
}
