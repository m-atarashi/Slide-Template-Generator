import { PaperMetadata } from '@lib/types'

import Default from './Default'
import Demo from './Demo'

const ThemeComponents = { Default, Demo }

export default ThemeComponents as {
    [key: string]: (props: { paperMetadata: PaperMetadata; scale: number }) => React.JSX.Element
}
