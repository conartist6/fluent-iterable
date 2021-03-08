import { AnyIterable, AsyncMapper, Mapper } from 'augmentative-iterable';

export interface JoinFunction {
  /**
   * Projects and concatenates the elements of the iterable into a `string` using a separator. This is a resolving operation, will cause a full loop through all the elements of the iterable.<br>
   *   Examples:<br>
   *     * `fluent(['anchor', 'almond', 'bound', 'alpine']).join(', ')` returns *anchor, almond, bound, alpine*
   * @param separator The separator to use in between the elements of the iterable.
   * @param mapper The function which projects the elements of the iterable into `string`s. Falls back to the identity function if omitted.
   * @returns The concatenated string of the elements in the iterable.
   */
  <T = any>(separator: string, mapper?: Mapper<T, string>): (it: Iterable<T>) => string;

  /**
   * Projects and concatenates the elements of the iterable into a `string` using a separator. This is a resolving operation, will cause a full loop through all the elements of the iterable.<br>
   *   Examples:<br>
   *     * `fluent(['anchor', 'almond', 'bound', 'alpine']).join(', ')` returns *anchor, almond, bound, alpine*
   * @param separator The separator to use in between the elements of the iterable.
   * @param mapper The function which projects the elements of the iterable into `string`s. Falls back to the identity function if omitted.
   * @returns The concatenated string of the elements in the iterable.
   */
  <T = any>(separator: string, mapper?: keyof T): (it: Iterable<T>) => string;
}
export interface AsyncJoinFunction {
  /**
   * Asynchronously projects and concatenates the elements of the iterable into a `string` using a separator. This is a resolving operation, will cause a full loop through all the elements of the iterable.
   * @param separator The separator to use in between the elements of the iterable.
   * @param mapper The function which asynchronously projects the elements of the iterable into `string`s. Falls back to the identity function if omitted.
   * @returns A promise of the concatenated string of the elements in the iterable.
   */
  <T = any>(separator: string, mapper: AsyncMapper<T, string>): (it: AnyIterable<T>) => Promise<string>;

  /**
   * Asynchronously projects and concatenates the elements of the iterable into a `string` using a separator. This is a resolving operation, will cause a full loop through all the elements of the iterable.
   * @param separator The separator to use in between the elements of the iterable.
   * @param mapper The function which asynchronously projects the elements of the iterable into `string`s. Falls back to the identity function if omitted.
   * @returns A promise of the concatenated string of the elements in the iterable.
   */
  <T = any>(separator: string, mapper: keyof T): (it: AnyIterable<T>) => Promise<string>;
}
