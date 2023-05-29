export default function PreviewContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="preview-container w-[88%] m-1 p-1 bg-white">
            <div className="frame flex items-center justify-center w-full h-full border-[1px] rounded-md bg-slate-100">
                {children}
            </div>
        </div>
    )
}
