import {
  o,
  identity,
  od,
  getGroupingDistinct,
  fluentPipe,
  fluentOpAsync,
} from '../src';
import expect, { flatMap } from './tools';
import 'chai-callslike';
import { stub } from 'chai-callslike';
import { Person, data, picker } from './fluent.spec';

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  NonBinary = 'NonBinary',
}

function* generator(): Iterable<Person> {
  yield* data;
}

const additionalPerson: Person = {
  name: 'name',
  gender: Gender.NonBinary,
  emails: ['name@email.com'],
};

async function fromAsync<T>(it: AsyncIterable<T>) {
  const result: T[] = [];
  for await (const item of it) {
    result.push(item);
  }

  return result;
}

describe('fluent iterable', () => {
  const suite = (createSubject: () => Iterable<Person>) => () => {
    let subject: Iterable<Person>;

    beforeEach(() => (subject = createSubject()));

    describe('synchronous', () => {
      context('withIndex', () => {
        it('should return Indexed instances from informed array', async () => {
          const test = fluentPipe(['a', 'b', 'c'], fluentOpAsync.withIndex());
          expect(await fromAsync(test)).to.be.eql([
            { idx: 0, value: 'a' },
            { idx: 1, value: 'b' },
            { idx: 2, value: 'c' },
          ]);
        });
      });
      context('takeWhile', () => {
        it('works with initially not true statement', async () =>
          expect(
            await fromAsync(
              fluentPipe(
                subject,
                fluentOpAsync.takeWhile((p) => p.emails.length > 0),
              ),
            ),
          ).to.be.empty);
        it('works with eventually not true statement', async () => {
          expect(
            await fromAsync(
              fluentPipe(
                subject,
                fluentOpAsync.takeWhile((p) => p.gender === undefined),
              ),
            ),
          ).to.eql(data.slice(0, 3));
        });
        it('works with always true statement', async () => {
          expect(
            await fromAsync(
              fluentPipe(
                subject,
                fluentOpAsync.takeWhile((p) => p.name.length > 0),
              ),
            ),
          ).to.eql(data);
        });
        it('should work with key string parameter', async () => {
          expect(
            await fromAsync(
              fluentPipe(
                [{ a: 1 }, { a: 2 }, { a: 0 }, { a: 1 }],
                fluentOpAsync.takeWhile('a'),
              ),
            ),
          ).to.eql([{ a: 1 }, { a: 2 }]);
        });
      });
      context('take', () => {
        it('works with negative count', async () =>
          expect(await fromAsync(fluentPipe(subject, fluentOpAsync.take(-5))))
            .to.be.empty);
        it('works with zero count', async () =>
          expect(await fromAsync(fluentPipe(subject, fluentOpAsync.take(0)))).to
            .be.empty);
        it('works with one count', async () =>
          expect(
            await fromAsync(fluentPipe(subject, fluentOpAsync.take(1))),
          ).to.eql(data.slice(0, 1)));
        it('works with count < length', async () =>
          expect(
            await fromAsync(fluentPipe(subject, fluentOpAsync.take(5))),
          ).to.eql(data.slice(0, 5)));
        it('works with count = length', async () =>
          expect(
            await fromAsync(
              fluentPipe(subject, fluentOpAsync.take(data.length)),
            ),
          ).to.eql(data));
        it('works with count > length', async () =>
          expect(
            await fromAsync(
              fluentPipe(subject, fluentOpAsync.take(data.length * 2)),
            ),
          ).to.eql(data));
      });
      context('skipWhile', () => {
        it('works with initially not true statement', async () =>
          expect(
            await fromAsync(
              fluentPipe(
                subject,
                fluentOpAsync.skipWhile((p) => p.emails.length > 0),
              ),
            ),
          ).to.eql(data));
        it('works with eventually not true statement', async () =>
          expect(
            await fromAsync(
              fluentPipe(
                subject,
                fluentOpAsync.skipWhile((p) => p.gender === undefined),
              ),
            ),
          ).to.eql(data.slice(3)));
        it('works with always true statement', async () =>
          expect(
            await fromAsync(
              fluentPipe(
                subject,
                fluentOpAsync.skipWhile((p) => p.name.length > 0),
              ),
            ),
          ).to.be.empty);
        it('works with alternating true statement', async () =>
          expect(
            await fromAsync(
              fluentPipe(
                subject,
                fluentOpAsync.skipWhile((p) => p.emails.length === 0),
              ),
            ),
          ).to.eql(data.slice(1)));
        it('should work with key string parameter', async () => {
          expect(
            await fromAsync(
              fluentPipe(
                [
                  { a: 1, b: 1 },
                  { a: 1, b: 2 },
                  { a: 0, b: 3 },
                  { a: 1, b: 4 },
                ],
                fluentOpAsync.skipWhile('a'),
              ),
            ),
          ).to.eql([
            { a: 0, b: 3 },
            { a: 1, b: 4 },
          ]);
        });
      });
      context('skip', () => {
        it('works with negative count', async () =>
          expect(
            await fromAsync(fluentPipe(subject, fluentOpAsync.skip(-5))),
          ).to.eql(data));
        it('works with zero count', async () =>
          expect(
            await fromAsync(fluentPipe(subject, fluentOpAsync.skip(0))),
          ).to.eql(data));
        it('works with one count', async () =>
          expect(
            await fromAsync(fluentPipe(subject, fluentOpAsync.skip(1))),
          ).to.eql(data.slice(1)));
        it('works with count < length', async () =>
          expect(
            await fromAsync(fluentPipe(subject, fluentOpAsync.skip(5))),
          ).to.eql(data.slice(5)));
        it('works with count = length', async () =>
          expect(
            await fromAsync(
              fluentPipe(subject, fluentOpAsync.skip(data.length)),
            ),
          ).to.be.empty);
        it('works with count > length', async () =>
          expect(
            await fromAsync(
              fluentPipe(subject, fluentOpAsync.skip(data.length * 2)),
            ),
          ).to.be.empty);
      });
      describe('map', () => {
        it('maps to undefined', async () => {
          const res = await fromAsync(
            fluentPipe(
              subject,
              fluentOpAsync.map(() => undefined),
            ),
          );
          expect(res).to.length(data.length);
          res.forEach((item) => expect(item).to.be.undefined);
        });
        it('maps to projection', async () => {
          const res = await fromAsync(
            fluentPipe(
              subject,
              fluentOpAsync.map((p) => p.name),
            ),
          );
          expect(res).to.length(data.length);
          let idx = 0;
          for (const item of res) {
            expect(item).to.equal(data[idx++].name);
          }
        });
        it('should work with key string', async () => {
          const res = await fromAsync(
            fluentPipe(
              subject,
              fluentOpAsync.map((p) => p.name),
            ),
          );
          expect(res).to.length(data.length);
          let idx = 0;
          for (const item of res) {
            expect(item).to.equal(data[idx++].name);
          }
        });
        it('should work with key string parameter', async () => {
          expect(
            await fromAsync(
              fluentPipe(
                [
                  { a: 1, b: 1 },
                  { a: 1, b: 2 },
                  { a: Promise.resolve(0), b: 3 },
                  { a: 1, b: 4 },
                ],
                fluentOpAsync.map('b'),
              ),
            ),
          ).to.eql([1, 2, 3, 4]);
        });
      });
      describe('filter', () => {
        it('with always false predicate', async () =>
          expect(
            await fromAsync(
              fluentPipe(
                subject,
                fluentOpAsync.filter(() => false),
              ),
            ),
          ).to.be.empty);
        it('with always true predicate', async () =>
          expect(
            await fromAsync(
              fluentPipe(
                subject,
                fluentOpAsync.filter(() => true),
              ),
            ),
          ).to.eql(data));
        it('with alternating predicate', async () =>
          expect(
            await fromAsync(
              fluentPipe(
                subject,
                fluentOpAsync.filter((p) => p.gender === Gender.Female),
              ),
            ),
          ).to.eql(picker(4, 7, 10)));
        it('not assuring order', async () => {
          const call = stub();
          expect(
            await fromAsync(
              fluentPipe(
                [1, 2, 3, 4, 3],
                fluentOpAsync.filter((p) => {
                  call();
                  return 2 <= p && p <= 3;
                }),
              ),
            ),
          ).to.eql([2, 3, 3]);
          expect(call).to.have.callCount(5);
        });
        it('assuring order', async () => {
          const call = stub();
          expect(
            await fromAsync(
              fluentPipe(
                [1, 2, 3, 4, 3],
                fluentOpAsync.filter(
                  o((p) => {
                    call();
                    return 2 <= p && p <= 3;
                  }),
                ),
              ),
            ),
          ).to.eql([2, 3]);
          expect(call).to.have.callCount(4);
        });
        it('assuring order descending', async () => {
          const call = stub();
          expect(
            await fromAsync(
              fluentPipe(
                [1, 2, 3, 4, 3],
                fluentOpAsync.filter(
                  od((p) => {
                    call();
                    return 2 <= p && p <= 3;
                  }),
                ),
              ),
            ),
          ).to.eql([2, 3]);
          expect(call).to.have.callCount(4);
        });
        it('should work with key string parameter', async () => {
          expect(
            await fromAsync(
              fluentPipe(
                [
                  { a: 0, b: 1 },
                  { a: 1, b: 2 },
                  { a: 0, b: 3 },
                  { a: 1, b: 4 },
                ],
                fluentOpAsync.filter('a'),
                fluentOpAsync.map('b'),
              ),
            ),
          ).to.eql([2, 4]);
        });
        it('should guarantees that a possible falsy unique key is defined', async () => {
          interface Test {
            a?: number;
            b: string | null;
          }
          expect(
            (
              await fromAsync(
                fluentPipe(
                  [{ b: null, a: 1 }, { b: 'a' }, { a: 2, b: 'b' }] as Test[],
                  fluentOpAsync.filter('b'),
                  fluentOpAsync.filter('a'),
                  fluentOpAsync.map(
                    (x) => `${x.a.toFixed(2)} and ${x.b.length}`,
                  ),
                ),
              )
            )[0],
          ).to.be.eq('2.00 and 1');
        });
        it('should guarantees that a possible falsy unique key is defined explicitly', async () => {
          interface Test {
            a?: number;
            b: string | null;
          }
          expect(
            (
              await fromAsync(
                fluentPipe(
                  [{ b: null, a: 1 }, { b: 'a' }, { a: 2, b: 'b' }] as Test[],
                  fluentOpAsync.filter<'b' | 'a'>((x) => x.b && x.a),
                  fluentOpAsync.map(
                    (x) => `${x.a.toFixed(2)} and ${x.b.length}`,
                  ),
                ),
              )
            )[0],
          ).to.be.eq('2.00 and 1');
        });
        it('should return just the truthy values with correct typing', async () => {
          interface Test {
            a: number;
            b: string;
          }
          expect(
            await fromAsync(
              fluentPipe(
                [{ b: 'abc', a: 1 }, undefined, { a: 2, b: 'b' }] as (
                  | Test
                  | undefined
                )[],
                fluentOpAsync.filter(),
                fluentOpAsync.map((x) => `${x.a.toFixed(2)} and ${x.b.length}`),
              ),
            ),
          ).to.be.eql(['1.00 and 3', '2.00 and 1']);
        });
      });
      describe('partition', () => {
        it('should divide result in blocks of the specified size', async () => {
          expect(
            await fromAsync(
              fluentPipe(
                [1, 2, 3, 4, 5, 6, 7, 8],
                fluentOpAsync.partition(3),
                fluentOpAsync.map((x) => fromAsync(x)),
              ),
            ),
          ).to.be.eql([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8],
          ]);
        });
        it('should divide result in blocks of the specified size when input it not an array', async () => {
          expect(
            await fromAsync(
              fluentPipe(
                [1, 2, 3, 4, 5, 6, 7, 8][Symbol.iterator](),
                fluentOpAsync.partition(3),
                fluentOpAsync.map((x) => fromAsync(x)),
              ),
            ),
          ).to.be.eql([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8],
          ]);
        });
        it('should thrown an error when partition size is not valid', async () => {
          let error: any;
          try {
            await fromAsync(fluentPipe([], fluentOpAsync.partition(0)));
          } catch (err) {
            error = err;
          }
          expect(error).to.be.instanceOf(Error);
        });
      });
      describe('append', () => {
        it('with empty iterable', async () =>
          expect(
            await fromAsync(
              fluentPipe(
                [] as Person[],
                fluentOpAsync.append(additionalPerson),
              ),
            ),
          ).to.eql([additionalPerson]));
        it('with non-empty iterable', async () =>
          expect(
            await fromAsync(
              fluentPipe(subject, fluentOpAsync.append(additionalPerson)),
            ),
          ).to.eql([...data, additionalPerson]));
      });
      describe('prepend', () => {
        it('with empty iterable', async () =>
          expect(
            await fromAsync(
              fluentPipe(
                [] as Person[],
                fluentOpAsync.prepend(additionalPerson),
              ),
            ),
          ).to.eql([additionalPerson]));
        it('with non-empty iterable', async () =>
          expect(
            await fromAsync(
              fluentPipe(subject, fluentOpAsync.prepend(additionalPerson)),
            ),
          ).to.eql([additionalPerson, ...data]));
      });
      describe('concat', () => {
        it('one empty array', async () =>
          expect(
            await fromAsync(fluentPipe(subject, fluentOpAsync.concat([]))),
          ).to.eql(data));
        it('two empty arrays', async () =>
          expect(
            await fromAsync(fluentPipe(subject, fluentOpAsync.concat([], []))),
          ).to.eql(data));
        it('one non-empty arrays', async () =>
          expect(
            await fromAsync(
              fluentPipe(subject, fluentOpAsync.concat([additionalPerson])),
            ),
          ).to.eql([...data, additionalPerson]));
        it('two non-empty arrays', async () =>
          expect(
            await fromAsync(
              fluentPipe(
                subject,
                fluentOpAsync.concat([additionalPerson], data),
              ),
            ),
          ).to.eql([...data, additionalPerson, ...data]));
        it('one empty and one non-empty arrays', async () =>
          expect(
            await fromAsync(
              fluentPipe(subject, fluentOpAsync.concat([], [additionalPerson])),
            ),
          ).to.eql([...data, additionalPerson]));
      });
      describe('repeat', () => {
        it('negative number of times', async () =>
          expect(await fromAsync(fluentPipe(subject, fluentOpAsync.repeat(-5))))
            .to.be.empty);
        it('zero times', async () =>
          expect(await fromAsync(fluentPipe(subject, fluentOpAsync.repeat(0))))
            .to.be.empty);
        it('once', async () =>
          expect(
            await fromAsync(fluentPipe(subject, fluentOpAsync.repeat(1))),
          ).to.eql(data));
        it('twice', async () =>
          expect(
            await fromAsync(fluentPipe(subject, fluentOpAsync.repeat(2))),
          ).to.eql([...data, ...data]));
        it('three times', async () =>
          expect(
            await fromAsync(fluentPipe(subject, fluentOpAsync.repeat(3))),
          ).to.eql([...data, ...data, ...data]));
      });
      const flattens: ['flatten', 'flatMap'] = ['flatten', 'flatMap'];
      flattens.forEach((func) => {
        describe(func, () => {
          it('empty array', async () =>
            expect(await fromAsync(fluentPipe([], fluentOpAsync[func]()))).to.be
              .empty);
          it('already flat fails', async () => {
            let thrownError: any;
            try {
              await fromAsync(fluentPipe(subject, fluentOpAsync[func]()));
            } catch (err) {
              thrownError = err;
            }
            expect(thrownError).to.exist;
          });
          it('not flat', async () =>
            expect(
              await fromAsync(
                fluentPipe([[1, 2], [3, 4, 5], [], [6]], fluentOpAsync[func]()),
              ),
            ).to.eql([1, 2, 3, 4, 5, 6]));
          it('with mapper', async () =>
            expect(
              await fromAsync(
                fluentPipe(
                  subject,
                  fluentOpAsync[func]((p) => p.emails),
                ),
              ),
            ).to.eql(
              flatMap(picker(1, 2, 6, 7, 8, 9, 10, 11), (p) => p.emails),
            ));
          it('should work with key string', async () =>
            expect(
              await fromAsync(
                fluentPipe(subject, fluentOpAsync[func]('emails')),
              ),
            ).to.eql(
              flatMap(picker(1, 2, 6, 7, 8, 9, 10, 11), (p) => p.emails),
            ));
        });
      });
      describe('sort', () => {
        it('empty', async () =>
          expect(fromAsync(fluentPipe([], fluentOpAsync.sort()))).to.be.empty);
        it('flat numbers', async () =>
          expect(
            await fromAsync(
              fluentPipe([6, 4, 5, 3, 2, 1], fluentOpAsync.sort()),
            ),
          ).to.eql([1, 2, 3, 4, 5, 6]));
        it('flat numbers with reversed comparison', async () =>
          expect(
            await fromAsync(
              fluentPipe(
                [6, 4, 5, 3, 2, 1],
                fluentOpAsync.sort((a, b) => b - a),
              ),
            ),
          ).to.eql([6, 5, 4, 3, 2, 1]));
      });
      describe('distinct', () => {
        it('empty', async () =>
          expect(await fromAsync(fluentPipe([], fluentOpAsync.distinct()))).to
            .be.empty);
        it('not distinct numbers', async () =>
          expect(
            await fromAsync(
              fluentPipe([1, 1, 1, 2, 2, 3], fluentOpAsync.distinct()),
            ),
          ).to.eql([1, 2, 3]));
        it('already distinct collection', async () =>
          expect(
            await fromAsync(fluentPipe(subject, fluentOpAsync.distinct())),
          ).to.eql(data));
        it('with mapper', async () =>
          expect(
            await fromAsync(
              fluentPipe(
                subject,
                fluentOpAsync.distinct((p) => p.gender),
              ),
            ),
          ).to.eql(picker(0, 3, 4, 5)));
        it('should work with key string', async () =>
          expect(
            await fromAsync(
              fluentPipe(subject, fluentOpAsync.distinct('gender')),
            ),
          ).to.eql(picker(0, 3, 4, 5)));
      });
      describe('group', () => {
        it('empty', async () =>
          expect(
            await fromAsync(
              fluentPipe(
                [] as Person[],
                fluentOpAsync.group((p) => p.gender),
              ),
            ),
          ).to.be.empty);
        it('non-empty', async () => {
          const groups = await fromAsync(
            fluentPipe(
              subject,
              fluentOpAsync.group((p) => p.gender),
            ),
          );
          expect(groups.length).to.eql(4);
          expect(groups.map((grp) => grp.key)).to.have.members([
            undefined,
            Gender.Male,
            Gender.Female,
            Gender.NonBinary,
          ]);
          for (const grp of groups) {
            expect(grp.values).to.eql(data.filter((p) => p.gender === grp.key));
          }
        });
        it('not assuring order', async () => {
          const items = [
            { k: 1, v: 1 },
            { k: 1, v: 2 },
            { k: 2, v: 1 },
            { k: 2, v: 2 },
            { k: 1, v: 1 },
            { k: 1, v: 2 },
          ];
          const groups = await fromAsync(
            fluentPipe(
              items,
              fluentOpAsync.group((x) => x.k),
            ),
          );
          expect(groups.length).to.eql(2);
          expect(groups.map((grp) => grp.key)).to.have.members([1, 2]);

          groups.forEach(({ key, values }) => {
            expect(values).to.eql(items.filter((x) => x.k === key));
          });
        });
        it('assuring order', async () => {
          const items = [
            { k: 1, v: 1 },
            { k: 1, v: 2 },
            { k: 2, v: 1 },
            { k: 2, v: 2 },
            { k: 1, v: 1 },
            { k: 1, v: 2 },
          ];
          const groups = await fromAsync(
            fluentPipe(items, fluentOpAsync.group(o((x) => x.k))),
          );
          expect(groups.length).to.eql(3);
          expect(groups.map((grp) => grp.key)).to.have.members([1, 2, 1]);

          groups.forEach(({ values }, i) => {
            values.forEach((value, idx) => {
              expect(value).to.be.eq(items[i * 2 + idx]);
            });
          });
        });
        it('assuring order descending', async () => {
          const items = [
            { k: 1, v: 1 },
            { k: 1, v: 2 },
            { k: 2, v: 1 },
            { k: 2, v: 2 },
            { k: 1, v: 1 },
            { k: 1, v: 2 },
          ];
          const groups = await fromAsync(
            fluentPipe(items, fluentOpAsync.group(od((x) => x.k))),
          );
          expect(groups.length).to.eql(3);
          expect(groups.map((grp) => grp.key)).to.have.members([1, 2, 1]);

          groups.forEach(({ values }, i) => {
            values.forEach((value, idx) => {
              expect(value).to.be.eq(items[i * 2 + idx]);
            });
          });
        });
        it('assuring order with value transformation', async () => {
          const items = [
            { k: 1, v: 1 },
            { k: 1, v: 1 },
            { k: 1, v: 2 },
            { k: 2, v: 1 },
            { k: 2, v: 2 },
            { k: 2, v: 2 },
            { k: 2, v: 2 },
            { k: 1, v: 1 },
            { k: 1, v: 2 },
            { k: 1, v: 2 },
          ];
          const expected = [
            { k: 1, v: 1 },
            { k: 1, v: 2 },
            { k: 2, v: 1 },
            { k: 2, v: 2 },
            { k: 1, v: 1 },
            { k: 1, v: 2 },
          ];
          const groups = await fromAsync(
            fluentPipe(
              items,
              fluentOpAsync.group(
                o((x) => x.k),
                getGroupingDistinct(
                  (x) => [x.v.toString()],
                  (x) => x[0],
                ),
              ),
            ),
          );
          expect(groups.length).to.eql(3);
          expect(groups.map((grp) => grp.key)).to.have.members([1, 2, 1]);

          groups.forEach(({ values }, i) => {
            values.forEach((value, idx) => {
              expect(value).to.be.eql(expected[i * 2 + idx].v.toString());
            });
          });
        });
        it('should work with key string', async () => {
          const groups = await fromAsync(
            fluentPipe(subject, fluentOpAsync.group('gender')),
          );
          expect(groups.length).to.eql(4);
          expect(groups.map((grp) => grp.key)).to.have.members([
            undefined,
            Gender.Male,
            Gender.Female,
            Gender.NonBinary,
          ]);
          for (const grp of groups) {
            expect(grp.values).to.eql(data.filter((p) => p.gender === grp.key));
          }
        });
        it('should work with transformation expression', async () => {
          const groups = await fromAsync(
            fluentPipe(
              [1, 2, 2, 3, 4, 4, 5, 5, 5],
              fluentOpAsync.group((x) => x % 2, getGroupingDistinct(identity)),
            ),
          );
          expect(groups.length).to.eql(2);
          expect(groups.map((grp) => grp.key)).to.have.members([0, 1]);
          expect(groups.find(({ key }) => key === 0)!.values).to.be.eql([2, 4]);
          expect(groups.find(({ key }) => key === 1)!.values).to.be.eql([
            1,
            3,
            5,
          ]);
        });
      });
      describe('execute', () => {
        it('should run what is passed', async () => {
          const action = stub();

          const result = await fromAsync(
            fluentPipe([1, 2, 3], fluentOpAsync.execute(action)),
          );

          expect(action).to.have.callsLike([1], [2], [3]);
          expect(result).to.be.eql([1, 2, 3]);
        });
      });
    });
  };
  describe(
    'on array',
    suite(() => data),
  );
  describe('on generator', suite(generator));
});
