import { AnyIterable } from 'augmentative-iterable';
import { ErrorCallback } from '../base';
import { FluentAsyncIterable } from '../base';

export interface AsyncMergeCatchingFunction {
  /**
   * Merge the iterable with the informed ones, catching the errors of any of the iterables that fails, so the process can continue until all the successful iterables ends.
   * @param errorCallback A callback to be called if any of the iterables fail
   * @param iterables The iterables to be merged
   * @returns A new iterable that returns the elements of all others in the order of which resolves first
   */
  <It extends AnyIterable<T>, T, R>(
    errorCallback: ErrorCallback,
    ...iterables: AsyncIterable<R>[]
  ): (this: It) => AsyncIterable<T | R>;
}
