import Addressbar from './Addressbar'
import SaveBtn from './SaveBtn'

export default function Header() {
    return (
        <>
            <div className="header flex h-[100pt] p-4">
                <Addressbar />
                <SaveBtn />
            </div>
        </>
    )
}
