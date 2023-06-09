import PptxGenJS from 'pptxgenjs'

export const propsToStyle = (props: any, scale: number, options?: { hyperlink: string }) => {
    const styles: { [key: string]: any } = {}
    // 座標関係
    if (props.w) styles[propToStyleMap.w] = coordToStyle(props.w, scale)
    if (props.h) styles[propToStyleMap.h] = coordToStyle(props.h, scale)
    if (props.x) styles[propToStyleMap.x] = coordToStyle(props.x, scale)
    if (props.y) styles[propToStyleMap.y] = coordToStyle(props.y, scale)

    // 配置
    if (props.align) {
        styles[propToStyleMap.align] = props.align
    }
    if (props.valign) {
        // インライン要素
        styles[propToStyleMap.valign] = props.valign

        // ブロック要素
        styles['alignItems'] = toAlignItems[props.valign]
        styles['display'] = 'flex'
    }

    // 色
    if (props.color) {
        styles[propToStyleMap.color] = colorToStyle(props.color)
    }
    if (props.fill?.color) {
        styles[propToStyleMap.fill] = colorToStyle(props.fill.color)
    }

    // 単位が pt のもの
    if (props.fontSize) {
        styles[propToStyleMap.fontSize] = pointsToStyle(props.fontSize, scale)
    }
    if (props.lineSpacing) {
        styles[propToStyleMap.lineSpacing] = pointsToStyle(props.lineSpacing, scale)
    }
    if (props.margin) {
        styles[propToStyleMap.margin] = pointsToStyle(props.margin, scale)
    }

    // その他
    if (props.bold) {
        styles[propToStyleMap.bold] = 'bold'
    }
    if (props.hyperlink?.url && options?.hyperlink) {
        styles['textDecoration'] = 'underline'
    }
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
    lineSpacing: 'lineHeight',
    margin: 'margin',
    bold: 'fontWeight',
}

const toAlignItems: { [key: string]: string } = {
    top: 'start',
    middle: 'center',
    bottom: 'end',
}

const coordToStyle = (value: PptxGenJS.Coord, scale: number) => {
    if (typeof value === 'number') {
        return `${Math.floor(value * scale)}in`
    }
    if (typeof value === 'string') {
        return value
    }
}

const colorToStyle = (value: PptxGenJS.HexColor) => {
    if (typeof value === 'string') {
        return '#' + value
    }
}

const pointsToStyle = (value: number, scale: number) => {
    if (typeof value === 'number') {
        return `${Math.floor(value * scale)}pt`
    }
}
