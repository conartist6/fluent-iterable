export interface PrependFunction {
  /**
   * Adds a value to the beginning of the iterable.
   * @param items The items to be prepended to the iterable.
   * @returns The [[FluentAsyncIterable]] prepended with the element.
   */
  <It extends Iterable<T>, T>(...items: T[]): (it: It) => Iterable<T>;
}

export interface AsyncPrependFunction {
  /**
   * Adds a value to the beginning of the iterable.
   * @param items The items to be prepended to the iterable.
   * @returns The [[FluentAsyncIterable]] prepended with the element.
   */
  <It extends AsyncIterable<T>, T>(...items: T[]): (
    this: It,
  ) => AsyncIterable<T>;
}
