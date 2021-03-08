import { FluentIterable, FluentAsyncIterable } from '../base';
import { AsyncCatchCallback, CatchCallback } from '../catch-callback';

export interface CatchFunction {
  <It extends Iterable<T>, T>(errorCallback: CatchCallback): (
    this: It,
  ) => Iterable<T>;
}
export interface AsyncCatchFunction {
  <It extends AsyncIterable<T>, T>(errorCallback: CatchCallback): (
    this: It,
  ) => AsyncIterable<T>;
}
