export interface AppendFunction {
  /**
   * Appends a value to the end of the iterable.
   * @param items The items to be appended to the iterable.
   * @returns The [[FluentAsyncIterable]] appended with the element.
   */
  <It extends Iterable<T>, T, R>(...items: R[]): (it: It) => Iterable<T | R>;
  /**
   * Appends a value to the end of the iterable.
   * @param items The item to be appended to the iterable.
   * @returns The [[FluentAsyncIterable]] appended with the element.
   */
  <It extends AsyncIterable<T>, T, R>(...items: R[]): (
    this: It,
  ) => AsyncIterable<T | R>;
}
