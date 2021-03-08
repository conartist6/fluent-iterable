import { AnyIterable, AsyncMapper, Mapper } from 'augmentative-iterable';
import { AsyncItemType, ItemType } from '../base';
import { FluentAsyncIterable, FluentIterable } from '../base';

export interface FlattenFunction {
  /**
   * Projects each element of the iterable to an iterable and flattens the resulting iterable into one iterable.<br>
   * Examples:<br>
   *   * `fluent([['anchor', 'almond'], ['bound', 'alpine']]).flatten()` yields *anchor*, *almond*, *bound* and *alpine*.<br>
   * @typeparam R The type of the elements in the inner iterable.
   * @returns The [[FluentIterable]] of the flattened iterable.
   */
  <It extends Iterable<T>, T, R extends ItemType<T>>(): (it: It) => Iterable<R>;

  /**
   * Projects each element of the iterable to an iterable and flattens the resulting iterable into one iterable.<br>
   * Examples:<br>
   *   * `fluent([['anchor', 'almond'], ['bound', 'alpine']]).flatten()` yields *anchor*, *almond*, *bound* and *alpine*.<br>
   *   * `fluent([ { values: ['anchor', 'almond'] }, { values: ['bound', 'alpine'] }]).flatten(obj => obj.values)` yields *anchor*, *almond*, *bound* and *alpine*.
   * @typeparam R The type of the elements in the inner iterable.
   * @param mapper Specifies the projection from the elements of `T` to iterables of `R`. Identity mapping is applied (taking the elements as iterables) if omitted.
   * @returns The [[FluentIterable]] of the flattened iterable.
   */
  <It extends Iterable<T>, T, R>(mapper: Mapper<T, Iterable<R>>): (
    it: It,
  ) => Iterable<R>;
  /**
   * Projects each element of the iterable to an iterable and flattens the resulting iterable into one iterable.<br>
   * Examples:<br>
   *   * `fluent([ { values: ['anchor', 'almond'] }, { values: ['bound', 'alpine'] }]).flatten(obj => obj.values)` yields *anchor*, *almond*, *bound* and *alpine*.
   * @typeparam R The type of the elements in the inner iterable.
   * @param mapper Specifies the projection from the elements of `T` to iterables of `R`. Identity mapping is applied (taking the elements as iterables) if omitted.
   * @returns The [[FluentIterable]] of the flattened iterable.
   */
  <It extends Iterable<T>, T, K extends keyof T, R extends ItemType<T[K]>>(
    mapper: K,
  ): (this: It) => Iterable<R>;
}

export interface AsyncFlattenFunction {
  /**
   * Projects each element of the iterable to an iterable and flattens the resulting iterable into one iterable.<br>
   * Examples:<br>
   *   * `fluent([['anchor', 'almond'], ['bound', 'alpine']]).flatten()` yields *anchor*, *almond*, *bound* and *alpine*.<br>
   * @typeparam R The type of the elements in the inner iterable.
   * @returns The [[FluentIterable]] of the flattened iterable.
   */
  <It extends AnyIterable<T>, T, R extends ItemType<T>>(): (
    it: It,
  ) => AsyncIterable<R>;
  /**
   * Asynchronously projects each element of the iterable to an iterable and flattens the resulting iterable into one iterable.
   * @typeparam R The type of the elements in the inner iterable.
   * @param mapper Specifies the asynchronous projection from the elements of `T` to iterables of `R`.
   * @returns The flattened [[FluentAsyncIterable]].
   */
  <It extends AnyIterable<T>, T, R>(mapper: AsyncMapper<T, Iterable<R>>): (
    it: It,
  ) => AsyncIterable<R>;
  /**
   * Asynchronously projects each element of the iterable to an iterable and flattens the resulting iterable into one iterable.
   * @typeparam R The type of the elements in the inner iterable.
   * @param mapper Specifies the asynchronous projection from the elements of `T` to iterables of `R`.
   * @returns The flattened [[FluentAsyncIterable]].
   */
  <
    It extends AnyIterable<T>,
    T,
    K extends keyof T,
    R extends AsyncItemType<T[K]>
  >(
    mapper?: K,
  ): (this: It) => AsyncIterable<R>;
}
