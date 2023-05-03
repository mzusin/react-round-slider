import { IRoundSlider } from '../interfaces';
import {
    polarToCartesian,
    Vector2,
    degreesToRadians,
    ellipseMovementAfterMouse,
    v2Sub,
    getV2Angle,
    convertRange, ellipseMovement, radiansToDegrees
} from 'mz-math';
import { useEffect, useRef, MouseEvent as  ReactMouseEvent } from 'react';

// TODO: make handle any svg shape
// TODO: provide option to gradient colors

export const RoundSlider = (props: IRoundSlider) => {

    const handleRef = useRef<SVGEllipseElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    let {
        rx, ry,
        startAngle, endAngle,
        strokeWidth, stroke,
        rxHandle, ryHandle
    } = props; // TODO: make const except endAngle

    const width = rx * 2;
    const height = ry * 2;

    //const _endAngle = endAngle;

    const angle = 0;
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    const sweepFlag = 1;

    if(startAngle > endAngle){
        endAngle += 360;
    }

    /*if(endAngle % 360 === 0){ // fix mode for negative
        endAngle -= 0.00001;
    }*/

    const diffX = Math.max(0, rxHandle * 2 - strokeWidth);
    const diffY = Math.max(0, ryHandle * 2 - strokeWidth);

    const svgWidth = width + strokeWidth + diffX;
    const svgHeight = height + strokeWidth + diffY;

    const center: Vector2 = [
        rx + strokeWidth / 2 + diffX / 2,
        ry + strokeWidth / 2 + diffY / 2
    ];

    const radii: Vector2 = [rx, ry];

    const startPos = polarToCartesian(center, radii, degreesToRadians(startAngle)); //  - 90
    const endPos = polarToCartesian(center, radii, degreesToRadians(endAngle)); //  - 90

    const onValueChange = (evt: MouseEvent | ReactMouseEvent | TouchEvent) => {

        if(!svgRef || !svgRef.current || !handleRef || !handleRef.current) return;

        //console.log('getTotalLength', handleRef.current.getTotalLength(), handleRef.current.getPointAtLength(0));

        // find the percent [0, 100] of the current mouse position in slider path
        const mouseX = evt.type.indexOf('mouse') !== -1 ? (evt as MouseEvent).clientX : (evt as TouchEvent).touches[0].clientX;
        const mouseY = evt.type.indexOf('mouse') !== -1 ? (evt as MouseEvent).clientY : (evt as TouchEvent).touches[0].clientY;

        //console.log(mouseX, mouseY);
    }

    const onMouseDown = (evt: MouseEvent | ReactMouseEvent) => {
        if (evt.preventDefault) {
            evt.preventDefault();
        }

        onValueChange(evt);

        window.addEventListener('mousemove', onValueChange);
        window.addEventListener('mouseup', onMouseUp);
    };

    const onMouseUp = (_evt: MouseEvent | ReactMouseEvent) => {
        window.removeEventListener('mousemove', onValueChange);
        window.removeEventListener('mouseup', onValueChange);
    };

    useEffect(() => {

        const update = (evt: MouseEvent) => {

            let bounds = svgRef.current.getBoundingClientRect();
            let x = evt.clientX - bounds.left;
            let y = evt.clientY - bounds.top;

            if(!handleRef || !handleRef.current) return;

            // const mouse: Vector2 = [evt?.clientX ?? 0, evt?.clientY ?? 0];
            const mouse: Vector2 = [x, y];

            // set circle css position ----------------------
            /*const position = ellipseMovementAfterMouse(mouse, center, radii);
            handleRef.current.setAttribute('cx', `${ position[0] }px`);
            handleRef.current.setAttribute('cy', `${ position[1] }px`);*/

            const vector = v2Sub(mouse, center);

            let angle = getV2Angle(vector);
            if(angle < 0){
                angle += 2 * Math.PI;
            }

            const degrees = radiansToDegrees(angle);

            console.log(degrees, startAngle, endAngle)
            if(degrees < startAngle || degrees > endAngle){

            }
            else{
                // convert the angle from the range [0, Math.PI*2] to the range [0, Math.PI]
                angle = convertRange(angle, 0, Math.PI*2, 0, Math.PI);
                const position =  ellipseMovement(center, angle, radii[0], radii[1]);

                handleRef.current.setAttribute('cx', `${ position[0] }px`);
                handleRef.current.setAttribute('cy', `${ position[1] }px`);
            }
        };

        document.addEventListener('mousemove', update);

        return () => {
            document.removeEventListener('mousemove', update);
        };

    }, []);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            ref={ svgRef }
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
                onMouseDown={ onMouseDown }
                onMouseUp={ onMouseUp }
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