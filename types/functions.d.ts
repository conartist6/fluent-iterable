import { AnyIterable } from 'augmentative-iterable';
import { FluentAsyncIterable, FluentEmitOptions, FluentIterable, Pager } from './base';
import { EventEmitter  } from 'stream';

/**
 * Tranforms an iterable into a [[FluentIterable]].
 * @typeparam T The type of the items in the iterable.
 * @param iterable The iterable instance.
 * @returns The [[FluentIterable]] instance.
 */
export function fluent<T>(iterable: Iterable<T>): FluentIterable<T>;

/**
 * Tranforms an asynchronous iterable into a [[FluentAsyncIterable]].
 * @typeparam T The type of the items in the async iterable.
 * @param iterable The asynchronous iterable instance.
 * @returns The [[FluentAsyncIterable]] instance.
 */
export function fluentAsync<T>(
  iterable: AnyIterable<T> | PromiseLike<AnyIterable<T>>,
): FluentAsyncIterable<T>;

/**
 * Tranforms an object into a [[FluentIterable<K,V>]].
 * @typeparam T The type of the object to ve transformed.
 * @param iterable The object instance.
 * @returns The [[FluentIterable]] instance.
 */
export function fluentObject<T extends object, K extends keyof T>(
  iterable: T,
): FluentIterable<[K, T[K]]>;
/**
 * Transforms an EventEmitter into a [[FluentAsyncIterable]].
 *
 *
 * **IMPORTANT**: the AsyncIterable created from the EventEmitter is always based on a key event which every
 * emission generates a new yielded result. The default key event is **'data'**.
 *
 * Also, the generated AsyncIterable will be infinite unless an ending event is emitted at some point.
 * The defaults ending events are **'end'** and **'close'**. So, it's important to have in mind this behavior
 * to use this feature properly. Operations that requires finiteness to be used may fall into an infinite loop.
 *
 * If you need to change the key event or other characteristics, you can do it through the **options** parameter
 * @typeparam T The type of the items in the created FluentAsyncIterable.
 * @param emitter The EventEmitter
 * @param options The EventEmitter options. Optional
 * @returns The [[FluentAsyncIterable]] instance.
 */
 export function fluentEmit<T = any>(
  emitter: EventEmitter,
  options?: FluentEmitOptions,
): FluentAsyncIterable<T>;

/**
 * Translate a paginated resource into a non-paginated iterable of elements.
 * @typeparam T The type of the elements of the page.
 * @typeparam TToken The type of the next page token associated to the page.
 * @param pager Represents the way of retrieving pages from the paginated resource.
 * @returns The iterable representing a steady flow of elements from the paginated resource.
 */
export function depaginate<T, TToken>(
  pager: Pager<T, TToken>,
): AsyncIterable<T>;
