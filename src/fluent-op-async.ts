import { asyncIterableFuncs, asyncSpecial } from './mounters';
import { Equality, FluentAsyncOperator } from './types';
import { iterateAsync } from './utils';

const fluentOpAsync = {} as FluentAsyncOperator;

Object.entries({
  ...asyncIterableFuncs,
  group: asyncSpecial.group,
}).forEach(([k, v]: [string, Function]) => {
  fluentOpAsync[k as keyof FluentAsyncOperator] = (...args: any[]): any => (
    it: any,
  ) => v.call(it, ...args);
});
fluentOpAsync.partition = (criteria: number | Equality<any>): any => (
  it: any,
) => asyncSpecial.partition.call(iterateAsync(it), criteria);

export { fluentOpAsync };
