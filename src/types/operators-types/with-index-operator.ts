import { AnyIterable } from 'augmentative-iterable';
import { Indexed } from '../base';

export interface WithIndexFunction {
  /**
   * Maps all elements of the iterable to an instance of [[Indexed]], an index-value pair constructed of the original element in the iterable and it's index (starting from 0 for the first element in the iterable).
   * @returns A [[FluentAsyncIterable]] of [[Indexed]].
   */
  <T>(): (it: Iterable<T>) => Iterable<Indexed<T>>;
}
export interface AsyncWithIndexFunction {
  /**
   * Maps all elements of the iterable to an instance of [[Indexed]], an index-value pair constructed of the original element in the iterable and it's index (starting from 0 for the first element in the iterable).
   * @returns A [[FluentAsyncIterable]] of [[Indexed]].
   */
  <T>(): (it: AnyIterable<T>) => AsyncIterable<Indexed<T>>;
}
