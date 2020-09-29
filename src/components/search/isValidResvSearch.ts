import { SearchCondition } from '../../modules/searchForCeRecord'

export default function isValidResvSearch({
  pnrRecordLocator = '',
  confirmationNum = '',
}: SearchCondition): boolean {
  if (
    pnrRecordLocator.length === 5 ||
    pnrRecordLocator.length === 6 ||
    confirmationNum.length === 9 ||
    confirmationNum.length === 13
  ) {
    return true
  }
  return false
}
