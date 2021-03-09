import fluent from './fluent';
import { FluentIterable } from './types';

export function rawInterval(
  fromInclusive: number | undefined,
  count: number | undefined,
): Iterable<number> {
  let value = fromInclusive || 0;
  if (count === undefined) {
    const done = false;
    return {
      [Symbol.iterator]: () => ({
        next() {
          value++;
          return {
            value,
            done,
          };
        },
      }),
    };
  } else {
    const to = count + value;
    return {
      [Symbol.iterator]: () => ({
        next() {
          const done = value >= to;
          value++;
          return {
            value,
            done,
          };
        },
      }),
    };
  }
}

/**
 * Generates a `count` long sequential integer interval starting from `fromInclusive`.
 *
 * * The interval starts at zero if `fromInclusive` is not specified.
 * * The interval ends in infinity if `count` is not specified.
 *
 * Examples:
 *
 * 1. `interval(5, 3)` generates an interval of `[5, 6, 7]`
 * 2. `interval(5)` generates an interval of `[5, 6, 7, ...]`
 * 3. `interval()` generates an interval of `[0, 1, 2, ...]`
 * 4. `fluent(interval(1)).take(10).forEach(console.log)` prints all numbers between 1 and 10 using [[fluent]].
 * @param fromInclusive Specifies the start of the interval. Defaults to zero.
 * @param count Specifies the length of the interval. The interval provides numbers indefinitely if omitted.
 * @returns The iterable of numbers in the interval.
 */
export function interval(
  fromInclusive?: number,
  count?: number,
): FluentIterable<number> {
  return fluent(rawInterval(fromInclusive, count));
}
