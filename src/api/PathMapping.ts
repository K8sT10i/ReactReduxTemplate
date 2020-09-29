import * as SVZP0002 from './v1/InitData'
import * as APAN1001 from './v1/AirportNoticeInfoQuery'
import * as APMS1001 from './v1/MySearchUpdate'
import * as APMS1002 from './v1/MySearchQuery'
import * as APMH1001 from './v1/ModifyHistoryQuery'
import * as ZZGT0001 from './v1/GoogleTranslation'

/**
 * API path and In / Out type mapping.
 */
type PathMapping = SVZP0002.Mapping &
  APMS1001.Mapping &
  APMS1002.Mapping &
  ZZGT0001.Mapping &
  APMH1001.Mapping &
  ZZGT0001.Mapping

export default PathMapping
