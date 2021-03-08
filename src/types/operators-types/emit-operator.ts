import { AnyIterable } from 'augmentative-iterable';
import { FluentEmitter } from '../base';

export interface EmitFunction {
  /**
   * Converts the iterable into an EventEmitter. This is a resolving operation.
   *
   * This EventEmitter may emit three different events:
   *
   *
   * * data: for each item of the iterable;
   * * error: in case an error occurs. Notice that, if this method is not listened, the error will be thrown as unhandled;
   * * end: when the iterable ends. Notice that, if the iterable is infinite, this event will never be emitted.
   */
  <T = any>(): (it: Iterable<T>) => FluentEmitter<T>;
}

export interface AsyncEmitFunction{
  /**
   * Converts the iterable into an EventEmitter. This is a resolving operation.
   *
   * This EventEmitter may emit three different events:
   *
   *
   * * data: for each item of the iterable;
   * * error: in case an error occurs. Notice that, if this method is not listened, the error will be thrown as unhandled;
   * * end: when the iterable ends. Notice that, if the iterable is infinite, this event will never be emitted.
   */
  <T = any>(): (it: AnyIterable<T>) => FluentEmitter<T>;
}
