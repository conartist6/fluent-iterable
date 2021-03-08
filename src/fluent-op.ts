import { iterableFuncs, special, resolvingFuncs } from './mounters';
import { FluentOperator } from './types';

const fluentOp = {} as FluentOperator;

Object.entries({
  ...iterableFuncs,
  ...resolvingFuncs,
  ...special,
}).forEach(([k, v]: [string, Function]) => {
  fluentOp[k as keyof FluentOperator] = (...args: any[]): any => (it: any) =>
    v.call(it, ...args);
});

export { fluentOp };
