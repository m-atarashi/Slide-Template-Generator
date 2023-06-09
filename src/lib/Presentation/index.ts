import { PaperMetadata, Theme } from '../types'
import Default from './Default'
import Demo from './Demo'

const exporters = { Default, Demo }
export default exporters as {
    [key: string]: (papers: PaperMetadata[], Theme: Theme) => Promise<void>
}
