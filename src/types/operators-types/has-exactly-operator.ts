import { AnyIterable } from 'augmentative-iterable';

export interface HasExactlyFunction {
  /**
   * Checks if the number of elements of the iterable is equal to the threshold using a projection. This is a partial resolving operation, will cause a partial or - if needed - a full loop through the elements of the iterable.
   * @param threshold The validation threshold
   * @returns True if the number of elements of the iterable is equal to threshold and false if its not;
   */
  <T = any>(expectedNumber: number): (it: Iterable<T>) => boolean;
}

export interface AsyncHasExactlyFunction {
  /**
   * Checks if the number of elements of the iterable is equal to the threshold using a projection. This is a partial resolving operation, will cause a partial or - if needed - a full loop through the elements of the iterable.
   * @param threshold The validation threshold
   * @returns True if the number of elements of the iterable is equal to threshold and false if its not;
   */
  <T = any>(expectedNumber: number): (it: AnyIterable<T>) => Promise<boolean>;
}
