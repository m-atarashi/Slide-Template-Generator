import Slide from '../Slide'
import SlideContainer from './SlideContainer'

export default function Preview(props: { slideIndex: number; activeTheme: string }) {
    return (
        <div className="preview flex-grow h-full m-1 p-1 bg-white">
            <div className="frame flex items-center justify-center w-full h-full border-[1px] rounded-md bg-slate-100">
                <SlideContainer>
                    <Slide slideIndex={props.slideIndex} />
                </SlideContainer>
            </div>
        </div>
    )
}
