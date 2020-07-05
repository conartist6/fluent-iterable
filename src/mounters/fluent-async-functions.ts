import {
  anyAsync,
  appendAsync,
  avgAsync,
  prependAsync,
  groupAsync,
  joinAsync,
  distinctAsync,
  executeAsync,
  firstAsync,
  flattenAsync,
  skipWhileAsync,
  toObjectAsync,
  allAsync,
  reduceAndMapAsync,
  lastAsync,
  repeatAsync,
  skipAsync,
  sortAsync,
  toArrayAsync,
  takeAsync,
  withIndexAsync,
  concatAsync,
  hasExactlyAsync,
  hasLessThanAsync,
  hasMoreThanAsync,
  countAsync,
  reduceAsync,
  topAsync,
  minAsync,
  maxAsync,
  sumAsync,
  containsAsync,
} from '../async';
import {
  forEachAsync,
  takeWhileAsync,
  filterAsync,
  mapAsync,
  merge,
  mergeCatching,
  partitionAsync,
} from '../async-base';

export const asyncHelper = {
  withIndex: withIndexAsync,
  takeWhile: takeWhileAsync,
  take: takeAsync,
  skipWhile: skipWhileAsync,
  skip: skipAsync,
  map: mapAsync,
  filter: filterAsync,
  partition: partitionAsync,
  append: appendAsync,
  prepend: prependAsync,
  concat: concatAsync,
  repeat: repeatAsync,
  flatten: flattenAsync,
  sort: sortAsync,
  distinct: distinctAsync,
  count: countAsync,
  first: firstAsync,
  last: lastAsync,
  reduceAndMap: reduceAndMapAsync,
  reduce: reduceAsync,
  all: allAsync,
  any: anyAsync,
  contains: containsAsync,
  toArray: toArrayAsync,
  toObject: toObjectAsync,
  forEach: forEachAsync,
  execute: executeAsync,
  join: joinAsync,
  sum: sumAsync,
  avg: avgAsync,
  top: topAsync,
  min: minAsync,
  max: maxAsync,
  hasExactly: hasExactlyAsync,
  hasLessThan: hasLessThanAsync,
  hasMoreThan: hasMoreThanAsync,
  merge,
  mergeCatching,
};

export const asyncIterableFuncs = {
  withIndex: withIndexAsync,
  takeWhile: takeWhileAsync,
  takeWhileAsync,
  take: takeAsync,
  skipWhile: skipWhileAsync,
  skipWhileAsync,
  skip: skipAsync,
  map: mapAsync,
  mapAsync,
  filter: filterAsync,
  filterAsync,
  append: appendAsync,
  prepend: prependAsync,
  concat: concatAsync,
  repeat: repeatAsync,
  flatten: flattenAsync,
  flattenAsync,
  sort: sortAsync,
  distinct: distinctAsync,
  distinctAsync,
  group: groupAsync,
  groupAsync,
  execute: executeAsync,
  executeAsync,
  merge,
};

export const asyncSpecial = {
  partition: partitionAsync,
  group: groupAsync,
  groupAsync,
};

export const asyncResolvingFuncs = {
  count: countAsync,
  first: firstAsync,
  last: lastAsync,
  reduceAndMap: reduceAndMapAsync,
  reduce: reduceAsync,
  all: allAsync,
  any: anyAsync,
  contains: containsAsync,
  toArray: toArrayAsync,
  toObject: toObjectAsync,
  forEach: forEachAsync,
  join: joinAsync,
  sum: sumAsync,
  avg: avgAsync,
  top: topAsync,
  min: minAsync,
  max: maxAsync,
  hasExactly: hasExactlyAsync,
  hasLessThan: hasLessThanAsync,
  hasMoreThan: hasMoreThanAsync,
};
