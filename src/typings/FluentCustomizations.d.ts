declare global {
  // eslint-disable-next-line no-restricted-imports
  import {
    ITheme,
    IDetailsRowStyleProps,
    IDetailsRowStyles,
    IDialogContentStyleProps,
    IDialogContentStyles,
    ILabelStyleProps,
    ILabelStyles,
    ITextFieldStyleProps,
    ITextFieldStyles,
  } from 'office-ui-fabric-react'
  import { IStyleBaseArray, IRawStyle } from '@uifabric/merge-styles/lib/IStyle'
  import { IDetailsColumnStyles } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsColumn.types'

  module '@uifabric/fluent-theme' {
    // I'm not sure why eslint gets angry, but it's just a type-defining file, so loosen it
    // eslint-disable-next-line import/prefer-default-export
    export declare const FluentCustomizations: {
      settings: {
        theme: ITheme
      }
      scopedSettings: {
        Breadcrumb: {
          styles: BreadcrumbStyles
        }
        CalloutContent: {
          styles: CalloutContentStyles
        }
        ColorPicker: {
          styles: ColorPickerStyles
        }
        ColorRectangle: {
          styles: ColorRectangleStyles
        }
        ColorSlider: {
          styles: ColorSliderStyles
        }
        CommandBar: {
          styles: CommandBarStyles
        }
        CommandBarButton: {
          styles: CommandBarButtonStyles
        }
        CompoundButton: {
          styles: CompoundButtonStyles
        }
        Check: {
          styles: CheckStyles
        }
        Checkbox: {
          styles: CheckboxStyles
        }
        ChoiceGroupOption: {
          styles: ChoiceGroupOptionStyles
        }
        ColorPickerGridCell: {
          styles: ColorPickerGridCellStyles
        }
        ComboBox: {
          styles: ComboBoxStyles
        }
        CompactPeoplePicker: {
          styles: BasePickerStyles
        }
        ContextualMenu: {
          styles: ContextualMenuStyles
        }
        DatePicker: {
          styles: DatePickerStyles
        }
        DefaultButton: {
          styles: DefaultButtonStyles
        }
        DetailsColumn: {
          styles: () => Specify<
            Partial<IDetailsColumnStyles>,
            {
              cellName: IRawStyle
            }
          >
        }
        DetailsRow: {
          styles: (
            props: IDetailsRowStyleProps,
          ) => Specify<Partial<IDetailsRowStyles>, { root: IStyleBaseArray }>
        }
        DialogContent: {
          styles: (
            props: IDialogContentStyleProps,
          ) => Specify<Partial<IDialogContentStyles>, { subText: IRawStyle }>
        }
        DialogFooter: {
          styles: DialogFooterStyles
        }
        Dropdown: {
          styles: DropdownStyles
        }
        ExpandingCard: {
          styles: ExpandingCardStyles
        }
        Facepile: {
          styles: FacepileStyles
        }
        IconButton: {
          styles: IconButtonStyles
        }
        Label: {
          styles: (
            props: ILabelStyleProps,
          ) => Specify<Partial<ILabelStyles>, { root: IStyleBaseArray }>
        }
        Link: {
          styles: LinkStyles
        }
        ListPeoplePicker: {
          styles: BasePickerStyles
        }
        Modal: {
          styles: ModalStyles
        }
        Panel: {
          styles: PanelStyles
        }
        NormalPeoplePicker: {
          styles: BasePickerStyles
        }
        PeoplePickerItem: {
          styles: PeoplePickerItemStyles
        }
        Persona: {
          styles: PersonaStyles
        }
        Pivot: {
          styles: PivotStyles
        }
        PlainCard: {
          styles: PlainCardStyles
        }
        PrimaryButton: {
          styles: PrimaryButtonStyles
        }
        Rating: {
          styles: RatingStyles
        }
        Slider: {
          styles: SliderStyles
        }
        SpinButton: {
          styles: SpinButtonStyles
        }
        Suggestions: {
          styles: SuggestionsStyles
        }
        SuggestionItem: {
          styles: SuggestionItemStyles
        }
        TagItem: {
          styles: TagItemStyles
        }
        TagPicker: {
          styles: BasePickerStyles
        }
        TeachingBubble: {
          styles: TeachingBubbleStyles
        }
        TeachingBubbleContent: {
          styles: TeachingBubbleContentStyles
        }
        TextField: {
          styles: (
            props: ITextFieldStyleProps,
          ) => Specify<
            Partial<ITextFieldStyles>,
            { fieldGroup: IStyleBaseArray }
          >
        }
        Toggle: {
          styles: ToggleStyles
        }
      }
    }
  }
}
