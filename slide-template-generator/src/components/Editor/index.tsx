export default function Editor(props: { children: React.ReactNode }) {
    return <div className="editor flex w-screen h-[75vh] p-2">{props.children}</div>
}
