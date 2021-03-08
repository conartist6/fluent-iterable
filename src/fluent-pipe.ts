export type Operation<T, R> = (it: Iterable<T>) => R;


export function fluentPipe<T, A>(it: Iterable<T>, op: Operation<T, A>): A;
export function fluentPipe<T>(it: Iterable<T>, ...ops: Function[]): any {
  let result: any = it;
  ops.forEach((op) => {
    result = op(result);
  });

  return result;
}
