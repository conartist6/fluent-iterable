import { FluentAsyncIterable, FluentIterable } from '../base';

export interface AppendFunction<T> {
  /**
   * Appends a value to the end of the iterable.
   * @param items The items to be appended to the iterable.
   * @returns The [[FluentAsyncIterable]] appended with the element.
   */
  <R>(...items: R[]): FluentIterable<T | R>;
}

export interface AsyncAppendFunction<T> {
  /**
   * Appends a value to the end of the iterable.
   * @param items The item to be appended to the iterable.
   * @returns The [[FluentAsyncIterable]] appended with the element.
   */
  <R>(...items: T[]): FluentAsyncIterable<T | R>;
}
