import { AnyIterable } from 'augmentative-iterable';
import { FluentAsyncIterable, FluentIterable } from '../base';

export interface WhenEmptyFunction {
  /**
   * Iterates over a fallback iterable when the original is empty
   * @param fallback the fallback iterable
   */
  <It extends Iterable<T>, T, R>(fallback: Iterable<R>): (
    this: It,
  ) => Iterable<R>;
}
export interface AsyncWhenEmptyFunction {
  /**
   * Iterates over a fallback iterable when the original is empty
   * @param fallback the fallback iterable
   */
  <It extends AnyIterable<T>, T, R>(fallback: AnyIterable<R>): (
    this: It,
  ) => AsyncIterable<R>;
}
