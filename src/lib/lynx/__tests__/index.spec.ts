import 'jest';
import parse from '../index';
import { Options } from 'lib/lynx/lib/typings';
const options: Options = {
  childlessTags: ['childless'],
  closingTags: [],
  voidTags: [],
  filterTags: [],
  componentTags: [],
};
describe('parse', () => {
  it('return a ast tree', () => {

    const str =
      '<closing id="abc"><Hello re:for="{{loop}}">hello</Hello></closing>';
    expect(parse(str)).toEqual([
      {
        tagName: 'closing',
        type: 'Element',
        attributes: {
          id: 'abc'
        },
        children: [{
          tagName: 'Hello',
          type: 'Component',
          attributes: {
            loop: 'loop',
          },
          children: [{
            type: 'Text',
            content: 'hello',
          }],
        }],
      },
    ]);
  });

  it('can accept custom options', () => {

    const str =
      '<closing id="abc"><Hello re:for="{{loop}}">hello</Hello></closing>';
    expect(parse(str, options)).toEqual([
      {
        tagName: 'closing',
        type: 'Element',
        attributes: {
          id: 'abc',
        },
        children: [{
          tagName: 'Hello',
          type: 'Component',
          attributes: {
            loop: 'loop',
          },
          children: [{
            type: 'Text',
            content: 'hello',
          }],
        }],
      },
    ]);
  });
});
