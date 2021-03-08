import { AnyIterable } from 'augmentative-iterable';

export interface WhenEmptyFunction {
  /**
   * Iterates over a fallback iterable when the original is empty
   * @param fallback the fallback iterable
   */
  <T, R>(fallback: Iterable<R>): (it: Iterable<T>) => Iterable<R>;
}
export interface AsyncWhenEmptyFunction {
  /**
   * Iterates over a fallback iterable when the original is empty
   * @param fallback the fallback iterable
   */
  <T, R>(fallback: AnyIterable<R>): (it: AnyIterable<T>) => AsyncIterable<R>;
}
