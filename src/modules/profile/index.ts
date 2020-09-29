import dayjs from 'dayjs'
import { Reducer, Status } from '..'
import { Profile, BasicInfo, AirportInfo, ErrorInfo } from './state'

export * from './state'

export type ProfileAction = {
  SetPathParams: {
    type: 'Profile.SetProfileKey'
    payload: {
      flightDate: string
      ceCarrierCode?: string
      ceMemberNum?: string
      pnrRecordLocator?: string
      segmentCarrierCode?: string
      flightNum?: string
      paxFamilyName?: string
      paxFirstName?: string
      dmsInt: 'D' | 'I'
      custSttsCod?: string
      airportCode?: string
    }
  }

  SetStatus: {
    type: 'Profile.SetStatus'
    payload: {
      APVP1004Status?: Status
      APAP1002Status?: Status
      APAP1001Status?: Status
    }
  }

  SetBasicInfo: {
    type: 'Profile.SetBasicInfo'
    payload: BasicInfo
  }

  SetAirportInfo: {
    type: 'Profile.SetAirportInfo'
    payload: AirportInfo
  }

  SetAirportCode: {
    type: 'Profile.SetAirportCode'
    payload: string
  }

  SetErrorInfo: {
    type: 'Profile.SetErrorInfo'
    payload: ErrorInfo
  }

  SetEditStatus: {
    type: 'Profile.SetEditStatus'
    payload: {
      editingAirportInfo?: boolean
    }
  }
}

const reducer: Reducer<Profile, ValueOf<ProfileAction>> = function(
  profile = {
    flightDate: '',
    airportCode: '',
    domInt: 'D',
    APVP1004Status: 'INITIAL',
    APAP1002Status: 'INITIAL',
    APAP1001Status: 'INITIAL',
    airportInfoMap: {},
  },
  action,
  state,
) {
  switch (action.type) {
    case 'Profile.SetProfileKey': {
      const {
        payload: {
          flightDate,
          ceCarrierCode,
          ceMemberNum,
          pnrRecordLocator,
          segmentCarrierCode,
          flightNum,
          paxFamilyName,
          paxFirstName,
          dmsInt,
          custSttsCod,
        },
      } = action

      if (
        profile.flightDate === flightDate &&
        profile.ceCarrierCode === ceCarrierCode &&
        profile.ceMemberNum === ceMemberNum &&
        profile.pnrRecordLocator === pnrRecordLocator &&
        profile.segmentCarrierCode === segmentCarrierCode &&
        profile.flightNum === flightNum &&
        profile.paxFamilyName === paxFamilyName &&
        profile.paxFirstName === paxFirstName &&
        profile.domInt === dmsInt &&
        profile.custSttsCod === custSttsCod
      ) {
        return profile
      }

      return {
        ...profile,
        flightDate,
        ceCarrierCode,
        ceMemberNum,
        pnrRecordLocator,
        segmentCarrierCode,
        flightNum,
        paxFamilyName,
        paxFirstName,
        dmsInt,
        basicInfo: undefined,
        airportInfoMap: {},
        APVP1004Status: 'NEED_TO_REFRESH',
        APAP1002Status: 'NEED_TO_REFRESH',
      }
    }

    case 'Profile.SetStatus': {
      const { payload: status } = action
      return {
        ...profile,
        ...status,
      }
    }

    case 'Profile.SetBasicInfo': {
      const { payload: basicInfo } = action
      return {
        ...profile,
        basicInfo,
      }
    }

    case 'Profile.SetAirportInfo': {
      const { payload: airportInfo } = action
      return {
        ...profile,
        airportInfoMap: {
          ...profile.airportInfoMap,
          [airportInfo.airportCode]: airportInfo,
        },
      }
    }

    case 'Profile.SetAirportCode': {
      const { payload: airportCode } = action
      return {
        ...profile,
        airportCode,
      }
    }

    case 'Profile.SetErrorInfo': {
      const { payload: errorInfo } = action
      return {
        ...profile,
        errorInfo,
      }
    }

    case 'Profile.SetEditStatus': {
      const { payload: status } = action
      return {
        ...profile,
        ...status,
      }
    }

    default: {
      const _: never = action
      return profile
    }
  }
}

export default reducer
