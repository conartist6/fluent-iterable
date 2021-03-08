import { AnyIterable, AsyncMapper, Mapper } from 'augmentative-iterable';
import { ToObjectKeyType } from '../base';
import { ObjectResult, ObjectType } from '../function-types';

export interface ToObjectFunction {
  /**
   * Translates the iterable into an object using the elements of the iterable as representations of fields as specified by a key- and value selector. This is a resolving operation, will cause a full loop through all the elements of the iterable.<br>
   *   Examples:<br>
   *     * `fluent(['anchor', 'almond']).toObject(word => word)` returns `{ anchor: 'anchor', almond: 'almond' }`
   *     * `fluent([{ key: 'name', value: 'Peter Parker' }, { key: 'alias', value: 'SpiderMan' }]).toObject(item => item.key, item => item.value)` returns `{ name: 'Peter Parker', alias: 'SpiderMan' }`
   * @typeparam R The expected type of the object. Cannot be enforced, this is strictly informal.
   * @param keySelector Projects an element of the iterable into the key of the corresponding field.
   * @returns The object composed of the elements of the iterable as fields.
   */
  <R extends KeyType, T = any>(keySelector: Mapper<T, R>): (it: Iterable<T>) => Record<R, T>;

  /**
   * Translates the iterable into an object using the elements of the iterable as representations of fields as specified by a key- and value selector. This is a resolving operation, will cause a full loop through all the elements of the iterable.<br>
   *   Examples:<br>
   *     * `fluent(['anchor', 'almond']).toObject(word => word)` returns `{ anchor: 'anchor', almond: 'almond' }`
   *     * `fluent([{ key: 'name', value: 'Peter Parker' }, { key: 'alias', value: 'SpiderMan' }]).toObject(item => item.key, item => item.value)` returns `{ name: 'Peter Parker', alias: 'SpiderMan' }`
   * @typeparam R The expected type of the object. Cannot be enforced, this is strictly informal.
   * @param keySelector Projects an element of the iterable into the key of the corresponding field.
   * @param valueSelector Projects an element of the iterable into the value of the corresponding field. The identity function is being used if omitted.
   * @returns The object composed of the elements of the iterable as fields.
   */
  <R extends KeyType, O extends ObjectType<R>, T = any>(
    keySelector: Mapper<T, R>,
    valueSelector: Mapper<T, O[R]>,
  ): (it: Iterable<T>) => ObjectResult<R, O>;

  /**
   * Translates the iterable into an object using the elements of the iterable as representations of fields as specified by a key- and value selector. This is a resolving operation, will cause a full loop through all the elements of the iterable.<br>
   *   Examples:<br>
   * @typeparam R The expected type of the object. Cannot be enforced, this is strictly informal.
   * @param keySelector Projects an element of the iterable into the key of the corresponding field.
   * @returns The object composed of the elements of the iterable as fields.
   */
  <R1 extends keyof T, T = any>(keySelector: R1): (it: Iterable<T>) => Record<ToObjectKeyType<T, R1>, T>;

  /**
   * Translates the iterable into an object using the elements of the iterable as representations of fields as specified by a key- and value selector. This is a resolving operation, will cause a full loop through all the elements of the iterable.<br>
   *   Examples:<br>
   *     * `fluent(['anchor', 'almond']).toObject(word => word)` returns `{ anchor: 'anchor', almond: 'almond' }`
   *     * `fluent([{ key: 'name', value: 'Peter Parker' }, { key: 'alias', value: 'SpiderMan' }]).toObject(item => item.key, item => item.value)` returns `{ name: 'Peter Parker', alias: 'SpiderMan' }`
   * @typeparam R The expected type of the object. Cannot be enforced, this is strictly informal.
   * @param keySelector Projects an element of the iterable into the key of the corresponding field.
   * @param valueSelector Projects an element of the iterable into the value of the corresponding field. The identity function is being used if omitted.
   * @returns The object composed of the elements of the iterable as fields.
   */
  <R1 extends keyof T, R, T = any>(keySelector: R1, valueSelector: Mapper<T, R>): (it: Iterable<T>) => Record<
    ToObjectKeyType<T, R1>,
    R
  >;

  /**
   * Translates the iterable into an object using the elements of the iterable as representations of fields as specified by a key- and value selector. This is a resolving operation, will cause a full loop through all the elements of the iterable.<br>
   *   Examples:<br>
   *     * `fluent(['anchor', 'almond']).toObject(word => word)` returns `{ anchor: 'anchor', almond: 'almond' }`
   *     * `fluent([{ key: 'name', value: 'Peter Parker' }, { key: 'alias', value: 'SpiderMan' }]).toObject(item => item.key, item => item.value)` returns `{ name: 'Peter Parker', alias: 'SpiderMan' }`
   * @typeparam R The expected type of the object. Cannot be enforced, this is strictly informal.
   * @param keySelector Projects an element of the iterable into the key of the corresponding field.
   * @param valueSelector Projects an element of the iterable into the value of the corresponding field. The identity function is being used if omitted.
   * @returns The object composed of the elements of the iterable as fields.
   */
  <K extends string | symbol | number, R2 extends keyof T, T = any>(
    keySelector: Mapper<T, K>,
    valueSelector: R2,
  ): (it: Iterable<T>) => Record<K, T[R2]>;

  /**
   * Translates the iterable into an object using the elements of the iterable as representations of fields as specified by a key- and value selector. This is a resolving operation, will cause a full loop through all the elements of the iterable.<br>
   *   Examples:<br>
   *     * `fluent(['anchor', 'almond']).toObject(word => word)` returns `{ anchor: 'anchor', almond: 'almond' }`
   *     * `fluent([{ key: 'name', value: 'Peter Parker' }, { key: 'alias', value: 'SpiderMan' }]).toObject(item => item.key, item => item.value)` returns `{ name: 'Peter Parker', alias: 'SpiderMan' }`
   * @typeparam R The expected type of the object. Cannot be enforced, this is strictly informal.
   * @param keySelector Projects an element of the iterable into the key of the corresponding field.
   * @param valueSelector Projects an element of the iterable into the value of the corresponding field. The identity function is being used if omitted.
   * @returns The object composed of the elements of the iterable as fields.
   */
  <R1 extends keyof T, R2 extends keyof T, T = any>(
    keySelector: R1,
    valueSelector: R2,
  ): (it: Iterable<T>) => Record<ToObjectKeyType<T, R1>, T[R2]>;
}

export interface AsyncToObjectFunction {
  /**
   * Translates the iterable into an object using the elements of the iterable as representations of fields as specified by an asynchronous key- and value selector. This is a resolving operation, will cause a full loop through all the elements of the iterable.
   * @typeparam R The expected type of the object. Cannot be enforced, this is strictly informal.
   * @param keySelector Asynchronously projects an element of the iterable into the key of the corresponding field.
   * @returns A promise of the object composed of the elements of the iterable as fields.
   */
  <R extends KeyType, T = any>(keySelector: AsyncMapper<T, R>): (it: AnyIterable<T>) => Promise<Record<R, T>>;

  /**
   * Translates the iterable into an object using the elements of the iterable as representations of fields as specified by an asynchronous key- and value selector. This is a resolving operation, will cause a full loop through all the elements of the iterable.
   * @typeparam R The expected type of the object. Cannot be enforced, this is strictly informal.
   * @param keySelector Asynchronously projects an element of the iterable into the key of the corresponding field.
   * @param valueSelector Asynchronously projects an element of the iterable into the value of the corresponding field.
   * @returns A promise of the object composed of the elements of the iterable as fields.
   */
  <R extends KeyType, O extends ObjectType<R>, T = any>(
    keySelector: AsyncMapper<T, R>,
    valueSelector: AsyncMapper<T, O[R]>,
  ): (it: AnyIterable<T>) => Promise<ObjectResult<R, O>>;

  /**
   * Translates the iterable into an object using the elements of the iterable as representations of fields as specified by an asynchronous key- and value selector. This is a resolving operation, will cause a full loop through all the elements of the iterable.
   * @typeparam R The expected type of the object. Cannot be enforced, this is strictly informal.
   * @param keySelector Asynchronously projects an element of the iterable into the key of the corresponding field.
   * @returns A promise of the object composed of the elements of the iterable as fields.
   */
  <R1 extends keyof T, T = any>(keySelector: R1): (it: AnyIterable<T>) => Promise<
    Record<ToObjectKeyType<T, R1>, T>
  >;

  /**
   * Translates the iterable into an object using the elements of the iterable as representations of fields as specified by an asynchronous key- and value selector. This is a resolving operation, will cause a full loop through all the elements of the iterable.
   * @typeparam R The expected type of the object. Cannot be enforced, this is strictly informal.
   * @param keySelector Asynchronously projects an element of the iterable into the key of the corresponding field.
   * @param valueSelector Asynchronously projects an element of the iterable into the value of the corresponding field.
   * @returns A promise of the object composed of the elements of the iterable as fields.
   */
  <R1 extends keyof T, R, T = any>(
    keySelector: R1,
    valueSelector: AsyncMapper<T, R>,
  ): (it: Iterable<T>) => Promise<Record<ToObjectKeyType<T, R1>, R>>;
  /**
   * Translates the iterable into an object using the elements of the iterable as representations of fields as specified by an asynchronous key- and value selector. This is a resolving operation, will cause a full loop through all the elements of the iterable.
   * @typeparam R The expected type of the object. Cannot be enforced, this is strictly informal.
   * @param keySelector Asynchronously projects an element of the iterable into the key of the corresponding field.
   * @param valueSelector Asynchronously projects an element of the iterable into the value of the corresponding field.
   * @returns A promise of the object composed of the elements of the iterable as fields.
   */
  <K extends string | symbol | number, R2 extends keyof T, T = any>(
    keySelector: AsyncMapper<T, K>,
    valueSelector: R2,
  ): (it: Iterable<T>) => Promise<Record<K, T[R2]>>;

  /**
   * Translates the iterable into an object using the elements of the iterable as representations of fields as specified by an asynchronous key- and value selector. This is a resolving operation, will cause a full loop through all the elements of the iterable.
   * @typeparam R The expected type of the object. Cannot be enforced, this is strictly informal.
   * @param keySelector Asynchronously projects an element of the iterable into the key of the corresponding field.
   * @param valueSelector Asynchronously projects an element of the iterable into the value of the corresponding field.
   * @returns A promise of the object composed of the elements of the iterable as fields.
   */
  <R1 extends keyof T, R2 extends keyof T, T = any>(
    keySelector: R1,
    valueSelector: R2,
  ): (it: Iterable<T>) => Promise<Record<ToObjectKeyType<T, R1>, T[R2]>>;
}
