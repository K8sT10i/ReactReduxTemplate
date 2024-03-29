import { RootState } from '../../src/modules'
import { ui } from './Ui'
import searchData from './TakeOverFlightInfoDomesticQuery'
import profileData from './AirportVipMemberInfoSearch'
import { SegmentInfo } from '../../src/modules/searchForCeRecord'

export * from './Ui'

const stub: RootState = {
  ceRecord: {
    pnrRecordLocator: '',
    dmsInt: 'D',
    paxList: [],
    pnrLinkInfoList: [],
    ssrInfoList: [],
    osiInfoList: [],
    rmksInfoList: [],
    stInfoList: [],
    profileInfo: {},
    updatePaxTrackingParam: {
      airportCode: '',
      paxTrackingCode: '0',
    },
    showModalPNRDelete: false,
    showModalPNRRegist: false,
    showModalPNRInfoRegist: false,
    showModalPNRInfoError: false,

    APAT1001Status: 'INITIAL',
    APAT1002Status: 'INITIAL',
    APCR1001Status: 'INITIAL',
    APCR1003Status: 'INITIAL',
    APCR1004Status: 'INITIAL',
    APCR1005Status: 'INITIAL',
    APCR1006Status: 'INITIAL',
    APCR1007Status: 'INITIAL',
    APCR1008Status: 'INITIAL',
    APCR1009Status: 'INITIAL',
    APCR1010Status: 'INITIAL',
    APCR1011Status: 'INITIAL',
    APCR1012Status: 'INITIAL',
    APCR1015Status: 'INITIAL',
    APCR1016Status: 'INITIAL',
    APCR1021Status: 'INITIAL',
    APCR1020Status: 'INITIAL',
    APPT1001Status: 'INITIAL',
    APPF1009Status: 'INITIAL',
    APTT1001Status: 'INITIAL',
    APTT1002Status: 'INITIAL',
    APMH1001Status: 'INITIAL',
    APCR1022Status: 'INITIAL',
  },
  airportDbMaintenance: {
    changes: [],
    airportCode: '',
    data: [],
    headers: [],
    filters: [],
    sorting: {
      isSortedDesc: false,
      sortItem: undefined,
    },
    page: {
      currentPage: 0,
      pages: 0,
    },
    APAP1002Status: 'INITIAL',
    APAP1001Status: 'INITIAL',
    APVP1004Status: 'INITIAL',
    errorInfoList: [],
  },
  searchForCeRecord: {
    airCode: '',
    dmsInt: 'D',
    airFlight: 'AIR',
    depArrOp: 'B',
    dateType: 'STDSTA',
    baseDate: '',
    flightInfoList: [],
    tagList: [],
    ssrKeyWordList: [],
    segmentInfoList: searchData.segmentInfoList.map<SegmentInfo>(seg => ({
      ...seg,
      key: '',
      paxTotalCount: '',
      pnrList: [],
      APFL1001Status: 'INITIAL',
      APFL1002Status: 'INITIAL',
      APFI1001Status: 'INITIAL',
    })),
    pnrInfo: [],
    APTO1001Status: 'INITIAL',
    APTO1002Status: 'INITIAL',
    APRS1001Status: 'INITIAL',
    APRS1002Status: 'INITIAL',
    APFI1002Status: 'INITIAL',
    searchFlag: false,
  },
  searchForVIP: {
    airCode: '',
    dmsInt: 'D',
    depArrOp: 'B',
    dateType: 'STDSTA',
    baseDate: '',
    airFlight: 'AIR',
    flightInfoList: [],
    ssrKeyWordList: [],
    tagList: [],
    segmentInfoList: searchData.segmentInfoList.map(seg => ({
      ...seg,
      key: '',
      APFL1001Status: 'INITIAL',
      APFL1002Status: 'INITIAL',
      APFI1001Status: 'INITIAL',
    })),

    APTO1001Status: 'INITIAL',
    APTO1002Status: 'INITIAL',
    SVAP1006Status: 'INITIAL',
    APVP1007Status: 'INITIAL',
    searchFlag: false,
  },
  searchForTask: {
    scrType: '1',
    searchList: [],
    updType: '0',
    bizGroupCode: '',
    userId: '',
    userName: '',
    taskTodoInfo: {},
    APTT1002Status: 'INITIAL',
    APCR1015Status: 'INITIAL',
    APTT1001Status: 'INITIAL',
    resultList: [],
  },
  // profile,
  profile: {
    airportInfoMap: {
      HND: {
        carrCode: profileData.airportVipMemberInfoList[0].carrCode,
        airportCode: profileData.airportVipMemberInfoList[0].airportCode,
        memberNum: profileData.airportVipMemberInfoList[0].memberNum,
        airportVipInfoItemList:
          profileData.airportVipMemberInfoList[0].airportVipInfoItemList,
        airportVipMemberInfoNameList: profileData.airportVipMemberInfoNameList,
        updateSystemDateTime: '',
      },
    },
    APAP1001Status: 'INITIAL',
    APAP1002Status: 'INITIAL',
    flightDate: '',
    domInt: 'D',
    APVP1004Status: 'INITIAL',
  },
  ui,
  airportNoticeInfo: {
    updateType: 'M',
    airportCode: '',
    noticeSeqInfoList: [],
    APAN1001Status: 'INITIAL',
    APAN1002Status: 'INITIAL',
    noticeSeqInfoListUpdate: [],
    noticeSeqInfoListDelete: [],
    showModal: 'HIDDEN',
    noticeMessage: {
      messageContent: '',
      messageFlag: false,
      messageType: 1,
    },
  },
  modifySearch: {
    updateType: '',
    screenId: '',
    searchPtrnSeq: '',
    searchPtrnName: '',
    searchPtrn: '',
    APMS1001Status: 'INITIAL',
  },
  mySearch: {
    APMS1002Status: 'INITIAL',
    searchPtrnInfo: [],
    userId: '',
  },
  login: {
    APSN1001Status: 'INITIAL',
    TVLG1002Status: 'INITIAL',
    TVLG1003Status: 'INITIAL',
    noticeList: [],
  },
  googleTranslation: {
    ZZGT0001Status: 'INITIAL',
    translationType: '',
    translationValueList: [],
    translationalResult: [],
  },
  cePortalLock: {
    ZZEC1001Status: 'INITIAL',
    key: '',
    user: '',
  },
  cePortalUnLock: {
    ZZEC1001Status: 'INITIAL',
    key: '',
    user: '',
  },
}

export default stub
