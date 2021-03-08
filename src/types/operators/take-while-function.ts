import { AnyIterable, AsyncPredicate, Predicate } from 'augmentative-iterable';
import { FluentAsyncIterable, FluentIterable } from '../base';

export interface TakeWhileFunction {
  /**
   * Returns elements from the iterable as long as a specified condition is met.<br>
   *   Example: `fluent(['anchor', 'almond', 'bound', 'alpine']).takeWhile(word => word[0] === 'a')` yields *anchor* and *almond*.
   * @param condition A predicate of `T`. All elements are yielded from the iterable until this evaluates to `false` for the first time.
   * @returns A [[FluentIterable]] of the elements until the condition is met.
   */
  <T>(condition: Predicate<T>): (
    this: Iterable<T>,
  ) => Iterable<T>;
  /**
   * Returns elements from the iterable as long as a specified condition is met.<br>
   *   Example: `fluent(['anchor', 'almond', 'bound', 'alpine']).takeWhile(word => word[0] === 'a')` yields *anchor* and *almond*.
   * @param condition A predicate of `T`. All elements are yielded from the iterable until this evaluates to `false` for the first time.
   * @returns A [[FluentIterable]] of the elements until the condition is met.
   */
  <It extends Iterable<T>, T>(condition: keyof T): (it: It) => Iterable<T>;
}

export interface AsyncTakeWhileFunction {
  /**
   * Returns elements from the iterable as long as a specified asynchronous condition is met.
   * @param condition An asynchronous predicate of `T`. All elements are yielded from the iterable until this evaluates to `false` for the first time.
   * @returns A [[FluentAsyncIterable]] of the elements until the condition is met.
   */
  <It extends AnyIterable<T>, T>(condition: AsyncPredicate<T>): (
    this: It,
  ) => AsyncIterable<T>;
  /**
   * Returns elements from the iterable as long as a specified asynchronous condition is met.
   * @param condition An asynchronous predicate of `T`. All elements are yielded from the iterable until this evaluates to `false` for the first time.
   * @returns A [[FluentAsyncIterable]] of the elements until the condition is met.
   */
  <It extends AsyncIterable<T>, T>(condition: keyof T): (
    this: It,
  ) => AsyncIterable<T>;
}
