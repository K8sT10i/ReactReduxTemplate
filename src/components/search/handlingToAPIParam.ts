import dayjs from 'dayjs'

/**
 *
 *
 * @param baseDate YYYYMMDD
 * @param handling +N hours
 */
export default function handlingToAPIParam(baseDate: string, handling: number) {
  const firstDay = {
    baseDate,
    // e.g. +3 -> "0300"
    tgtTimeFrom: `${handling.toString().padStart(2, '0')}00`,
    tgtTimeTo: '2359',
  }

  const secondDay = {
    baseDate: dayjs(firstDay.baseDate)
      .add(1, 'day')
      .format('YYYYMMDD'),
    tgtTimeFrom: '0000',
    // e.g. +3 -> "0300"
    tgtTimeTo: `${handling.toString().padStart(2, '0')}00`,
  }

  return [firstDay, secondDay] as const
}
