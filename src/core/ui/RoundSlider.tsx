import { IRoundSlider } from '../interfaces';
import { circleMovementAfterMouse } from 'mz-math';
import { useEffect, useRef } from 'react';

// TODO: make handle any svg shape
// TODO: provide option to gradient colors

const polarToCartesian = (cx: number, cy: number, rx: number, ry: number, angleInDegrees: number) : [number, number] => {
    const angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

    return [
        cx + (rx * Math.cos(angleInRadians)),
        cy + (ry * Math.sin(angleInRadians)),
    ];
}

export const RoundSlider = (props: IRoundSlider) => {

    const handleRef = useRef(null);

    let {
        rx, ry,
        startAngle, endAngle,
        strokeWidth, stroke,
        rxHandle, ryHandle
    } = props; // TODO: make const except endAngle

    const width = rx * 2;
    const height = ry * 2;

    const angle = 0;
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    const sweepFlag = 1;

    if(endAngle % 360 === 0){ // fix mode for negative
        endAngle -= 0.00001;
    }

    const diffX = Math.max(0, rxHandle * 2 - strokeWidth);
    const diffY = Math.max(0, ryHandle * 2 - strokeWidth);

    const svgWidth = width + strokeWidth + diffX;
    const svgHeight = height + strokeWidth + diffY;

    const cx = rx + strokeWidth / 2 + diffX / 2;
    const cy = ry + strokeWidth / 2 + diffY / 2;

    const startPos = polarToCartesian(cx, cy, rx, ry, startAngle);
    const endPos = polarToCartesian(cx, cy, rx, ry, endAngle);

    useEffect(() => {

        const update = (evt: MouseEvent) => {

            if(!handleRef || !handleRef.current) return;

            const mouse = [evt?.clientX ?? 0, evt?.clientY ?? 0];

            // set circle css position ----------------------
            const position = circleMovementAfterMouse(mouse, [cx, cy], rx);
            handleRef.current.setAttribute('cx', `${ position[0] }px`);
            handleRef.current.setAttribute('cy', `${ position[1] }px`);
        };

        document.addEventListener('mousemove', update);

        return () => {
            document.removeEventListener('mousemove', update);
        };

    }, []);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={ svgWidth }
            height={ svgHeight }>

            <path
                d={ `M ${ startPos[0] } ${ startPos[1] } A ${ rx } ${ ry } ${ angle } ${ largeArcFlag } ${ sweepFlag } ${ endPos[0] } ${ endPos[1] }` }
                stroke={ stroke }
                strokeWidth={ strokeWidth }
                fill="none"
                shapeRendering="geometricPrecision"
                strokeLinecap="round"
                cursor="pointer"
            />

            <ellipse
                ref={ handleRef }
                cx={ startPos[0] }
                cy={ startPos[1] }
                rx={ rxHandle }
                ry={ ryHandle }
                cursor="pointer"
                fill="#000"
            />
        </svg>
    )
};