import Slide from '../Slide'
import PreviewContainer from './PreviewContainer'
import SlideContainer from './SlideContainer'

export default function Preview({ slideNumber }: { slideNumber: number }) {
    return (
        <PreviewContainer>
            <SlideContainer>
                <Slide slideNumber={slideNumber} />
            </SlideContainer>
        </PreviewContainer>
    )
}
