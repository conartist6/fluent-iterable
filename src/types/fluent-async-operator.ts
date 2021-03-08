import * as f from './operators-types';

declare module './base' {
  interface FluentAsyncOperator {
    withIndex: f.AsyncWithIndexFunction;
    takeWhile: f.AsyncTakeWhileFunction;
    take: f.AsyncTakeFunction;
    skipWhile: f.AsyncSkipWhileFunction;
    skip: f.AsyncSkipFunction;
    map: f.AsyncMapFunction;
    filter: f.AsyncFilterFunction;
    partition: f.AsyncPartitionFunction;
    append: f.AsyncAppendFunction;
    prepend: f.AsyncPrependFunction;
    concat: f.AsyncConcatFunction;
    repeat: f.AsyncRepeatFunction;
    flatten: f.AsyncFlattenFunction;
    flatMap: f.AsyncFlattenFunction;
    sort: f.AsyncSortFunction;
    sortBy: f.AsyncSortByFunction;
    distinct: f.AsyncDistinctFunction;
    group: f.AsyncGroupFunction;
    execute: f.AsyncExecuteFunction;
    combine: f.AsyncCombineFunction;
    merge: f.AsyncMergeFunction;
    mergeCatching: f.AsyncMergeCatchingFunction;
    mergeEmitter: f.AsyncMergeEmitterFunction;
    mergeEmitterCatching: f.AsyncMergeEmitterCatchingFunction;
    flatMerge: f.FlatMergeFunction;
    whenEmpty: f.AsyncWhenEmptyFunction;
    catch: f.AsyncCatchFunction;
  }
}
