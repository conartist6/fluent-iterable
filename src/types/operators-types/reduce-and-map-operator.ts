import { AnyIterable, AsyncMapper, Mapper } from 'augmentative-iterable';
import { AsyncReducer, Reducer } from '../base';

export interface ReduceAndMapFunction {
  /**
   * Aggregates the iterable by applying an accumulator function over the elements of the iterable. The specified seed value is used as the initial accumulator value, and the specified map function is used to project the result value from the accumulator value. This is a resolving operation, will cause a full loop through all the elements of the iterable.<br>
   *   Example:<br>
   *     ```
   *     fluent(['anchor', 'almond', 'bound', 'alpine']).reduceAndMap(
   *       (current, next) => (next.length < current.minValue ? { min: next, minValue: next.length } : current),
   *       {
   *         min: undefined as (string | undefined),
   *         minValue: Number.MAX_VALUE
   *       },
   *       acc => acc.min
   *     )
   *     ``` returns *bound*, the shortest word in the iterable.
   * @typeparam A The type of the accumulator value.
   * @typeparam R The type of the aggregation result.
   * @param reducer The accumulator function, provides the next accumulator value out of the last accumulator value and the next element in the iterable.
   * @param initial The initial (aka *seed*) value of the accumulator.
   * @param result The mapping function, projects the accumulator value of type `A` to the result value of type `R`.
   * @returns The aggregated value.
   */
  <A, R, T = any>(reducer: Reducer<T, A>, initial: A, result: Mapper<A, R>): (it: Iterable<T>) => R;

  /**
   * Aggregates the iterable by applying an accumulator function over the elements of the iterable. The specified seed value is used as the initial accumulator value, and the specified map function is used to project the result value from the accumulator value. This is a resolving operation, will cause a full loop through all the elements of the iterable.<br>
   *   Example:<br>
   *     ```
   *     fluent(['anchor', 'almond', 'bound', 'alpine']).reduceAndMap(
   *       (current, next) => (next.length < current.minValue ? { min: next, minValue: next.length } : current),
   *       {
   *         min: undefined as (string | undefined),
   *         minValue: Number.MAX_VALUE
   *       },
   *       acc => acc.min
   *     )
   *     ``` returns *bound*, the shortest word in the iterable.
   * @typeparam A The type of the accumulator value.
   * @typeparam R The type of the aggregation result.
   * @param reducer The accumulator function, provides the next accumulator value out of the last accumulator value and the next element in the iterable.
   * @param initial The initial (aka *seed*) value of the accumulator.
   * @param result The mapping function, projects the accumulator value of type `A` to the result value of type `R`.
   * @returns The aggregated value.
   */
  <A, R extends keyof A, T = any>(reducer: Reducer<T, A>, initial: A, result: R): (it: Iterable<T>) => A[R];
}

export interface AsyncReduceAndMapFunction {
  /**
   * Aggregates the iterable by applying an asynchronous accumulator function over the elements of the iterable. The specified seed value is used as the initial accumulator value, and the specified asynchronous map function is used to project the result value from the accumulator value. This is a resolving operation, will cause a full loop through all the elements of the iterable.
   * @typeparam A The type of the accumulator value.
   * @typeparam R The type of the aggregation result.
   * @param reducer The asynchronous accumulator function, provides the next accumulator value out of the last accumulator value and the next element in the iterable.
   * @param initial The initial (aka *seed*) value of the accumulator.
   * @param result The asynchronous mapping function, projects the accumulator value of type `A` to the result value of type `R`.
   * @returns A promise of the aggregated value.
   */
  <A, R, T = any>(
    reducer: AsyncReducer<T, A>,
    initial: A,
    result: AsyncMapper<A, R>,
  ): (it: AnyIterable<T>) => Promise<R>;

  /**
   * Aggregates the iterable by applying an asynchronous accumulator function over the elements of the iterable. The specified seed value is used as the initial accumulator value, and the specified asynchronous map function is used to project the result value from the accumulator value. This is a resolving operation, will cause a full loop through all the elements of the iterable.
   * @typeparam A The type of the accumulator value.
   * @typeparam R The type of the aggregation result.
   * @param reducer The asynchronous accumulator function, provides the next accumulator value out of the last accumulator value and the next element in the iterable.
   * @param initial The initial (aka *seed*) value of the accumulator.
   * @param result The asynchronous mapping function, projects the accumulator value of type `A` to the result value of type `R`.
   * @returns A promise of the aggregated value.
   */
  <A, R extends keyof A, T = any>(
    reducer: AsyncReducer<T, A>,
    initial: A,
    result: R,
  ): (it: AnyIterable<T>) => Promise<A[R]>;
}
