import produce from 'immer'
import profile, { Profile, ProfileAction } from '../profile'

const initialState: Profile = {
  flightDate: '',
  domInt: 'D',
  airportCode: '',
  ceMemberNum: 'NH 1234',
  APVP1004Status: 'NEED_TO_REFRESH',
  APAP1002Status: 'NEED_TO_REFRESH',
  APAP1001Status: 'INITIAL',
  airportInfoMap: {},
}

describe('Profile.SetProfileKey', () => {
  test('TEST_PROFILE', () => {
    const action: ValueOf<ProfileAction> = {
      type: 'Profile.SetProfileKey',
      payload: {
        flightDate: '20190901',
        dmsInt: 'D',
        ceCarrierCode: 'ZZZ',
        ceMemberNum: '1234',
      },
    }

    const currentState = produce(initialState, draft => {
      draft.ceCarrierCode = 'NH'
      draft.ceMemberNum = '9087'
      draft.APVP1004Status = 'COMPLETE'
      draft.APAP1002Status = 'COMPLETE'
    })
    const expected = produce(currentState, draft => {
      draft.flightDate = '20190901'
      draft.domInt = 'D'
      draft.ceCarrierCode = 'ZZZ'
      draft.ceMemberNum = '1234'
      draft.APVP1004Status = 'NEED_TO_REFRESH'
      draft.APAP1002Status = 'NEED_TO_REFRESH'
    })

    expect(profile(currentState, action)).toEqual(expected)
  })

  test('TEST_CONDITION_01', () => {
    const action: ValueOf<ProfileAction> = {
      type: 'Profile.SetProfileKey',
      payload: {
        flightDate: '20190901',
        dmsInt: 'D',
        ceCarrierCode: 'NH',
        ceMemberNum: '1234',
      },
    }

    const currentState = produce(initialState, draft => {
      draft.flightDate = '20190901'
      draft.domInt = 'D'
      draft.ceCarrierCode = 'NH'
      draft.ceMemberNum = '1234'
      draft.APVP1004Status = 'COMPLETE'
      draft.APAP1002Status = 'COMPLETE'
    })
    const expected = produce(currentState, draft => {})

    expect(profile(currentState, action)).toBe(expected)
  })

  test.skip.each(['APVP1004Status', 'APAP1002Status'] as const)(
    'TEST_INNIT',
    key => {
      const nextState = profile(
        {
          ...initialState,
          ceMemberNum: 'NH 1234',
          [key]: 'INITIAL',
        },
        {
          type: 'Profile.SetProfileKey',
          payload: {
            flightDate: '',
            dmsInt: 'D',
            ceCarrierCode: '6A',
            ceMemberNum: '9999',
          },
        },
      )

      const expected: Profile = {
        ...initialState,
        ceMemberNum: '6A 9999',
        [key]: 'INITIAL',
      }

      expect(nextState).toEqual(expected)
    },
  )
})

describe('Profile.SetStatus', () => {
  test('single', () => {
    const nextState = profile(
      {
        ...initialState,
        APVP1004Status: 'COMPLETE',
        APAP1002Status: 'COMPLETE',
      },
      {
        type: 'Profile.SetStatus',
        payload: {
          APVP1004Status: 'LOADING',
        },
      },
    )

    const expected: Profile = {
      ...initialState,
      APVP1004Status: 'LOADING',
      APAP1002Status: 'COMPLETE',
    }

    expect(nextState).toEqual(expected)
  })

  test('multi', () => {
    const nextState = profile(
      {
        ...initialState,
        APVP1004Status: 'COMPLETE',
        APAP1002Status: 'COMPLETE',
      },
      {
        type: 'Profile.SetStatus',
        payload: {
          APVP1004Status: 'NEED_TO_REFRESH',
          APAP1002Status: 'LOADING',
        },
      },
    )

    const expected: Profile = {
      ...initialState,
      APVP1004Status: 'NEED_TO_REFRESH',
      APAP1002Status: 'LOADING',
    }

    expect(nextState).toEqual(expected)
  })
})

describe('Profile.SetBasicInfo', () => {
  test('Profile.SetBasicInfo', () => {
    const nextState = profile(
      {
        ...initialState,
        basicInfo: {
          offcSectNam: 'DEPARTMENT',
        },
      },
      {
        type: 'Profile.SetBasicInfo',
        payload: {
          offcNam: 'COMPANY XYZ',
        },
      },
    )

    const expected: Profile = {
      ...initialState,
      basicInfo: {
        offcNam: 'COMPANY XYZ',
      },
    }

    expect(nextState).toEqual(expected)
  })
})

describe('Profile.SetAirportInfo', () => {
  test('Profile.SetAirportInfo', () => {
    const action: ValueOf<ProfileAction> = {
      type: 'Profile.SetAirportInfo',
      payload: {
        airportCode: 'NRT',
        carrCode: 'NH',
        memberNum: '12345678',
        airportVipInfoItemList: ['a', 'b'],
        airportVipMemberInfoNameList: ['A', 'B'],
        updateSystemDateTime: '',
      },
    }

    const currentState = produce(initialState, draft => {
      draft.airportInfoMap = {
        NRT: {
          airportCode: 'NRT',
          carrCode: 'NH',
          memberNum: '12345678',
          airportVipInfoItemList: [],
          airportVipMemberInfoNameList: [],
          updateSystemDateTime: '',
        },
        HND: {
          airportCode: 'HND',
          carrCode: 'NH',
          memberNum: '12345678',
          airportVipInfoItemList: [],
          airportVipMemberInfoNameList: [],
          updateSystemDateTime: '',
        },
      }
    })

    const expected = produce(currentState, draft => {
      draft.airportInfoMap.NRT!.airportVipInfoItemList = ['a', 'b']
      draft.airportInfoMap.NRT!.airportVipMemberInfoNameList = ['A', 'B']
    })

    expect(profile(currentState, action)).toEqual(expected)
  })
})
