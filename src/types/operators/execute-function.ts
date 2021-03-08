import { AnyIterable } from 'augmentative-iterable';
import { Action, AsyncAction } from '../base';

export interface ExecuteFunction {
  /**
   * Translate an iterable into one which executes an action against each element before yield them.<br>
   *   Examples:<br>
   *     * `for (const element of fluent(['anchor', 'almond', 'bound', 'alpine']).execute(console.log)) { }` prints *anchor*, *almond*, *bound* and *alpine*
   *     * `fluent(['anchor', 'almond', 'bound', 'alpine']).execute(console.log).first()` prints *anchor* and returns the string *anchor*
   * @param action The action to execute against each element.
   * @returns The [[FluentIterable]] with the action injected to it.
   */
  <It extends Iterable<T>, T>(action: Action<T>): (it: It) => Iterable<T>;
}
export interface AsyncExecuteFunction {
  /**
   * Translate an iterable into one which executes an asynchronous action against each element before yield them.
   * @param action The asynchronous action to execute against each element.
   * @returns The [[FluentAsyncIterable]] with the action injected to it.
   */
  <It extends AnyIterable<T>, T>(action: AsyncAction<T>): (
    it: It,
  ) => AsyncIterable<T>;
}
