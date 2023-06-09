import { PaperMetadata } from '@lib/types'

import Default from './Default'

const ThemeComponents = { Default }

export default ThemeComponents as {
    [key: string]: (props: { paperMetadata: PaperMetadata; scale: number }) => React.JSX.Element
}
