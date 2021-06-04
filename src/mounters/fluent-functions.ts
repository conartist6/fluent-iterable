import {
  any,
  contains,
  count,
  emit,
  first,
  hasExactly,
  hasLessOrExactly,
  hasLessThan,
  hasMoreOrExactly,
  hasMoreThan,
  toObject,
  toAsync,
  join,
  max,
  min,
  reduce,
  repeat,
  sum,
  take,
  top,
  withIndex,
  skipWhile,
  skip,
  append,
  prepend,
  concat,
  flatMerge,
  flatten,
  sort,
  sortBy,
  distinct,
  group,
  last,
  all,
  toArray,
  toMap,
  execute,
  avg,
  reduceAndMap,
  waitAll,
  combine,
  partition,
  forEach,
  map,
  filter,
  takeWhile,
  isDistinct,
  whenEmpty,
  catchSync,
  next,
} from '../sync';
import {
  allAsync,
  avgAsync,
  anyAsync,
  concatAsync,
  countAsync,
  firstAsync,
  groupAsync,
  joinAsync,
  lastAsync,
  reduceAsync,
  distinctAsync,
  executeAsync,
  flattenAsync,
  reduceAndMapAsync,
  skipWhileAsync,
  toObjectAsync,
  topAsync,
  minAsync,
  maxAsync,
  sumAsync,
  combineAsync,
  forEachAsync,
  mapAsync,
  filterAsync,
  takeWhileAsync,
  isDistinctAsync,
  toMapAsync,
} from '../async';
import { combineEmitter, concatEmitter } from '../emitter';
import * as common from '../common';
import { catchAsync } from '../async-base';

export const iterableFuncs = {
  ...common,
  withIndex,
  takeWhile,
  take,
  skipWhile,
  skip,
  map,
  filter,
  append,
  prepend,
  concat,
  repeat,
  flatten,
  flatMap: flatten,
  sort,
  sortBy,
  distinct,
  execute,
  combine,
  whenEmpty,
  catch: catchSync,
};

export const iterableAsyncFuncs = {
  concatAsync,
  takeWhileAsync,
  skipWhileAsync,
  mapAsync,
  filterAsync,
  flattenAsync,
  flatMerge,
  flatMapAsync: flattenAsync,
  distinctAsync,
  executeAsync,
  toAsync,
  combineAsync,
  combineEmitter,
  concatEmitter,
  catchAsync,
};

export const special = {
  partition,
  group,
  groupAsync,
  next,
};

export const resolvingFuncs = {
  count,
  countAsync,
  emit,
  first,
  firstAsync,
  last,
  lastAsync,
  reduceAndMap,
  reduceAndMapAsync,
  reduce,
  reduceAsync,
  all,
  allAsync,
  every: all,
  everyAsync: allAsync,
  any,
  anyAsync,
  some: any,
  someAsync: anyAsync,
  contains,
  toArray,
  toObject,
  toObjectAsync,
  forEach,
  forEachAsync,
  join,
  joinAsync,
  sum,
  sumAsync,
  avg,
  avgAsync,
  top,
  topAsync,
  min,
  minAsync,
  max,
  maxAsync,
  hasExactly,
  hasLessOrExactly,
  hasLessThan,
  hasMoreOrExactly,
  hasMoreThan,
  waitAll,
  isDistinct,
  isDistinctAsync,
  next,
  toMap,
  toMapAsync,
};
