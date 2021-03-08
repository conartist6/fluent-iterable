import { FluentAsyncIterable, FluentIterable } from '../base';

export interface RepeatFunction {
  /**
   * Repeats the elements of the iterable a specified amount of times.
   * @param n The amount of times the iterable is to be repeated.
   * @returns The [[FluentAsyncIterable]] of the repeated iterable.
   */
  <It extends Iterable<T>, T>(n: number): (it: It) => Iterable<T>;
}

export interface AsyncRepeatFunction {
  /**
   * Repeats the elements of the iterable a specified amount of times.
   * @param n The amount of times the iterable is to be repeated.
   * @returns The [[FluentAsyncIterable]] of the repeated iterable.
   */
  <It extends AsyncIterable<T>, T>(n: number): (it: It) => AsyncIterable<T>;
}
