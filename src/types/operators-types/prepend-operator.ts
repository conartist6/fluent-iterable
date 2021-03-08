import { AnyIterable } from 'augmentative-iterable';

export interface PrependFunction {
  /**
   * Adds a value to the beginning of the iterable.
   * @param items The items to be prepended to the iterable.
   * @returns The [[FluentAsyncIterable]] prepended with the element.
   */
  <R, T>(...items: R[]): (it: Iterable<T>) => Iterable<T | R>;
}

export interface AsyncPrependFunction {
  /**
   * Adds a value to the beginning of the iterable.
   * @param items The items to be prepended to the iterable.
   * @returns The [[FluentAsyncIterable]] prepended with the element.
   */
  <R, T>(...items: T[]): (it: AnyIterable<R>) => AsyncIterable<T | R>;
}
