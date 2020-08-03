import fluentAsync from './fluent-async';
import { FluentIterable } from './types';
import {
  iterableFuncs,
  resolvingFuncs,
  iterableAsyncFuncs,
  special,
} from './mounters';
import { mountIterableFunctions, mountSpecial } from './mounters';
import { getExtender, extend, defaultCookFunction } from 'extension-methods';
import { identity } from './utils';
import { mutable, baseIterable } from 'augmentative-iterable';

export const proxyReference: { [key: string]: Function } = {};
export const mutableProxyReference: { [key: string]: Function } = {};
const handler = getExtender(proxyReference, defaultCookFunction, 'extender');
const mutableHandler = getExtender(
  mutableProxyReference,
  (f, _t, p) => {
    return f.bind(p);
  },
  'extender',
);

/**
 * Tranforms an iterable into a [[FluentIterable]].
 * @typeparam T The type of the items in the iterable.
 * @param iterable The iterable instance.
 * @returns The [[FluentIterable]] instance.
 */
function fluent<T>(iterable: Iterable<T>): FluentIterable<T> {
  console.log(iterable);
  return extend(iterable, handler) as any;
}

export function mFluent<T>(iterable: Iterable<T>): FluentIterable<T> {
  return (extend(mutable(iterable), mutableHandler) as unknown) as any;
}

Object.assign(proxyReference, {
  ...mountIterableFunctions(iterableFuncs, fluent),
  ...mountIterableFunctions(iterableAsyncFuncs, fluentAsync),
  ...resolvingFuncs,
  ...mountSpecial(special, fluent, fluentAsync),
});

function getParam2(a: any, b: any) {
  return b && a[baseIterable] === b[baseIterable] ? b : mFluent(a);
}

Object.assign(mutableProxyReference, {
  ...mountIterableFunctions(iterableFuncs, getParam2),
  ...mountIterableFunctions(iterableAsyncFuncs, fluentAsync),
  ...resolvingFuncs,
  ...mountSpecial(special, getParam2, fluentAsync),
});

export default fluent;
