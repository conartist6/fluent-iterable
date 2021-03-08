import { Indexed } from '../base';

export interface WithIndexFunction {
  /**
   * Maps all elements of the iterable to an instance of [[Indexed]], an index-value pair constructed of the original element in the iterable and it's index (starting from 0 for the first element in the iterable).
   * @returns A [[FluentAsyncIterable]] of [[Indexed]].
   */
  <It extends Iterable<T>, T>(): (it: It) => Iterable<Indexed<T>>;
}
export interface AsyncWithIndexFunction {
  /**
   * Maps all elements of the iterable to an instance of [[Indexed]], an index-value pair constructed of the original element in the iterable and it's index (starting from 0 for the first element in the iterable).
   * @returns A [[FluentAsyncIterable]] of [[Indexed]].
   */
  <It extends AsyncIterable<T>, T>(): (it: It) => AsyncIterable<Indexed<T>>;
}
