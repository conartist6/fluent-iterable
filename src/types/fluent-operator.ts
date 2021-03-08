import * as f from './operators';

declare module './base' {
  interface FluentOperator {
    withIndex: f.WithIndexFunction;
    takeWhile: f.TakeWhileFunction;
    take: f.TakeFunction;
    skipWhile: f.SkipWhileFunction;
    skip: f.SkipFunction;
    map: f.MapFunction;
    mapAsync: f.AsyncMapFunction;
    filter: f.FilterFunction;
    partition: f.PartitionFunction;
    append: f.AppendFunction;
    prepend: f.PrependFunction;
    concat: f.ConcatFunction;
    repeat: f.RepeatFunction;
    flatten: f.FlattenFunction;
    flatMap: f.FlattenFunction;
    sort: f.SortFunction;
    sortBy: f.SortByFunction;
    distinct: f.DistinctFunction;
    group: f.GroupFunction;
    groupAsync: f.AsyncGroupFunction;
    execute: f.ExecuteFunction;
    combine: f.CombineFunction;
    flatMerge: f.FlatMergeFunction;
    whenEmpty: f.WhenEmptyFunction;
    catch: f.CatchFunction;
  }
}
