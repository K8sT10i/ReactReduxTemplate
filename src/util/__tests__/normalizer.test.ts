import { normalizeToHalf, isHalfwidthAlphanum } from '../normalizer'

describe('normalizeToHalf', () => {
  test.each([
    ['　！＂＃＄％＆＇（）＊＋，－．／', ` !"#$%&'()*+,-./`],
    ['０１２３４５６７８９：；＜＝＞？', '0123456789:;<=>?'],
    ['＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯ', '@ABCDEFGHIJKLMNO'],
    ['ＰＱＲＳＴＵＶＷＸＹＺ［＼］＾＿', 'PQRSTUVWXYZ[\\]^_'],
    ['｀ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏ', '`abcdefghijklmno'],
    ['ｐｑｒｓｔｕｖｗｘｙｚ｛｜｝～', 'pqrstuvwxyz{|}~'],
  ])('%p -> %p', (input, expected) => {
    expect(normalizeToHalf(input)).toBe(expected)
  })
})

describe('isHalfwidthAlphanum', () => {
  test.each<[string, boolean]>([
    ['0123456789', true],
    ['ABCDEFGHIJKLMNOPQRSTUVWXYZ', true],
    ['abcdefghijklmnopqrstuvwxyz', true],
    ['０１２３４５６７８９', false],
    ['ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ', false],
    ['ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ', false],
    ['ｱｲｳｴｵ', false],
    [`!"#$%&'()*+,-./:;<=>?@`, false],
  ])('%p -> %p', (input, expected) => {
    expect(isHalfwidthAlphanum(input)).toBe(expected)
  })
})
