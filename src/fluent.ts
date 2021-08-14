import { fluentSymbol } from './types-internal/fluent-symbol';
import { FluentIterable } from '../types';
import {
  iterableFuncs,
  resolvingFuncs,
  iterableAsyncFuncs,
  special,
} from './mounters';
import { mountIterableFunctions, mountSpecial } from './mounters';
import { getFluent } from './types-internal';
import { internalAsyncWrapper, internalWrapper } from './internal-wrapper';
import { proxyReference, syncHandler } from './sync-handler';

function fluent<T>(iterable: Iterable<T>): FluentIterable<T> {
  return getFluent(iterable, syncHandler, fluentSymbol);
}

Object.assign(proxyReference, {
  ...mountIterableFunctions(iterableFuncs, internalWrapper),
  ...mountIterableFunctions(iterableAsyncFuncs, internalAsyncWrapper, true),
  ...resolvingFuncs,
  ...mountSpecial(special, internalWrapper, internalAsyncWrapper),
  fluent: fluentSymbol,
});

export default fluent;
