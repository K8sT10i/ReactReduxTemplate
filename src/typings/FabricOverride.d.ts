declare global {
  import {
    IStackProps,
    IStackItemProps,
  } from 'office-ui-fabric-react/lib/Stack'

  module 'office-ui-fabric-react/lib/Stack' {
    // eslint-disable-next-line import/prefer-default-export
    export declare const Stack: React.StatelessComponent<
      IStackProps & {
        childrenGap?: string
      }
    > & {
      Item: React.StatelessComponent<
        IStackItemProps & {
          minWidth?: number | string
          maxWidth?: number | string
        }
      >
    }
  }
}
