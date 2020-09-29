import handlingToAPIParam from '../handlingToAPIParam'

test('ハンドリング日指定を正しい時刻範囲に変換できる', () => {
  const [firstTimeRange, secondTimeRange] = handlingToAPIParam('20190901', +5)

  expect(firstTimeRange).toEqual({
    baseDate: '20190901',
    tgtTimeFrom: '0500',
    tgtTimeTo: '2359',
  } as typeof firstTimeRange)

  expect(secondTimeRange).toEqual({
    baseDate: '20190902',
    tgtTimeFrom: '0000',
    tgtTimeTo: '0500',
  } as typeof secondTimeRange)
})
