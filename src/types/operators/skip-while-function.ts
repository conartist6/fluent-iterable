import { AnyIterable, AsyncPredicate, Predicate } from 'augmentative-iterable';
import { FluentAsyncIterable, FluentIterable } from '../base';

export interface SkipWhileFunction {
  /**
   * Bypasses elements in the iterable as long as a specified condition is true and then returns the remaining elements.<br>
   *   Example: `fluent(['anchor', 'almond', 'bound', 'alpine']).skipWhile(word => word[0] === 'a')` yields *bound* and *alpine*.
   * @param condition A predicate of `T`. All elements are skipped from the iterable until this evaluates to `false` for the first time.
   * @returns A [[FluentIterable]] of the elements after the condition is not met.
   */
  <It extends Iterable<T>, T>(condition: Predicate<T>): (
    this: It,
  ) => Iterable<T>;
  /**
   * Bypasses elements in the iterable as long as a specified condition is true and then returns the remaining elements.<br>
   *   Example: `fluent(['anchor', 'almond', 'bound', 'alpine']).skipWhile(word => word[0] === 'a')` yields *bound* and *alpine*.
   * @param condition A predicate of `T`. All elements are skipped from the iterable until this evaluates to `false` for the first time.
   * @returns A [[FluentIterable]] of the elements after the condition is not met.
   */
  <It extends Iterable<T>, T>(condition: keyof T): (it: It) => Iterable<T>;
}

export interface AsyncSkipWhileFunction {
  /**
   * Bypasses elements in the iterable as long as a specified asynchronous condition is true and then returns the remaining elements.
   * @param condition An asynchronous predicate of `T`. All elements are skipped from the iterable until this evaluates to `false` for the first time.
   * @returns A [[FluentAsyncIterable]] of the elements after the condition is not met.
   */
  <It extends AnyIterable<T>, T>(condition: AsyncPredicate<T>): (
    this: It,
  ) => AsyncIterable<T>;

  /**
   * Bypasses elements in the iterable as long as a specified asynchronous condition is true and then returns the remaining elements.
   * @param condition An asynchronous predicate of `T`. All elements are skipped from the iterable until this evaluates to `false` for the first time.
   * @returns A [[FluentAsyncIterable]] of the elements after the condition is not met.
   */
  <It extends AsyncIterable<T>, T, R extends keyof T>(condition: R): (
    this: It,
  ) => AsyncIterable<T>;
}
