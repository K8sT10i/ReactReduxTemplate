import { SearchCondition } from '../../modules/searchForCeRecord'

export default function isDmsIntResvSearch(
  condition: SearchCondition,
): 'D' | 'I' | undefined {
  if (
    (condition.pnrRecordLocator && condition.pnrRecordLocator.length === 5) ||
    (condition.confirmationNum && condition.confirmationNum.length === 9)
  ) {
    return 'D'
  }
  if (
    (condition.pnrRecordLocator && condition.pnrRecordLocator.length === 6) ||
    (condition.confirmationNum && condition.confirmationNum.length === 13)
  ) {
    return 'I'
  }
  return undefined
}
