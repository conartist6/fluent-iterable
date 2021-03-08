import { Mapper } from 'augmentative-iterable';

export type Op<T, R> = Mapper<T, R>;

export function fluentPipe<T, A>(it: Iterable<T>, o1: Op<Iterable<T>, A>): A;
export function fluentPipe<T, A, B>(it: T, o1: Op<T, A>, o2: Op<A, B>): B;
export function fluentPipe<T, A, B, C>(
  it: T,
  o1: Op<T, A>,
  o2: Op<A, B>,
  o3: Op<B, C>,
): C;
export function fluentPipe<T, A, B, C, D>(
  it: T,
  o1: Op<T, A>,
  o2: Op<A, B>,
  o3: Op<B, C>,
  o4: Op<C, D>,
): D;
export function fluentPipe<T, A, B, C, D, E>(
  it: T,
  o1: Op<T, A>,
  o2: Op<A, B>,
  o3: Op<B, C>,
  o4: Op<C, D>,
  o5: Op<D, E>,
): E;
export function fluentPipe<T, A, B, C, D, E, F>(
  it: T,
  o1: Op<T, A>,
  o2: Op<A, B>,
  o3: Op<B, C>,
  o4: Op<C, D>,
  o5: Op<D, E>,
  o6: Op<E, F>,
): F;
export function fluentPipe<T, A, B, C, D, E, F, G>(
  it: T,
  o1: Op<T, A>,
  o2: Op<A, B>,
  o3: Op<B, C>,
  o4: Op<C, D>,
  o5: Op<D, E>,
  o6: Op<E, F>,
  o7: Op<F, G>,
): F;
export function fluentPipe<T>(it: T, ...ops: Function[]): any {
  let result: any = it;
  for (let i = 0; i < ops.length; i++) {
    result = ops[i](result);
  }

  return result;
}
