import { Mapper, Group } from '../types';
import { map } from './map';
import { reduceAndMap } from './reduce-and-map';
import { getGrouper, groupMap } from '../common/get-group';
import { resolver } from '../utils';

export function group<T, R>(
  iterable: Iterable<T>,
  mapper: Mapper<T, R>,
): Iterable<Group<T, R>> {
  const r = getGrouper(iterable, mapper, reduceAndMap, resolver);

  return groupMap(r, map);
}