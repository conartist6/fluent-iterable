import {
  o,
  identity,
  od,
  getGroupingDistinct,
  fluentPipe,
  fluentOp,
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

describe('fluent iterable', () => {
  const suite = (createSubject: () => Iterable<Person>) => () => {
    let subject: Iterable<Person>;

    beforeEach(() => (subject = createSubject()));

    describe('synchronous', () => {
      context('withIndex', () => {
        it('should return Indexed instances from informed array', () => {
          expect(
            Array.from(fluentPipe(['a', 'b', 'c'], fluentOp.withIndex())),
          ).to.be.eql([
            { idx: 0, value: 'a' },
            { idx: 1, value: 'b' },
            { idx: 2, value: 'c' },
          ]);
        });
      });
      context('takeWhile', () => {
        it('works with initially not true statement', () =>
          expect(
            Array.from(
              fluentPipe(
                subject,
                fluentOp.takeWhile((p) => p.emails.length > 0),
              ),
            ),
          ).to.be.empty);
        it('works with eventually not true statement', () => {
          expect(
            Array.from(
              fluentPipe(
                subject,
                fluentOp.takeWhile((p) => p.gender === undefined),
              ),
            ),
          ).to.eql(data.slice(0, 3));
        });
        it('works with always true statement', () => {
          expect(
            Array.from(
              fluentPipe(
                subject,
                fluentOp.takeWhile((p) => p.name.length > 0),
              ),
            ),
          ).to.eql(data);
        });
        it('should work with key string parameter', () => {
          expect(
            Array.from(
              fluentPipe(
                [{ a: 1 }, { a: 2 }, { a: 0 }, { a: 1 }],
                fluentOp.takeWhile('a'),
              ),
            ),
          ).to.eql([{ a: 1 }, { a: 2 }]);
        });
      });
      context('take', () => {
        it('works with negative count', () =>
          expect(Array.from(fluentPipe(subject, fluentOp.take(-5)))).to.be
            .empty);
        it('works with zero count', () =>
          expect(Array.from(fluentPipe(subject, fluentOp.take(0)))).to.be
            .empty);
        it('works with one count', () =>
          expect(Array.from(fluentPipe(subject, fluentOp.take(1)))).to.eql(
            data.slice(0, 1),
          ));
        it('works with count < length', () =>
          expect(Array.from(fluentPipe(subject, fluentOp.take(5)))).to.eql(
            data.slice(0, 5),
          ));
        it('works with count = length', () =>
          expect(
            Array.from(fluentPipe(subject, fluentOp.take(data.length))),
          ).to.eql(data));
        it('works with count > length', () =>
          expect(
            Array.from(fluentPipe(subject, fluentOp.take(data.length * 2))),
          ).to.eql(data));
      });
      context('skipWhile', () => {
        it('works with initially not true statement', () =>
          expect(
            Array.from(
              fluentPipe(
                subject,
                fluentOp.skipWhile((p) => p.emails.length > 0),
              ),
            ),
          ).to.eql(data));
        it('works with eventually not true statement', () =>
          expect(
            Array.from(
              fluentPipe(
                subject,
                fluentOp.skipWhile((p) => p.gender === undefined),
              ),
            ),
          ).to.eql(data.slice(3)));
        it('works with always true statement', () =>
          expect(
            Array.from(
              fluentPipe(
                subject,
                fluentOp.skipWhile((p) => p.name.length > 0),
              ),
            ),
          ).to.be.empty);
        it('works with alternating true statement', () =>
          expect(
            Array.from(
              fluentPipe(
                subject,
                fluentOp.skipWhile((p) => p.emails.length === 0),
              ),
            ),
          ).to.eql(data.slice(1)));
        it('should work with key string parameter', () => {
          expect(
            Array.from(
              fluentPipe(
                [
                  { a: 1, b: 1 },
                  { a: 1, b: 2 },
                  { a: 0, b: 3 },
                  { a: 1, b: 4 },
                ],
                fluentOp.skipWhile('a'),
              ),
            ),
          ).to.eql([
            { a: 0, b: 3 },
            { a: 1, b: 4 },
          ]);
        });
      });
      context('skip', () => {
        it('works with negative count', () =>
          expect(Array.from(fluentPipe(subject, fluentOp.skip(-5)))).to.eql(
            data,
          ));
        it('works with zero count', () =>
          expect(Array.from(fluentPipe(subject, fluentOp.skip(0)))).to.eql(
            data,
          ));
        it('works with one count', () =>
          expect(Array.from(fluentPipe(subject, fluentOp.skip(1)))).to.eql(
            data.slice(1),
          ));
        it('works with count < length', () =>
          expect(Array.from(fluentPipe(subject, fluentOp.skip(5)))).to.eql(
            data.slice(5),
          ));
        it('works with count = length', () =>
          expect(Array.from(fluentPipe(subject, fluentOp.skip(data.length)))).to
            .be.empty);
        it('works with count > length', () =>
          expect(
            Array.from(fluentPipe(subject, fluentOp.skip(data.length * 2))),
          ).to.be.empty);
      });
      describe('map', () => {
        it('maps to undefined', () => {
          const res = Array.from(
            fluentPipe(
              subject,
              fluentOp.map(() => undefined),
            ),
          );
          expect(res).to.length(data.length);
          res.forEach((item) => expect(item).to.be.undefined);
        });
        it('maps to projection', () => {
          const res = Array.from(
            fluentPipe(
              subject,
              fluentOp.map((p) => p.name),
            ),
          );
          expect(res).to.length(data.length);
          let idx = 0;
          for (const item of res) {
            expect(item).to.equal(data[idx++].name);
          }
        });
        it('should work with key string', () => {
          const res = Array.from(
            fluentPipe(
              subject,
              fluentOp.map((p) => p.name),
            ),
          );
          expect(res).to.length(data.length);
          let idx = 0;
          for (const item of res) {
            expect(item).to.equal(data[idx++].name);
          }
        });
        it('should work with key string parameter', () => {
          expect(
            Array.from(
              fluentPipe(
                [
                  { a: 1, b: 1 },
                  { a: 1, b: 2 },
                  { a: Promise.resolve(0), b: 3 },
                  { a: 1, b: 4 },
                ],
                fluentOp.map('b'),
              ),
            ),
          ).to.eql([1, 2, 3, 4]);
        });
      });
      describe('filter', () => {
        it('with always false predicate', () =>
          expect(
            Array.from(
              fluentPipe(
                subject,
                fluentOp.filter(() => false),
              ),
            ),
          ).to.be.empty);
        it('with always true predicate', () =>
          expect(
            Array.from(
              fluentPipe(
                subject,
                fluentOp.filter(() => true),
              ),
            ),
          ).to.eql(data));
        it('with alternating predicate', () =>
          expect(
            Array.from(
              fluentPipe(
                subject,
                fluentOp.filter((p) => p.gender === Gender.Female),
              ),
            ),
          ).to.eql(picker(4, 7, 10)));
        it('not assuring order', () => {
          const call = stub();
          expect(
            Array.from(
              fluentPipe(
                [1, 2, 3, 4, 3],
                fluentOp.filter((p) => {
                  call();
                  return 2 <= p && p <= 3;
                }),
              ),
            ),
          ).to.eql([2, 3, 3]);
          expect(call).to.have.callCount(5);
        });
        it('assuring order', () => {
          const call = stub();
          expect(
            Array.from(
              fluentPipe(
                [1, 2, 3, 4, 3],
                fluentOp.filter(
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
        it('assuring order descending', () => {
          const call = stub();
          expect(
            Array.from(
              fluentPipe(
                [1, 2, 3, 4, 3],
                fluentOp.filter(
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
        it('should work with key string parameter', () => {
          expect(
            Array.from(
              fluentPipe(
                [
                  { a: 0, b: 1 },
                  { a: 1, b: 2 },
                  { a: 0, b: 3 },
                  { a: 1, b: 4 },
                ],
                fluentOp.filter('a'),
                fluentOp.map('b'),
              ),
            ),
          ).to.eql([2, 4]);
        });
        it('should guarantees that a possible falsy unique key is defined', () => {
          interface Test {
            a?: number;
            b: string | null;
          }
          expect(
            Array.from(
              fluentPipe(
                [{ b: null, a: 1 }, { b: 'a' }, { a: 2, b: 'b' }] as Test[],
                fluentOp.filter('b'),
                fluentOp.filter('a'),
                fluentOp.map((x) => `${x.a.toFixed(2)} and ${x.b.length}`),
              ),
            )[0],
          ).to.be.eq('2.00 and 1');
        });
        it('should guarantees that a possible falsy unique key is defined explicitly', () => {
          interface Test {
            a?: number;
            b: string | null;
          }
          expect(
            Array.from(
              fluentPipe(
                [{ b: null, a: 1 }, { b: 'a' }, { a: 2, b: 'b' }] as Test[],
                fluentOp.filter<'b' | 'a'>((x) => x.b && x.a),
                fluentOp.map((x) => `${x.a.toFixed(2)} and ${x.b.length}`),
              ),
            )[0],
          ).to.be.eq('2.00 and 1');
        });
        it('should return just the truthy values with correct typing', () => {
          interface Test {
            a: number;
            b: string;
          }
          expect(
            Array.from(
              fluentPipe(
                [{ b: 'abc', a: 1 }, undefined, { a: 2, b: 'b' }] as (
                  | Test
                  | undefined
                )[],
                fluentOp.filter(),
                fluentOp.map((x) => `${x.a.toFixed(2)} and ${x.b.length}`),
              ),
            ),
          ).to.be.eql(['1.00 and 3', '2.00 and 1']);
        });
      });
      describe('partition', () => {
        it('should divide result in blocks of the specified size', () => {
          expect(
            Array.from(
              fluentPipe(
                [1, 2, 3, 4, 5, 6, 7, 8],
                fluentOp.partition(3),
                fluentOp.map((x) => Array.from(x)),
              ),
            ),
          ).to.be.eql([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8],
          ]);
        });
        it('should divide result in blocks of the specified size when input it not an array', () => {
          expect(
            Array.from(
              fluentPipe(
                [1, 2, 3, 4, 5, 6, 7, 8][Symbol.iterator](),
                fluentOp.partition(3),
                fluentOp.map((x) => Array.from(x)),
              ),
            ),
          ).to.be.eql([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8],
          ]);
        });
        it('should thrown an error when partition size is not valid', () => {
          let error: any;
          try {
            Array.from(fluentPipe([], fluentOp.partition(0)));
          } catch (err) {
            error = err;
          }
          expect(error).to.be.instanceOf(Error);
        });
      });
      describe('append', () => {
        it('with empty iterable', () =>
          expect(
            Array.from(
              fluentPipe([] as Person[], fluentOp.append(additionalPerson)),
            ),
          ).to.eql([additionalPerson]));
        it('with non-empty iterable', () =>
          expect(
            Array.from(fluentPipe(subject, fluentOp.append(additionalPerson))),
          ).to.eql([...data, additionalPerson]));
      });
      describe('prepend', () => {
        it('with empty iterable', () =>
          expect(
            Array.from(
              fluentPipe([] as Person[], fluentOp.prepend(additionalPerson)),
            ),
          ).to.eql([additionalPerson]));
        it('with non-empty iterable', () =>
          expect(
            Array.from(fluentPipe(subject, fluentOp.prepend(additionalPerson))),
          ).to.eql([additionalPerson, ...data]));
      });
      describe('concat', () => {
        it('one empty array', () =>
          expect(Array.from(fluentPipe(subject, fluentOp.concat([])))).to.eql(
            data,
          ));
        it('two empty arrays', () =>
          expect(
            Array.from(fluentPipe(subject, fluentOp.concat([], []))),
          ).to.eql(data));
        it('one non-empty arrays', () =>
          expect(
            Array.from(
              fluentPipe(subject, fluentOp.concat([additionalPerson])),
            ),
          ).to.eql([...data, additionalPerson]));
        it('two non-empty arrays', () =>
          expect(
            Array.from(
              fluentPipe(subject, fluentOp.concat([additionalPerson], data)),
            ),
          ).to.eql([...data, additionalPerson, ...data]));
        it('one empty and one non-empty arrays', () =>
          expect(
            Array.from(
              fluentPipe(subject, fluentOp.concat([], [additionalPerson])),
            ),
          ).to.eql([...data, additionalPerson]));
      });
      describe('repeat', () => {
        it('negative number of times', () =>
          expect(Array.from(fluentPipe(subject, fluentOp.repeat(-5)))).to.be
            .empty);
        it('zero times', () =>
          expect(Array.from(fluentPipe(subject, fluentOp.repeat(0)))).to.be
            .empty);
        it('once', () =>
          expect(Array.from(fluentPipe(subject, fluentOp.repeat(1)))).to.eql(
            data,
          ));
        it('twice', () =>
          expect(Array.from(fluentPipe(subject, fluentOp.repeat(2)))).to.eql([
            ...data,
            ...data,
          ]));
        it('three times', () =>
          expect(Array.from(fluentPipe(subject, fluentOp.repeat(3)))).to.eql([
            ...data,
            ...data,
            ...data,
          ]));
      });
      const flattens: ['flatten', 'flatMap'] = ['flatten', 'flatMap'];
      flattens.forEach((func) => {
        describe(func, () => {
          it('empty array', () =>
            expect(Array.from(fluentPipe([], fluentOp[func]()))).to.be.empty);
          it('already flat fails', () =>
            expect(() =>
              Array.from(fluentPipe(subject, fluentOp[func]())),
            ).to.throw());
          it('not flat', () =>
            expect(
              Array.from(
                fluentPipe([[1, 2], [3, 4, 5], [], [6]], fluentOp[func]()),
              ),
            ).to.eql([1, 2, 3, 4, 5, 6]));
          it('with mapper', () =>
            expect(
              Array.from(
                fluentPipe(
                  subject,
                  fluentOp[func]((p) => p.emails),
                ),
              ),
            ).to.eql(
              flatMap(picker(1, 2, 6, 7, 8, 9, 10, 11), (p) => p.emails),
            ));
          it('should work with key string', () =>
            expect(
              Array.from(fluentPipe(subject, fluentOp[func]('emails'))),
            ).to.eql(
              flatMap(picker(1, 2, 6, 7, 8, 9, 10, 11), (p) => p.emails),
            ));
        });
      });
      describe('sort', () => {
        it('empty', () =>
          expect(Array.from(fluentPipe([], fluentOp.sort()))).to.be.empty);
        it('flat numbers', () =>
          expect(
            Array.from(fluentPipe([6, 4, 5, 3, 2, 1], fluentOp.sort())),
          ).to.eql([1, 2, 3, 4, 5, 6]));
        it('flat numbers with reversed comparison', () =>
          expect(
            Array.from(
              fluentPipe(
                [6, 4, 5, 3, 2, 1],
                fluentOp.sort((a, b) => b - a),
              ),
            ),
          ).to.eql([6, 5, 4, 3, 2, 1]));
      });
      describe('distinct', () => {
        it('empty', () =>
          expect(Array.from(fluentPipe([], fluentOp.distinct()))).to.be.empty);
        it('not distinct numbers', () =>
          expect(
            Array.from(fluentPipe([1, 1, 1, 2, 2, 3], fluentOp.distinct())),
          ).to.eql([1, 2, 3]));
        it('already distinct collection', () =>
          expect(Array.from(fluentPipe(subject, fluentOp.distinct()))).to.eql(
            data,
          ));
        it('with mapper', () =>
          expect(
            Array.from(
              fluentPipe(
                subject,
                fluentOp.distinct((p) => p.gender),
              ),
            ),
          ).to.eql(picker(0, 3, 4, 5)));
        it('should work with key string', () =>
          expect(
            Array.from(fluentPipe(subject, fluentOp.distinct('gender'))),
          ).to.eql(picker(0, 3, 4, 5)));
      });
      describe('group', () => {
        it('empty', () =>
          expect(
            Array.from(
              fluentPipe(
                [] as Person[],
                fluentOp.group((p) => p.gender),
              ),
            ),
          ).to.be.empty);
        it('non-empty', () => {
          const groups = Array.from(
            fluentPipe(
              subject,
              fluentOp.group((p) => p.gender),
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
        it('not assuring order', () => {
          const items = [
            { k: 1, v: 1 },
            { k: 1, v: 2 },
            { k: 2, v: 1 },
            { k: 2, v: 2 },
            { k: 1, v: 1 },
            { k: 1, v: 2 },
          ];
          const groups = Array.from(
            fluentPipe(
              items,
              fluentOp.group((x) => x.k),
            ),
          );
          expect(groups.length).to.eql(2);
          expect(groups.map((grp) => grp.key)).to.have.members([1, 2]);

          groups.forEach(({ key, values }) => {
            expect(values).to.eql(items.filter((x) => x.k === key));
          });
        });
        it('assuring order', () => {
          const items = [
            { k: 1, v: 1 },
            { k: 1, v: 2 },
            { k: 2, v: 1 },
            { k: 2, v: 2 },
            { k: 1, v: 1 },
            { k: 1, v: 2 },
          ];
          const groups = Array.from(
            fluentPipe(items, fluentOp.group(o((x) => x.k))),
          );
          expect(groups.length).to.eql(3);
          expect(groups.map((grp) => grp.key)).to.have.members([1, 2, 1]);

          groups.forEach(({ values }, i) => {
            values.forEach((value, idx) => {
              expect(value).to.be.eq(items[i * 2 + idx]);
            });
          });
        });
        it('assuring order descending', () => {
          const items = [
            { k: 1, v: 1 },
            { k: 1, v: 2 },
            { k: 2, v: 1 },
            { k: 2, v: 2 },
            { k: 1, v: 1 },
            { k: 1, v: 2 },
          ];
          const groups = Array.from(
            fluentPipe(items, fluentOp.group(od((x) => x.k))),
          );
          expect(groups.length).to.eql(3);
          expect(groups.map((grp) => grp.key)).to.have.members([1, 2, 1]);

          groups.forEach(({ values }, i) => {
            values.forEach((value, idx) => {
              expect(value).to.be.eq(items[i * 2 + idx]);
            });
          });
        });
        it('assuring order with value transformation', () => {
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
          const groups = Array.from(
            fluentPipe(
              items,
              fluentOp.group(
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
        it('should work with key string', () => {
          const groups = Array.from(
            fluentPipe(subject, fluentOp.group('gender')),
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
        it('should work with transformation expression', () => {
          const groups = Array.from(
            fluentPipe(
              [1, 2, 2, 3, 4, 4, 5, 5, 5],
              fluentOp.group((x) => x % 2, getGroupingDistinct(identity)),
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
        it('should run what is passed', () => {
          const action = stub();

          const result = Array.from(
            fluentPipe([1, 2, 3], fluentOp.execute(action)),
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
