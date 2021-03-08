import { AnyIterable } from 'augmentative-iterable';

export interface HasMoreThanFunction {
  /**
   * Checks if the number of elements of the iterable is more than the threshold using a projection. This is a partial resolving operation, will cause a partial or - if needed - a full loop through the elements of the iterable.
   * @param threshold The validation threshold
   * @returns True if the number of elements of the iterable is greater than the threshold and false if it is not.
   */
  <T = any>(threshold: number): (it: Iterable<T>) => boolean;
}

export interface AsyncHasMoreThanFunction {
  /**
   * Checks if the number of elements of the iterable is more than the threshold using a projection. This is a partial resolving operation, will cause a partial or - if needed - a full loop through the elements of the iterable.
   * @param threshold The validation threshold
   * @returns True if the number of elements of the iterable is greater than the threshold and false if it is not.
   */
   <T = any>(threshold: number): (it: AnyIterable<T>) => Promise<boolean>;
}
