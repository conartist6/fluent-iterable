import { AnyIterable } from 'augmentative-iterable';

export interface AsyncMergeFunction {
  <T, R>(...iterables: AsyncIterable<R>[]): (
    it: AnyIterable<T>,
  ) => AsyncIterable<T | R>;
}
