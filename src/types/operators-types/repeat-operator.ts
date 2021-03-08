import { AnyIterable } from 'augmentative-iterable';

export interface RepeatFunction {
  /**
   * Repeats the elements of the iterable a specified amount of times.
   * @param n The amount of times the iterable is to be repeated.
   * @returns The [[FluentAsyncIterable]] of the repeated iterable.
   */
  <T>(n: number): (it: Iterable<T>) => Iterable<T>;
}

export interface AsyncRepeatFunction {
  /**
   * Repeats the elements of the iterable a specified amount of times.
   * @param n The amount of times the iterable is to be repeated.
   * @returns The [[FluentAsyncIterable]] of the repeated iterable.
   */
  <T>(n: number): (it: AnyIterable<T>) => AsyncIterable<T>;
}
