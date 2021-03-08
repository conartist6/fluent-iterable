import { AnyIterable } from 'augmentative-iterable';

export interface ConcatFunction {
  /**
   * Concatenates specified iterables to the iterable.<br>
   *   Example: `fluent(['anchor', 'almond']).concat(['bound', 'alpine'], ['book'])` yields *anchor*, *almond*, *bound*, *alpine* and *book*.
   * @param iterables The iterables to concatenate.
   * @returns The [[FluentIterable]] of the concatenated iterables.
   */
  <It extends Iterable<T>, T, R>(...iterables: Array<Iterable<R>>): (
    this: It,
  ) => Iterable<T | R>;
}
export interface AsyncConcatFunction {
  /**
   * Concatenates specified async iterables to the iterable.<br>
   *   Example: `fluent(['anchor', 'almond']).concat(['bound', 'alpine'], someStream)` yields *anchor*, *almond*, *bound*, *alpine* and the elements of the stream.
   * @param iterables The async iterables to concatenate.
   * @returns The [[FluentAsyncIterable]] of the concatenated async iterables.
   */
  <It extends AnyIterable<T>, T, R>(...iterables: Array<AnyIterable<R>>): (
    this: It,
  ) => AsyncIterable<T | R>;
}
