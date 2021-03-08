import { AnyIterable } from 'augmentative-iterable';

export interface AppendFunction {
  /**
   * Appends a value to the end of the iterable.
   * @param items The items to be appended to the iterable.
   * @returns The [[FluentAsyncIterable]] appended with the element.
   */
  <T, R>(...items: R[]): (it: Iterable<T>) => Iterable<T | R>;
}

export interface AsyncAppendFunction {
  /**
   * Appends a value to the end of the iterable.
   * @param items The item to be appended to the iterable.
   * @returns The [[FluentAsyncIterable]] appended with the element.
   */
  <T, R>(...items: R[]): (it: AnyIterable<T>) => AsyncIterable<T | R>;
}
