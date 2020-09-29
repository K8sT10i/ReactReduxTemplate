import React, { useState } from 'react'
import { Stack, IStackStyles } from 'office-ui-fabric-react/lib/Stack'
import { Icon, IIconProps } from 'office-ui-fabric-react/lib/Icon'
import { Label } from 'office-ui-fabric-react/lib/Label'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import {
  PrimaryButton,
  DefaultButton,
  IconButton,
} from 'office-ui-fabric-react/lib/Button'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from 'office-ui-fabric-react/lib/Spinner'
import { Modal } from 'office-ui-fabric-react/lib/Modal'
import { ILayerProps } from 'office-ui-fabric-react/lib/Layer'
import { ModifySearchAtion } from '../../modules/mySearchUpdate'
import {
  TVFL1001,
  TVFL1001_SCREENNAME,
  TVVP1001,
  TVVP1001_SCREENNAME,
  TVTT1001,
  TVTT1001_SCREENNAME,
  SUB_CATEGORY_ID_001,
  TVMS1001,
  CATEGORY_ID_01,
  ITEM_ID_001,
  ITEM_ID_002,
  ITEM_ID_003,
  ITEM_ID_004,
  ITEM_ID_005,
  SUB_CATEGORY_ID_000,
  TVZZ1001,
} from '../../util/constants'
import useGetItemName from '../../hooks/useGetItemName'

type Props = {
  isShow: boolean
  hideModal: Function
}

export default function MySearchUpdate({ isShow, hideModal }: Props) {
  const dispatch = useDispatch()

  const [searchPtrnName, setSearchPtrnName] = useState('')
  const [tfErrorMessage, setTfErrorMessage] = useState('')
  const searchTab = useSelector(state => state.ui.searchTab)
  const searching = useSelector(
    state =>
      state.modifySearch && state.modifySearch.APMS1001Status === 'LOADING',
  )
  const searchForCeRecord = useSelector(state => state.searchForCeRecord)
  const searchForVip = useSelector(state => state.searchForVIP)
  const searchForTask = useSelector(state => state.searchForTask)
  const getItemName = useGetItemName(
    TVMS1001,
    CATEGORY_ID_01,
  )(SUB_CATEGORY_ID_001)
  const getItemNameScreen = useGetItemName(
    TVZZ1001,
    CATEGORY_ID_01,
  )(SUB_CATEGORY_ID_000)

  const closeModal = () => {
    setSearchPtrnName('')
    setTfErrorMessage('')
    hideModal()
  }
  function createSearchParam() {
    let searchPattern = ''
    if (searchTab === 'ceRecord') {
      const {
        APTO1001Status,
        APTO1002Status,
        APRS1001Status,
        APRS1002Status,
        segmentInfoList,
        ...searchCeRecord
      } = searchForCeRecord
      searchPattern = JSON.stringify(searchCeRecord)
    } else if (searchTab === 'vip') {
      const {
        APTO1001Status,
        APTO1002Status,
        SVAP1006Status,
        segmentInfoList,
        ...searchVipRecord
      } = searchForVip
      searchPattern = JSON.stringify(searchVipRecord)
    } else if (searchTab === 'notice') {
      const {
        APTT1001Status,
        APTT1002Status,
        APCR1015Status,
        resultList,
        ...searchTaskRecord
      } = searchForTask
      searchPattern = JSON.stringify(searchTaskRecord)
    } else {
      searchPattern = ''
    }
    return searchPattern
  }

  const saveMySearchBtnClick = () => {
    if (searchPtrnName.length === 0) {
      setTfErrorMessage('Required.')
      return
    }

    if (searchPtrnName.length > 100) {
      setTfErrorMessage('条件名称 must be less than 100 characters.')
      return
    }

    let parameterScreenId: string
    switch (searchTab) {
      case 'ceRecord':
        parameterScreenId = TVFL1001
        break
      case 'vip':
        parameterScreenId = TVVP1001
        break
      default:
        parameterScreenId = TVTT1001
        break
    }

    dispatch<ValueOf<ModifySearchAtion>>({
      type: 'ModifySearch.UpdateMySearch',
      payload: {
        updateType: 'M',
        screenId: parameterScreenId,
        searchPtrnSeq: '',
        searchPtrn: createSearchParam(),
        searchPtrnName,
        APMS1001Status: 'NEED_TO_REFRESH',
      },
    })
    closeModal()
  }
  const onKeyEnterPress = e => {
    if (e.key === 'Enter') {
      saveMySearchBtnClick()
    }
  }
  return (
    <>
      <Modal
        isOpen={isShow}
        isBlocking={false}
        layerProps={modalLayerStyle}
        styles={{
          main: {
            width: '540px',
            height: '230px',
            borderRadius: '8px',
          },
        }}
      >
        <Stack>
          <Stack styles={modalStackHeaderStyle}>
            <Label styles={modalStackHeaderTitleStyle}>
              {getItemName(ITEM_ID_005) || 'TEST'}
            </Label>
            <IconButton
              styles={modalStackButtonCloseStyle}
              onClick={() => closeModal()}
              iconProps={exitIcon}
              ariaLabel="Cancel"
              split={false}
            />
          </Stack>
          <Stack styles={modalStackScreenStyle}>
            <Label styles={modalStackScreenTitleStyle}>
              {getItemName(ITEM_ID_001) || 'TEST'}
            </Label>
            <Label styles={modalStackScreenNameStyle}>
              {searchTab === 'ceRecord' &&
                (getItemNameScreen(ITEM_ID_002) || TVFL1001_SCREENNAME)}
              {searchTab === 'vip' &&
                (getItemNameScreen(ITEM_ID_003) || TVVP1001_SCREENNAME)}
              {searchTab === 'notice' &&
                (getItemNameScreen(ITEM_ID_004) || TVTT1001_SCREENNAME)}
            </Label>
          </Stack>

          <Stack styles={modalStackSaveStyle}>
            <Label styles={modalStackScreenTitleStyle}>
              {getItemName(ITEM_ID_002) || 'TEST'}
            </Label>
            <TextField
              styles={modalStackTextboxStyle}
              placeholder="e.g. HND-INT-SSR"
              onChange={(e, v) =>
                v === undefined ? setSearchPtrnName('') : setSearchPtrnName(v!)
              }
              errorMessage={tfErrorMessage}
              onFocus={() => setTfErrorMessage('')}
              onKeyPress={e => onKeyEnterPress(e)}
              autoFocus
            />
          </Stack>
          <Stack
            horizontal
            horizontalAlign="end"
            childrenGap="8"
            style={{
              margin: 16,
            }}
          >
            <DefaultButton
              styles={modalStackButtonCancleStyle}
              text={getItemName(ITEM_ID_003) || 'TEST'}
              onClick={() => closeModal()}
            />
            {searching ? (
              <Spinner
                label="Saving..."
                ariaLive="assertive"
                labelPosition="right"
              />
            ) : (
              <PrimaryButton
                styles={modalStackButtonSaveStyle}
                type="submit"
                text={getItemName(ITEM_ID_004) || 'TEST'}
                onClick={saveMySearchBtnClick}
              />
            )}
          </Stack>
        </Stack>
      </Modal>
    </>
  )
}

const modalStackHeaderStyle: IStackStyles = {
  root: {
    width: '100%',
    height: 44,
    background: '#F6F7FC',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottom: '1.35px ridge',
  },
}
const modalStackHeaderTitleStyle: IStackStyles = {
  root: {
    marginLeft: 16,
    textAlign: 'center',
    fontSize: 16,
    color: '#353F58',
    fontWeight: 'bold',
    width: '100%',
    fontStyle: 'normal',
  },
}

const modalStackScreenStyle: IStackStyles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    marginRight: 16,
    height: 52,
    padding: '6px 0px 6px 0px',
    borderBottom: '1px ridge',
    borderBottomColor: '#f1f1f6',
  },
}
const modalStackScreenTitleStyle: IStackStyles = {
  root: {
    textAlign: 'left',
    width: 131,
    fontSize: 14,
    color: '#686D7E',
    fontWeight: 600,
    lineHeight: 20,
    letterSpacing: '0.03em',
    fontStyle: 'normal',
  },
}
const modalStackScreenNameStyle: IStackStyles = {
  root: {
    textAlign: 'left',
    fontSize: 14,
    color: '#353F58',
    fontWeight: 500,
    lineHeight: 20,
    fontStyle: 'normal',
  },
}

const modalStackSaveStyle: IStackStyles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 70,
    padding: '16px 16px 30px 16px',
    borderBottom: '1px ridge',
    borderBottomColor: '#f1f1f6',
  },
}
const modalStackTextboxStyle: IStackStyles = {
  root: {
    width: 350,
    borderRadius: 2,
  },
}

const modalStackButtonCancleStyle: IStackStyles = {
  root: {
    borderRadius: 2,
    marginRight: 17,
  },
}

const modalStackButtonSaveStyle: IStackStyles = {
  root: {
    borderRadius: 2,
    background: '#1A6DFA',
  },
}
const modalStackButtonCloseStyle: IStackStyles = {
  root: {
    position: 'absolute',
    right: 6,
    width: 32,
    height: 32,
    fontSize: 14,
    lineHeight: 14,
    textAlign: 'center',
    fontWeight: 'normal',
    color: '#686D7E',
    padding: 9,
  },
}
const exitIcon: IIconProps = {
  iconName: 'Cancel',
}
const modalLayerStyle: ILayerProps = {
  styles: {
    root: {
      zIndex: 100000,
    },
  },
}
