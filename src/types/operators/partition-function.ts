import { Equality } from '../base';

export interface PartitionFunction {
  /**
   * Groups the elements of the iterable into partitions of a specified size.<br>
   *   Note: the last partition size can be smaller than the specified size.
   * @param criteria The expected size of the partitions or a equality to determine of two consecutive items must be in the same partition.
   * @returns The [[FluentAsyncIterable]] of partitions.
   */
  <It extends Iterable<T>, T>(criteria: number | Equality<T>): (
    it: It,
  ) => Iterable<Iterable<T>>;
}

export interface AsyncPartitionFunction {
  /**
   * Groups the elements of the iterable into partitions of a specified size.<br>
   *   Note: the last partition size can be smaller than the specified size.
   * @param criteria The expected size of the partitions or a equality to determine of two consecutive items must be in the same partition.
   * @returns The [[FluentAsyncIterable]] of partitions.
   */
  <It extends AsyncIterable<T>, T>(criteria: number | Equality<T>): (
    it: It,
  ) => AsyncIterable<AsyncIterable<T>>;
}
