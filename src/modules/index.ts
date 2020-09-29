import ceRecord, { CeRecord, CeRecordAction } from './ceRecord'
import profile, { Profile, ProfileAction } from './profile'
import ui, { UI, UIAction } from './ui'
import { Debug, DebugAction } from './debug'
import searchForCeRecord, {
  SearchForCeRecord,
  SearchForCeRecordAction,
} from './searchForCeRecord'
import searchForTask, {
  SearchForTask,
  SearchForTaskAction,
} from './searchForTask'
import searchForVIP, { SearchForVIP, SearchForVIPAction } from './searchForVIP'
import airportDbMaintenance, {
  AirportDbMaintenance,
  AirportDbMaintenanceAction,
} from './airportDbMaintenance'
import airportNotice, {
  AirportNoticeInfo,
  AirportNoticeAction,
} from './airportNotice'
import modifySearch, { ModifySearch, ModifySearchAtion } from './mySearchUpdate'
import MySearchQuery, { MySearch, MySearchAction } from './mySearchQuery'
import login, { Login, LoginAction } from './login'
import googleTranslation, {
  GoogleTranslation,
  GoogleTranslationAction,
} from './googleTranslation'
import cePortalLock, { CePortalLock, CePortalLockAction } from './cePortalLock'
import cePortalUnLock, {
  CePortalUnLock,
  CePortalUnLockAction,
} from './cePortalUnLock'

export type Status =
  | 'INITIAL'
  | 'NEED_TO_REFRESH'
  | 'LOADING'
  | 'COMPLETE'
  | 'ERROR'

export type ModalStatus = 'HIDDEN' | 'UPDATE' | 'DELETE'

export type RootState = {
  ceRecord: CeRecord
  airportDbMaintenance: AirportDbMaintenance
  searchForCeRecord: SearchForCeRecord
  searchForTask: SearchForTask
  searchForVIP: SearchForVIP
  profile: Profile
  ui: UI
  debug?: Debug
  airportNoticeInfo: AirportNoticeInfo
  modifySearch: ModifySearch
  mySearch: MySearch
  login: Login
  googleTranslation: GoogleTranslation
  cePortalLock: CePortalLock
  cePortalUnLock: CePortalUnLock
}

export type AllActions =
  | ValueOf<CeRecordAction>
  | ValueOf<AirportDbMaintenanceAction>
  | ValueOf<SearchForCeRecordAction>
  | ValueOf<SearchForTaskAction>
  | ValueOf<SearchForVIPAction>
  | ValueOf<ProfileAction>
  | ValueOf<UIAction>
  | DebugAction
  | ValueOf<AirportNoticeAction>
  | ValueOf<ModifySearchAtion>
  | ValueOf<MySearchAction>
  | ValueOf<LoginAction>
  | ValueOf<GoogleTranslationAction>
  | ValueOf<CePortalLockAction>
  | ValueOf<CePortalUnLockAction>

export type Reducer<TStateSlice, TAction> = (
  slicedState: DeepReadonly<TStateSlice> | undefined,
  action: TAction,
  rootState?: DeepReadonly<RootState> | undefined,
) => DeepReadonly<TStateSlice>

/**
 * 最も根幹となる reducer.
 *
 * @param state Root state
 * @param action 全アクションが渡ってくる
 */
export const rootReducer: Reducer<RootState, AllActions> = function(
  state,
  action,
) {
  return {
    ceRecord: ceRecord(
      state && state.ceRecord,
      action as ValueOf<CeRecordAction>,
      state,
    ),

    airportDbMaintenance: airportDbMaintenance(
      state && state.airportDbMaintenance,
      action as ValueOf<AirportDbMaintenanceAction>,
      state,
    ),

    searchForCeRecord: searchForCeRecord(
      state && state.searchForCeRecord,
      action as ValueOf<SearchForCeRecordAction>,
      state,
    ),

    searchForTask: searchForTask(
      state && state.searchForTask,
      action as ValueOf<SearchForTaskAction>,
      state,
    ),

    searchForVIP: searchForVIP(
      state && state.searchForVIP,
      action as ValueOf<SearchForVIPAction>,
      state,
    ),

    profile: profile(
      state && state.profile,
      action as ValueOf<ProfileAction>,
      state,
    ),

    airportNoticeInfo: airportNotice(
      state && state.airportNoticeInfo,
      action as ValueOf<AirportNoticeAction>,
      state,
    ),

    ui: ui(state && state.ui, action as ValueOf<UIAction>, state),

    modifySearch: modifySearch(
      state && state.modifySearch,
      action as ValueOf<ModifySearchAtion>,
      state,
    ),
    mySearch: MySearchQuery(
      state && state.mySearch,
      action as ValueOf<MySearchAction>,
      state,
    ),
    cePortalLock: cePortalLock(
      state && state.cePortalLock,
      action as ValueOf<CePortalLockAction>,
      state,
    ),
    cePortalUnLock: cePortalUnLock(
      state && state.cePortalUnLock,
      action as ValueOf<CePortalUnLockAction>,
      state,
    ),
    login: login(state && state.login, action as ValueOf<LoginAction>, state),
    googleTranslation: googleTranslation(
      state && state.googleTranslation,
      action as ValueOf<GoogleTranslationAction>,
      state,
    ),
  }
}
