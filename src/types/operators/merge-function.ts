import { FluentAsyncIterable } from '../base';

export interface AsyncMergeFunction {
  <It extends AsyncIterable<T>, T, R>(...iterables: AsyncIterable<R>[]): (
    this: It,
  ) => AsyncIterable<T | R>;
}
