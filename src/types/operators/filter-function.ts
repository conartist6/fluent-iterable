import { AnyIterable, AsyncPredicate, Predicate } from 'augmentative-iterable';
import { FluentAsyncIterable, FluentIterable } from '../base';
import { Truthy } from '../truthy';

type RequiresTruthy<T, Guarantees extends keyof T> = T &
  {
    [P in Guarantees]-?: Truthy<T[P]>;
  };

export interface FilterFunction {
  /**
   * Filters the falsy values of a iterable of `T`<br>
   *   Example: `fluent(['anchor', undefined, 'bound', undefined]).filter()` yields *anchor* and *bound*.
   * @returns A [[FluentIterable]] of the elements against which the predicate evaluates to `true`.
   */
  <It extends Iterable<T>, T>(): (it: It) => Iterable<Truthy<T>>;
  /**
   * Filters the iterable of `T` based on a predicate.<br>
   *   Example: `fluent(['anchor', 'almond', 'bound', 'alpine']).filter(word => word[0] === 'a')` yields *anchor*, *almond*, and *alpine*.
   * @param predicate A predicate of `T`. All elements are yielded from the iterable against which this evaluates to `true`.
   * @returns A [[FluentIterable]] of the elements against which the predicate evaluates to `true`.
   */
  <It extends Iterable<T>, T, Guarantees extends keyof T = any>(
    predicate: Predicate<T>,
  ): (this: It) => Iterable<RequiresTruthy<T, Guarantees>>;
  /**
   * Filters the iterable of `T` based on a predicate.<br>
   *   Example: `fluent(['anchor', 'almond', 'bound', 'alpine']).filter(word => word[0] === 'a')` yields *anchor*, *almond*, and *alpine*.
   * @param predicate A predicate of `T`. All elements are yielded from the iterable against which this evaluates to `true`.
   * @returns A [[FluentIterable]] of the elements against which the predicate evaluates to `true`.
   */
  <It extends Iterable<T>, T, K extends keyof T>(predicate: K): (
    this: It,
  ) => Iterable<RequiresTruthy<T, K>>;
}
export interface AsyncFilterFunction {
  /**
   * Filters the falsy values of a iterable of `T`<br>
   *   Example: `fluentAsync(['anchor', undefined, 'bound', undefined]).filter()` yields *anchor* and *bound*.
   * @returns A [[FluentAsyncIterable]] of the elements against which the predicate evaluates to `true`.
   */
  <It extends AnyIterable<T>, T>(): (it: It) => AsyncIterable<Truthy<T>>;
  /**
   * Filters the iterable of `T` based on an asynchronous predicate.
   * @param predicate An asynchronous predicate of `T`. All elements are yielded from the iterable against which this evaluates to `true`.
   * @returns A [[FluentAsyncIterable]] of the elements against which the predicate evaluates to `true`.
   */
  <It extends AnyIterable<T>, T, Guarantees extends keyof T = any>(
    predicate: AsyncPredicate<T>,
  ): (this: It) => AsyncIterable<RequiresTruthy<T, Guarantees>>;
  /**
   * Filters the iterable of `T` based on an asynchronous predicate.
   * @param predicate An asynchronous predicate of `T`. All elements are yielded from the iterable against which this evaluates to `true`.
   * @returns A [[FluentAsyncIterable]] of the elements against which the predicate evaluates to `true`.
   */
  <It extends AnyIterable<T>, T, R extends keyof T, K extends keyof T>(
    predicate: R,
  ): (this: It) => AsyncIterable<RequiresTruthy<T, K>>;
}
