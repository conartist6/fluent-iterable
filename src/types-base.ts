import { FluentIterable } from './types';
/**
 * represent the options that can be used with fluentEmit
 */

export interface FluentEmitOptions {
  /**
   * The event which yields a new iterable item. Default 'data'
   */
  event?: string;
  /**
   * The event which throws an error. Default 'error'
   */
  error?: string;
  /**
   * The list of events which ends the iterable. Default ['end', 'close']
   */
  end?: string[];
  /**
   * The timeout for event awaiting. If specified, an error will be thrown when no event is emitted
   * before the deadline
   */
  timeout?: number;
}

export interface ErrorCallback {
  (error: Error, index: number): unknown;
}
/**
 * Represents a predicate on type `T`.<br>
 *   Example: `const evenNumber: Predicate<number> = n => (n % 2) === 0;`
 * @typeparam T The type the predicate is defined on.
 */
export interface Predicate<T> {
  /**
   * Evaluates an item of type `T`.
   * @param item The item evaluated.
   * @returns `true` if the predicate passed on `item`; otherwise `false`.
   */
  (item: T): any;
}
/**
 * Represents a reducer of type `T` into the accumulator type `A`.<br>
 *   Example: `const sumReducer: Reducer<number, number> = (sum, next) => sum + next;`
 * @typeparam T The source type.
 * @typeparam A The accumulator type.
 */
export interface Reducer<T, A> {
  /**
   * Generates the next accumulator item based on the previous one and the next item under reduce.
   * @param current The previous accumulator value.
   * @param next The next item.
   * @returns The new accumulator value.
   */
  (current: A, next: T): A;
}
/**
 * Represents an asynchronous reducer of type `T` into the accumulator type `A`.<br>
 *   Example: `const sumReducer: AsyncReducer<Channel, number> = async (sum, next) => sum + await getNumberOfMessages(next)`
 * @typeparam T The source type.
 * @typeparam A The accumulator type.
 */
export interface AsyncReducer<T, A> {
  /**
   * Asynchronously generates the next accumulator item based on the previous one and the next item under reduce.
   * @param current The previous accumulator value.
   * @param next The next item.
   * @returns A promise of the new accumulator value.
   */
  (current: A, next: T): Promise<A> | A;
}
/**
 * Compares two instances of type `T`.<br>
 *   Example: `const levelComparer: Comparer<User> = (userA, userB) => userA.level - userB.level;`
 * @typeparam T The type of the compared instances.
 */
export interface Comparer<T> {
  /**
   * Compares `a` and `b`.
   * @param a The first instance (the left hand side of the comparison).
   * @param b The second instance (the right hand side of the comparison).
   * @returns A number which represents the result of the comparison. If **negative**, `a` precedes `b`, if **positive**, `b` precedes `a`, if **zero**, `a` equals to `b` in the comparison.
   */
  (a: T, b: T): number;
}
/**
 * Represents an action on an item of type `T`.<br>
 *   Example: ``const logUserAction: Action<User> = user => console.log(`User ${user.name} (id: ${user.id})`);``
 * @typeparam T The type of the item the action is defined on.
 */
export interface Action<T> {
  /**
   * Specifies the action to perform on `item`.
   * @param item The item the action is performed against.
   */
  (item: T): void;
}
/**
 * Represents an asynchronous action on an item of type `T`.<br>
 *   Example: `const createUserAction: AsyncAction<User> = async user => await database.put(user);`
 * @typeparam T The type of the item the action is defined on.
 */
export interface AsyncAction<T> {
  /**
   * Specifies the asynchronous action to perform on `item`.
   * @param item The item the action is performed against.
   * @returns The promise of any action.
   */
  (item: T): Promise<unknown> | unknown;
}
/**
 * Represents a group of items of type `T` with a key of type `R`.
 * @typeparam T The type of the items in the [[Group]].
 * @typeparam R The type of the key of the [[Group]].
 */
export interface Group<T, R> {
  /**
   * The key of the [[Group]].
   */
  key: R;
  /**
   * The items in the [[Group]].
   */
  values: Iterable<T>;
}
/**
 * Represents a group of [[fluent]] items of type `T` with a key of type `R`.
 * @typeparam T The type of the items in the [[FluentGroup]].
 * @typeparam R The type of the key of the [[FluentGroup]].
 */
export interface FluentGroup<T, R> extends Group<T, R> {
  /**
   * The [[fluent]] items in the [[FluentGroup]].
   */
  values: FluentIterable<T>;
}
/**
 * Represents an indexed value of type `T`.
 * @typeparam T The type of the value the index is associated to.
 */
export interface Indexed<T> {
  /**
   * The index of the value.
   */
  idx: number;
  /**
   * The value.
   */
  value: T;
}

/**
 * A Function that controls the calculus of iterative means
 */
export interface AverageStepper {
  /**
   * Return the current avg/mean
   */
  readonly avg: number;

  /**
   * Calculates next avg
   * @param y the next number to be considered
   */
  step(y: number): number;
}
