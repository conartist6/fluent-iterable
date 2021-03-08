import {
  expect,
} from 'chai';
import {
  fluent,
  fluentOp,
  fluentPipe,
  rawInterval,
} from '../src';
import rxjs = require('rxjs');
import rxjsOp = require('rxjs/operators');

const ITEMS = 1000;
const FLAT_FACTOR = 10;
const MULTIPLIER1 = 3;
const MULTIPLIER2 = 2;
const QUOTIENT = 5;
const TAKE = 2000;

function interval2(init, final) {
  const items: any[] = [];
  for (let i = init; i <= final; i++) {
    items.push(i);
  }
  return items;
}

function* map1(it) {
  for (const x of it) {
    yield x * MULTIPLIER1;
  }
}

function* map2(it) {
  for (const x of it) {
    yield x * MULTIPLIER2;
  }
}

function* filter1(it) {
  for (const x of it) {
    if (x % QUOTIENT === 0) {
      yield x;
    }
  }
}

function* take1(it) {
  let count = 0;
  for (const x of it) {
    count++;
    if (count >= TAKE) {
      break;
    }
    yield interval2(x, x + FLAT_FACTOR);
  }
}

function* map3(it) {
  for (const x of it) {
    yield interval2(x, x + FLAT_FACTOR);
  }
}
let log = '';

describe('General benchmark', () => {
  it('fluent should win in fluent mode', async () => {
    const Benchmark = require('benchmark');
    const benchmarkSuite = new Benchmark.Suite('fluent mode');
    benchmarkSuite.reset();
    benchmarkSuite.splice(0, benchmarkSuite.length);
    benchmarkSuite.add('fluent', () => {
      fluent(rawInterval(1, ITEMS))
        .map((x) => x * MULTIPLIER1)
        .map((x) => x * MULTIPLIER2)
        .filter((x) => x % QUOTIENT === 0)
        .map((x) => interval2(x, x + FLAT_FACTOR))
        .take(TAKE)
        .forEach((x) => x.join(','));
    }).add('fluent internal', () => {
      const join = fluentOp.join(',');
      fluent(rawInterval(1, ITEMS))
        .map((x) => x * MULTIPLIER1)
        .map((x) => x * MULTIPLIER2)
        .filter((x) => x % QUOTIENT === 0)
        .map((x) => rawInterval(x, x + FLAT_FACTOR))
        .take(TAKE)
        .forEach((x) => join(x));
    }).add('fluentPipe', () => {
      const join = fluentOp.join(',');
      fluentPipe(rawInterval(1, ITEMS),
        fluentOp.map((x) => x * MULTIPLIER1),
        fluentOp.map((x) => x * MULTIPLIER2),
        fluentOp.filter((x) => x % QUOTIENT === 0),
        fluentOp.map((x) => rawInterval(x, x + FLAT_FACTOR)),
        fluentOp.take(TAKE),
        fluentOp.forEach((x) => join(x)));
    }).add('array operation chain', () => {
      interval2(1, ITEMS).map((x) => x * MULTIPLIER1)
        .map((x) => x * MULTIPLIER2)
        .filter((x) => x % QUOTIENT === 0)
        .map((x) => interval2(x, x + FLAT_FACTOR))
        .filter((_x, i) => i < TAKE)
        .map((x) => x.join(','));
    }).add('native iterable', () => {
      const it0 = interval2(1, ITEMS);
      const it = map3(take1(filter1(map2(map1(it0)))));
      for (const x of it) {
        x.join(',');
      }
    }).add('rxjs', () => {
      return rxjs.from(interval2(1, ITEMS))
        .pipe(
          rxjsOp.map((x) => x * MULTIPLIER1),
          rxjsOp.map((x) => x * MULTIPLIER2),
          rxjsOp.filter((x) => x % QUOTIENT === 0),
          rxjsOp.map((x) => interval2(x, x + FLAT_FACTOR)),
          rxjsOp.take(TAKE),
          rxjsOp.map((x) => x.join(',')),
        ).toPromise();
    }).on('cycle', function (event) {
      log += `${event.target}\n`;
    }).on('complete', function (this: any) {
      console.log(log);
      expect(this.filter('fastest').map('name')).to.contains('fluent');
    }).run();
  });
  it.skip('fluent should win in pipe mode', async () => {
    const Benchmark = require('benchmark');
    const benchmarkSuite = new Benchmark.Suite('fluent pipe mode');
    benchmarkSuite.reset();
    benchmarkSuite.splice(0, benchmarkSuite.length);
    benchmarkSuite.add('fluentPipe', () => {
      fluentPipe(rawInterval(1, ITEMS),
        fluentOp.map((x) => x * MULTIPLIER1),
        fluentOp.map((x) => x * MULTIPLIER2),
        fluentOp.filter((x) => x % QUOTIENT === 0),
        fluentOp.map((x) => interval2(x, x + FLAT_FACTOR)),
        fluentOp.take(TAKE),
        fluentOp.forEach((x) => x.join(',')));
    }).add('array operation chain (against pipe)', () => {
      interval2(1, ITEMS).map((x) => x * MULTIPLIER1)
        .map((x) => x * MULTIPLIER2)
        .filter((x) => x % QUOTIENT === 0)
        .map((x) => interval2(x, x + FLAT_FACTOR))
        .filter((_x, i) => i < TAKE)
        .map((x) => x.join(','));
    }).add('native iterable (against pipe)', () => {
      const it0 = interval2(1, ITEMS);
      const it = map3(take1(filter1(map2(map1(it0)))));
      for (const x of it) {
        x.join(',');
      }
    }).add('rxjs (against pipe)', () => {
      return rxjs.from(interval2(1, ITEMS))
        .pipe(
          rxjsOp.map((x) => x * MULTIPLIER1),
          rxjsOp.map((x) => x * MULTIPLIER2),
          rxjsOp.filter((x) => x % QUOTIENT === 0),
          rxjsOp.map((x) => interval2(x, x + FLAT_FACTOR)),
          rxjsOp.take(TAKE),
          rxjsOp.map((x) => x.join(',')),
        ).toPromise();
    }).on('cycle', function (event) {
      log += `${event.target}\n`;
    }).on('complete', function (this: any) {
      console.log(log);
      expect(this.filter('fastest').map('name')).to.contains('fluentPipe');
    }).run();
  });
  afterEach(() => {
    delete require.cache[require.resolve('benchmark')];
  });
});
