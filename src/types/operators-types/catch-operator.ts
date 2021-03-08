import { AnyIterable } from 'augmentative-iterable';
import { CatchCallback } from '../catch-callback';

export interface CatchFunction {
  <T>(errorCallback: CatchCallback): (it: Iterable<T>) => Iterable<T>;
}
export interface AsyncCatchFunction {
  <T>(errorCallback: CatchCallback): (it: AnyIterable<T>) => AsyncIterable<T>;
}
