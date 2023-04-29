import { IRoundSlider } from '../interfaces';

const polarToCartesian = (cx: number, cy: number, rx: number, ry: number, angleInDegrees: number) : [number, number] => {
    const angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

    return [
        cx + (rx * Math.cos(angleInRadians)),
        cy + (ry * Math.sin(angleInRadians)),
    ];
}

export const RoundSlider = (props: IRoundSlider) => {

    let { rx, ry, startAngle, endAngle, strokeWidth, stroke } = props; // TODO: make const except endAngle

    const width = rx * 2;
    const height = ry * 2;

    const angle = 0;
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    const sweepFlag = 1;

    if(endAngle % 360 === 0){ // fix mode for negative
        endAngle -= 0.00001;
    }

    const cx = rx + strokeWidth / 2;
    const cy = ry + strokeWidth / 2;

    const startPos = polarToCartesian(cx, cy, rx, ry, startAngle);
    const endPos = polarToCartesian(cx, cy, rx, ry, endAngle);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={ width + strokeWidth }
            height={ height + strokeWidth }>

            <path
                d={ `M ${ startPos[0] } ${ startPos[1] } A ${ rx } ${ ry } ${ angle } ${ largeArcFlag } ${ sweepFlag } ${ endPos[0] } ${ endPos[1] }` }
                stroke={ stroke }
                strokeWidth={ strokeWidth }
                fill="none"
                shapeRendering="geometricPrecision"
                strokeLinecap="round"
            />
        </svg>
    )
};