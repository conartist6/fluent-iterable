import { AnyIterable, AsyncMapper } from 'augmentative-iterable';

export interface WaitAllFunction {
  /**
   * Applies a async transformation for every element in the array and, then, wait for they conclusion with Promise.all. This is a resolving operation.
   * @param mapper The asynchronous function which projects the elements of the iterable into promises.
   * @returns a promises that resolves into an array with the result of all mappings.
   */
  <R, T = any>(mapper: AsyncMapper<T, R>): (it: Iterable<T>) => PromiseLike<R[]>;

  /**
   * Applies a async transformation for every element in the array and, then, wait for they conclusion with Promise.all. This is a resolving operation.
   * @param mapper The asynchronous function which projects the elements of the iterable into promises.
   * @returns a promises that resolves into an array with the result of all mappings.
   */
  <R extends keyof T, T = any>(mapper: R): (it: Iterable<T>) => PromiseLike<T[R][]>;
}

export interface AsyncWaitAllFunction<T> {
  /**
   * Applies a async transformation for every element in the array and, then, wait for they conclusion with Promise.all. This is a resolving operation.
   * @param mapper The asynchronous function which projects the elements of the iterable into promises.
   * @returns a promises that resolves into an array with the result of all mappings.
   */
  <R, T = any>(mapper: AsyncMapper<T, R>): (it: AnyIterable<T>) => PromiseLike<R[]>;

  /**
   * Applies a async transformation for every element in the array and, then, wait for they conclusion with Promise.all. This is a resolving operation.
   * @param mapper The asynchronous function which projects the elements of the iterable into promises.
   * @returns a promises that resolves into an array with the result of all mappings.
   */
  <R extends keyof T, T = any>(mapper: R): (it: AnyIterable<T>) => PromiseLike<T[R][]>;
}
