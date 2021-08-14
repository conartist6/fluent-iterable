/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-empty-function */
import { FluentAsyncIterable, FluentGroup, FluentIterable, Group } from './base';
import { AnyIterable, AsyncPredicate, Predicate } from 'augmentative-iterable';

/**
 * Returns exactly the informed parameter
 * @param param The informed parameter to be returned
 */
 export function identity<T>(param: T): T;

/**
 * @internal
 */
export function promiseIterateAsync<T>(
  a: PromiseLike<AnyIterable<T>>,
): AsyncIterable<T>;

/**
 * Iterates all element of an async iterable
 * @typeparam T the item type of the [[Iterable]]
 * @param a The async iterable
 */
 export function iterateAsync<T>(
  a: AnyIterable<T> | PromiseLike<AnyIterable<T>>,
): AsyncIterable<T>;

/**
 * Iterates in all elements of an async iterable of iterables or async iterables
 * @typeparam T the item type of the internal [[Iterable/AsyncIterable]]
 * @param a The async iterable
 */
 export function iterateAllAsync<T>(a: AsyncIterable<AnyIterable<T>>): AsyncIterable<T>;

/**
 * Iterates all element of an iterable
 * @typeparam T the item type of the [[Iterable]]
 * @param a The iterable
 */
 export const iterate: <T>(a: Iterable<T>) => Iterable<T>;

/**
 * Returns a function that always returns the informed value
 * @param value the constant value
 */
 export function constant<T>(value: T): () => T;

/**
 * Iterates in all elements of an iterable of iterables
 * @typeparam T the item type of the internal [[Iterable]]
 * @param a The iterable
 */
 export function iterateAll<T>(a: Iterable<Iterable<T>>): Iterable<T>;

/**
 * Iterates over all owned properties of the given object
 * @param obj The object to iterate with
 */
 export function iterateObjProps<T extends object>(obj: T): Iterable<keyof T>;

/**
 * Iterates over all owned entries of given object
 * @param obj The object to iterate with
 */
 export function iterateObjEntries<
  T extends object,
  K extends keyof T = keyof T,
  V extends T[K] = T[K]
>(obj: T): Iterable<[K, V]>;

/**
 * Provides a "equals" comparer
 * @typeparam T the type of b
 * @param b the value for comparison
 */
 export function eq<T>(b: any): (a: T) => boolean;

/**
 * Provides a "greater than" comparer
 * @typeparam T the type of b
 * @param b the value for comparison
 */
 export function gt<T>(b: any): (a: T) => boolean;

/**
 * Provides a "greater or equal" comparer
 * @typeparam T the type of b
 * @param b the value for comparison
 */
 export function ge<T>(b: any): (a: T) => boolean;

/**
 * Provides a "lesser than" comparer
 * @typeparam T the type of b
 * @param b the value for comparison
 */
 export function lt<T>(b: any): (a: T) => boolean;

/**
 * Provides a "lesser or equal" comparer
 * @typeparam T the type of b
 * @param b the value for comparison
 */
 export function le<T>(b: any): (a: T) => boolean;

/**
 * Provides an empty iterable
 */
 export function empty(): Iterable<undefined>;

/**
 * Provides an empty async iterable
 */
export function emptyAsync(): AsyncIterable<undefined>;

/**
 * Always returns true
 */
 export function truth(): boolean;

/**
 * Always returns false
 */
 export function falsity(): boolean;

/**
 * Provides a function that negates the informed predicate
 * @typeparam T the item type of the [[Predicate]]
 * @param predicate The predicate to be negated
 */
 export function negation<T>(predicate: Predicate<T>): Predicate<T>;

/**
 * Provides a function that negates the informed async predicate
 * @typeparam T the item type of the [[AsyncPredicate]]
 * @param predicate The async predicate to be negated
 */
 export function asyncNegation<T>(predicate: AsyncPredicate<T>): AsyncPredicate<T>;

/**
 * Convert a simple [[Group]] to a [[FluentGroup]]
 * @typeparam Key The type of the key
 * @typeparam Value the type of the items of the value property
 * @param {Group} grp the [[Group]] to be converted
 */
 export function fluentGroup<Key, Value>(
  grp: Group<Value, Key>,
): FluentGroup<Value, Key>;

/**
 * Returns a new instance of a function with a order assuring mark.
 * Fluent Iterable will treat order Assuring marked function as if
 * they're guaranteed to return ordered result in regard some iterable
 * where they're applied. The actual order, though, is of responsibility
 * of the code using this package.
 *
 * This is useful to have access to faster versions of some algorithms, but
 * the output may not match expectation if the resulting order is not actually right.
 *
 * @param f the function to assure order
 */
 export function assureOrder<
  F extends Function | FluentIterable<any> | FluentAsyncIterable<any>
>(f: F): F;

/**
 * Returns a new instance of a function with a descending order assuring mark.
 * Fluent Iterable will treat descending order assuring marked functions as if
 * they're guaranteed to return descending ordered results in regard some iterable
 * where they're applied. The actual order, though, is of responsibility
 * of the code using this package.
 *
 * This is useful to have access to faster versions of some algorithms, but
 * the output may not match expectation if the resulting order is not actually right.
 *
 * @param f the function to assure order
 */
 export function assureOrderDescending<
  F extends Function | FluentIterable<any> | FluentAsyncIterable<any>
>(f: F): F;

export function isValueType(f: any): boolean;

/**
 * Mark a field name or a mapper as ascending, for use with sortBy
 * @param f the mapper or the field name
 */
export function asc<F>(f: F): F;

/**
 * Mark a field name or a mapper as descending, for use with sortBy
 * @param f the mapper or the field name
 */
export function desc<F>(f: F): F;

export function isPromise(t: unknown): t is PromiseLike<any>;
