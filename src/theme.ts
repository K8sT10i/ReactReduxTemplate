import React from 'react'
import styled, { createGlobalStyle } from 'styled-components/macro'
import { Customizer } from 'office-ui-fabric-react/lib/Utilities'
import { createTheme } from 'office-ui-fabric-react/lib/Styling'
import {
  FluentCustomizations,
  NeutralColors,
  FontSizes,
} from '@uifabric/fluent-theme'
import { Stack } from 'office-ui-fabric-react/lib/components/Stack'

const fontFamily: string = [
  // TODO: あとで Noto Sans JP の資材やCSSファイルを消す
  'Avenir Next',
  'Segoe UI',
  'Hiragino Kaku Gothic Pro',
  'Meiryo',
  'sans-serif',
].join(', ')

export const contentWidth = {
  minWidth: 768,
  maxWidth: 1280,
}

export const GlobalStyle = createGlobalStyle`
  :root {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    line-height: ${24 / 20};
    letter-spacing: 0.03em;
    font-size: ${FontSizes.size16};
    font-family: ${fontFamily};
    color: #353F58;
    background-color: #EDEFF5;
    margin-left: auto;
    margin-right: auto;

    /*
     * コンテンツ幅を 768px ～ 1280px とする。
     * これ以上画面が大きい場合は、全体に中央に配置し左右に余白を設ける。
     */
    @media (min-width: ${contentWidth.maxWidth}px) {
    max-width: ${contentWidth.maxWidth}px;
    }
    @media (max-width: ${contentWidth.minWidth}px) {
    min-width: ${contentWidth.minWidth}px;
    }
  }

  /* ress.css が color: #000; にしてくるのを上書きする */
  ::selection {
    color: inherit;
  }
`

// FIXME: デザインガイドが決まったら修正
export const color = {
  // ヘッダー・ナビゲーション
  anaNavy: '#0B308E',
  anaNavyDark: '#001F79',
  // ボタン・チェックボックス
  skyBlue: '#1A6DFA',
  skyBlueDark: '#0646C6',
  disabled: '#F3F2F1',
  // 文字
  inkBlack: '#353F58',
  pencilGray: '#686D7E',
  // ページ背景
  neutralGray: '#EDEFF5',
  reletiveGray: '#f6f7fc',
  // コンテンツ背景
  white: '#FFFFFF',
  altWhite: '#F6F7FC',
  // ボーダー
  lineLight: '#E6E9F2',
  lineDark: '#abafba',
  // 警告系ボタン・バッジ
  attentionRed: '#DC0706',
  attentionRedHover: '#D10000',
  warnOrange: '#F4A915',
  warnOrangeHover: '#DD7700',
  // タスクステータス
  openYellow: '#FFDC26',
  openYellowHover: '#FFDC26',
  acceptGreen: '#4CDB51',
  acceptGreenHover: '#48C452',
  doneBlue: '#2FB4FF',
  doneBlueHover: '#30A2E6',
  rejectGray: '#4E5361',
  rejectGrayHover: '#3F475C',
  withdrawGray: '#7A8091',
  withdrawGrayHover: '#656D80',
  // タグ
  departureGreen: '#008A00',
  onFlightBlue: '#2B56DF',
  arrivalPurple: '#9342C8',
  commonPink: '#E4136C',
}

// Basic
export const ContainerPadding32 = styled.div`
  padding: 32px;
  background-color: ${color.white};
`

// Wide
export const ContainerPadding16 = styled.div`
  padding: 16px;
  background-color: ${color.white};
`
// 各UIコンポの縦の余白。index とかで使う
export const ContainerChildrenGap12 = styled(Stack).attrs(() => ({
  childrenGap: '12px 0px',
}))``

export const theme = createTheme({
  palette: {
    ...FluentCustomizations.settings.theme.palette,
    themePrimary: '#0b318f', // Triton blue
    themeLighterAlt: '#f1f4fb',
    themeLighter: '#cad4ed',
    themeLight: '#a0b2dd',
    themeTertiary: '#5471bc',
    themeSecondary: '#1e429c',
    themeDarkAlt: '#0a2c81',
    themeDark: '#09256d',
    themeDarker: '#061b50',
  },
  effects: {
    ...FluentCustomizations.settings.theme.effects,
  },
  defaultFontStyle: {
    fontFamily,
  },
})

export const customizations: React.ComponentProps<typeof Customizer> &
  typeof FluentCustomizations = {
  ...FluentCustomizations,

  settings: {
    ...FluentCustomizations.settings,
    theme,
  },

  scopedSettings: {
    ...FluentCustomizations.scopedSettings,

    DetailsList: {
      styles() {
        return {
          root: [
            {
              color: 'inherit',
            },
          ],
        }
      },
    },

    DetailsColumn: {
      styles() {
        const styles = FluentCustomizations.scopedSettings.DetailsColumn.styles()
        return {
          ...styles,
          cellTitle: {
            fontSize: FontSizes.size12,
            lineHeight: 32,
            color: NeutralColors.gray130,
          },
          cellName: {
            ...styles.cellName,
            fontSize: FontSizes.size12,
          },
        }
      },
    },

    DetailsRow: {
      styles(p) {
        const styles = FluentCustomizations.scopedSettings.DetailsRow.styles(p)
        return {
          ...styles,
          root: [
            ...styles.root,
            {
              color: 'inherit',
            },
          ],
        }
      },
    },

    DialogContent: {
      styles(p) {
        const styles = FluentCustomizations.scopedSettings.DialogContent.styles(
          p,
        )
        return {
          ...styles,
          subText: {
            ...styles.subText,
            whiteSpace: 'pre-line',
          },
        }
      },
    },

    // Label 単体のスタイルのほか、TextField や Dropdown のラベルにも影響がある。
    // （それらが内部で Label コンポーネントを使っているから）
    Label: {
      styles(p) {
        const styles = FluentCustomizations.scopedSettings.Label.styles(p)
        return {
          ...styles,
          root: [
            ...styles.root,
            {
              paddingTop: 8,
              paddingBottom: 1,
              fontSize: FontSizes.size12,
              color: NeutralColors.gray130,
            },
          ],
        }
      },
    },

    TextField: {
      styles(p) {
        const styles = FluentCustomizations.scopedSettings.TextField.styles(p)
        return {
          ...styles,
          fieldGroup: [
            ...styles.fieldGroup,
            {
              backgroundColor: 'transparent',
            },
          ],
        }
      },
    },

    Stack: {
      // `<Stack tokens={{ childrenGap: '16 32' }} />` を
      // `<Stack childrenGap="16 32" />` のように書きやすくする。
      tokens({ childrenGap }) {
        return {
          childrenGap,
        }
      },
    },

    StackItem: {
      // `<Stack.Item styles={{ root: { minWidth: 200 } }} />` を
      // `<Stack.Item minWidth={200} />` のように書きやすくする。
      styles({ minWidth, maxWidth }) {
        return {
          root: {
            minWidth,
            maxWidth,
            // horizontal Stack が等幅で並ぶように。
            flexBasis: 0,
          },
        }
      },
    },
  },
}
