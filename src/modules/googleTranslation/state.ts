import { Status } from '..'

export type GoogleTranslation = {
  ZZGT0001Status: Status
  translationType: string
  translationValueList: string[]
  translationalResult: { in: string; out: string }[]
}
