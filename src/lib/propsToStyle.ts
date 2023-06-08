import PptxGenJS from 'pptxgenjs'

export const propsToStyle = (props: any, scale: number) => {
    const styles: { [key: string]: any } = {}
    if (props.w) styles[propToStyleMap.w] = coordToStyle(props.w, scale)
    if (props.h) styles[propToStyleMap.h] = coordToStyle(props.h, scale)
    if (props.x) styles[propToStyleMap.x] = coordToStyle(props.x, scale)
    if (props.y) styles[propToStyleMap.y] = coordToStyle(props.y, scale)
    if (props.align) styles[propToStyleMap.align] = props.align
    if (props.valign) styles[propToStyleMap.valign] = props.valign
    if (props.color) styles[propToStyleMap.color] = colorToStyle(props.color)
    if (props.fill?.color) styles[propToStyleMap.fill] = colorToStyle(props.fill.color)
    if (props.fontSize) styles[propToStyleMap.fontSize] = pointsToStyle(props.fontSize, scale)
    if (props.margin) styles[propToStyleMap.margin] = pointsToStyle(props.margin, scale)
    if (props.bold) styles[propToStyleMap.bold] = 'bold'

    return styles
}

export default propsToStyle

const propToStyleMap: { [key: string]: string } = {
    w: 'width',
    h: 'height',
    x: 'left',
    y: 'top',
    align: 'textAlign',
    valign: 'verticalAlign',
    color: 'color',
    fill: 'backgroundColor',
    fontSize: 'fontSize',
    margin: 'margin',
    bold: 'fontWeight',
}

const coordToStyle = (value: PptxGenJS.Coord, scale: number) => {
    if (typeof value === 'number') return `${value * scale}in`
    if (typeof value === 'string') return value
}

const colorToStyle = (value: PptxGenJS.HexColor) => {
    if (typeof value === 'string') return '#' + value
}

const pointsToStyle = (value: number, scale: number) => {
    if (typeof value === 'number') return `${value * scale}pt`
}
