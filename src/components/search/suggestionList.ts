import { ITag } from 'office-ui-fabric-react/lib/Pickers'
import ComboBox from '../fabric/ComboBox'

export const tgtTimeFromList: React.ComponentProps<
  typeof ComboBox
>['options'] = [
  { key: '', text: 'TIME' },
  { key: '0000', text: '0:00' },
  { key: '0100', text: '1:00' },
  { key: '0200', text: '2:00' },
  { key: '0300', text: '3:00' },
  { key: '0400', text: '4:00' },
  { key: '0500', text: '5:00' },
  { key: '0600', text: '6:00' },
  { key: '0700', text: '7:00' },
  { key: '0800', text: '8:00' },
  { key: '0900', text: '9:00' },
  { key: '1000', text: '10:00' },
  { key: '1100', text: '11:00' },
  { key: '1200', text: '12:00' },
  { key: '1300', text: '13:00' },
  { key: '1400', text: '14:00' },
  { key: '1500', text: '15:00' },
  { key: '1600', text: '16:00' },
  { key: '1700', text: '17:00' },
  { key: '1800', text: '18:00' },
  { key: '1900', text: '19:00' },
  { key: '2000', text: '20:00' },
  { key: '2100', text: '21:00' },
  { key: '2200', text: '22:00' },
  { key: '2300', text: '23:00' },
]

export const tgtTimeToList: React.ComponentProps<typeof ComboBox>['options'] = [
  { key: '', text: 'TIME' },
  { key: '0100', text: '1:00' },
  { key: '0200', text: '2:00' },
  { key: '0300', text: '3:00' },
  { key: '0400', text: '4:00' },
  { key: '0500', text: '5:00' },
  { key: '0600', text: '6:00' },
  { key: '0700', text: '7:00' },
  { key: '0800', text: '8:00' },
  { key: '0900', text: '9:00' },
  { key: '1000', text: '10:00' },
  { key: '1100', text: '11:00' },
  { key: '1200', text: '12:00' },
  { key: '1300', text: '13:00' },
  { key: '1400', text: '14:00' },
  { key: '1500', text: '15:00' },
  { key: '1600', text: '16:00' },
  { key: '1700', text: '17:00' },
  { key: '1800', text: '18:00' },
  { key: '1900', text: '19:00' },
  { key: '2000', text: '20:00' },
  { key: '2100', text: '21:00' },
  { key: '2200', text: '22:00' },
  { key: '2300', text: '23:00' },
  { key: '2359', text: '23:59' },
]

export const handlingList: React.ComponentProps<typeof ComboBox>['options'] = [
  { key: +1, text: '+1' },
  { key: +2, text: '+2' },
  { key: +3, text: '+3' },
]

export const ssrSKList: ITag[] = ['ABML', 'ACAA', 'AFML', 'ASML'].map(v => ({
  key: v,
  name: v,
}))

export const amcStatusList: ITag[] = [
  'DIA',
  'PLT',
  'BRZ',
  'SAG',
  'SAS',
  'SFC',
].map(v => ({ key: v, name: v }))

export const tagStatusList: ITag[] = [
  { key: '1', name: 'ABC' },
  { key: '2', name: 'EBC' },
]

export const wkGroupList: ITag[] = ['VIP', 'ITM'].map(v => ({
  key: v,
  name: v,
}))

export const resStatusList: ITag[] = [
  { key: '0', name: 'Open' },
  { key: '1', name: 'Accept' },
  { key: '2', name: 'Done' },
  { key: '3', name: 'Reject' },
  { key: '4', name: 'Withdraw' },
]
