import { iterableFuncs } from './mounters';
import { FluentOperator } from './types';

const fluentOp = {} as FluentOperator;

Object.entries(iterableFuncs).forEach(([k, v]) => {
  if (!k.endsWith('Async')) {
    fluentOp[k as keyof FluentOperator] = (...args: any[]): any => (it: any) =>
      v(it, ...args);
  }
});

export { fluentOp };
