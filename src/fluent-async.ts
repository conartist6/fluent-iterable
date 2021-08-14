import { FluentAsyncIterable } from '../types';
import { FluentEmitOptions } from '../types/base';
import {
  asyncIterableFuncs,
  asyncResolvingFuncs,
  asyncSpecial,
} from './mounters';
import { mountIterableFunctions, mountSpecial } from './mounters';
import { AnyIterable } from 'augmentative-iterable';
import { iterateAsync } from './utils';
import { extend } from 'extension-methods';
import { EventEmitter } from 'events';
import { getIterableFromEmitter } from './emitter';
import { fluentSymbolAsync, getFluent } from './types-internal';
import { asyncHandler, asyncProxyReference } from './async-handler';
import { internalAsyncWrapper, internalWrapper } from './internal-wrapper';

function fluentAsync<T>(
  iterable: AnyIterable<T> | PromiseLike<AnyIterable<T>>,
): FluentAsyncIterable<T> {
  return getFluent(iterateAsync(iterable), asyncHandler, fluentSymbolAsync);
}

function fluentEmit<T = any>(
  emitter: EventEmitter,
  options?: FluentEmitOptions,
): FluentAsyncIterable<T> {
  return extend(
    getIterableFromEmitter<T>(emitter, options),
    asyncHandler,
  ) as any;
}

Object.assign(asyncProxyReference, {
  ...mountIterableFunctions(asyncIterableFuncs, internalAsyncWrapper),
  ...mountSpecial(asyncSpecial, internalAsyncWrapper, internalAsyncWrapper),
  ...asyncResolvingFuncs,
  fluent: fluentSymbolAsync,
});

export { fluentAsync, fluentEmit };
