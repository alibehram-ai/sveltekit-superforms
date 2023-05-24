/* eslint-disable @typescript-eslint/no-unused-vars */
import type { StringPath, StringPathType } from '$lib/stringPath';
import { test } from 'vitest';

type Obj = {
  name: string;
  points: number;
  scores: Date[][];
  city: {
    name: string;
  };
  tags:
    | ({ id: number; name: string; parents: number[] } | null)[]
    | undefined;
};

const i = 7 + 3;

type Test = StringPath<Obj>;

test('StringPath', () => {
  const a1: Test = 'name';
  const a2: Test = 'city';
  const a3: Test = 'tags';
  const a4: Test = 'city.name';
  const a5: Test = 'tags[3]';
  const a6: Test = 'tags[3].name';
  const a7: Test = 'scores[3][4]';

  // @ts-expect-error incorrect path
  const n8: Test = 'city[3]';
  // @ts-expect-error incorrect path
  const n7: Test = 'city.nope';
  // @ts-expect-error incorrect path
  const n9: Test = 'tags[4].nope';
  // @ts-expect-error incorrect path
  const n0: Test = 'nope';
});

function checkPath<T = never>() {
  return function <U extends string = string>(
    path: U
  ): StringPathType<T, U> {
    return path as StringPathType<T, U>;
  };
}

const checkObj = checkPath<Obj>();

test('StringPathType', () => {
  const a = checkObj(`tags[${i + 3}].name`); // string
  const b = checkObj(`scores[${i + 3}][0]`); // Date

  const t0: StringPathType<Obj, 'name'> = 'string';
  const t1: StringPathType<Obj, 'points'> = 123;
  const t2: StringPathType<Obj, 'city'> = { name: 'London' };
  const t3: StringPathType<Obj, 'tags'> = [
    { id: 123, name: 'Test', parents: [] }
  ];
  const t4: StringPathType<Obj, 'tags[0]'> = {
    id: 123,
    name: 'Test',
    parents: [1]
  };
  const t5: StringPathType<Obj, 'tags[0].name'> = 'string';
  const t6: StringPathType<Obj, `tags[5].id`> = 123;

  // @ts-expect-error incorrect path
  const n1: StringPathType<Obj, 'city[2]'> = 'never';
  // @ts-expect-error incorrect path
  const n2: StringPathType<Obj, 'nope incorrect'> = 'never';
});
