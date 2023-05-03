import {
    convertRange,
    degreesToRadians, ellipseMovement,
    getV2Angle, mod,
    polarToCartesian,
    radiansToDegrees,
    v2Sub,
    Vector2
} from 'mz-math';

export const getSVGCenter = (svgRadii: Vector2, pointerRadii: Vector2, strokeWidth: number) : Vector2 => {
    const [rx, ry] = svgRadii;
    const [rxPointer, ryPointer] = pointerRadii;

    const diffX = Math.max(0, rxPointer * 2 - strokeWidth);
    const diffY = Math.max(0, ryPointer * 2 - strokeWidth);

    return [
        rx + strokeWidth / 2 + diffX / 2,
        ry + strokeWidth / 2 + diffY / 2
    ];
};

export const getSVGSize = (svgRadii: Vector2, pointerRadii: Vector2, strokeWidth: number) => {

    const [ rxSvg, rySvg ] = svgRadii;
    const [ rxPointer, ryPointer ] = pointerRadii;

    const diffX = Math.max(0, rxPointer * 2 - strokeWidth);
    const diffY = Math.max(0, ryPointer * 2 - strokeWidth);

    const svgWidth = rxSvg * 2 + strokeWidth + diffX;
    const svgHeight = rySvg * 2 + strokeWidth + diffY;

    return {
        svgWidth,
        svgHeight,
    }
};

export const getSliderProps = (startAngleDegrees: number, endAngleDegrees: number, svgRadii: Vector2, pointerRadii: Vector2, strokeWidth: number) => {

    let _endAngleDegrees = endAngleDegrees;
    const largeArcFlag = _endAngleDegrees - startAngleDegrees <= 180 ? 0 : 1;

    if(startAngleDegrees > _endAngleDegrees){
        _endAngleDegrees += 360;
    }

    const center = getSVGCenter(svgRadii, pointerRadii, strokeWidth);

    const sliderStartPoint = polarToCartesian(center, svgRadii, degreesToRadians(startAngleDegrees));
    const sliderEndPoint = polarToCartesian(center, svgRadii, degreesToRadians(_endAngleDegrees));

    return {
        // rx ry angle large-arc-flag sweep-flag x y
        sliderStartPoint,
        sliderEndPoint,
        largeArcFlag,
    }
};

/**
 * Shortest distance (angular) between two angles.
 * It will be in range [0, 180].
 */
export const getSmallerAngle = (angle1: number, angle2: number) => {
    const phi = mod(Math.abs(angle2 - angle1), 360);
    return phi > 180 ? 360 - phi : phi;
};

export const getPointerPosition = (
    $svg: SVGSVGElement,
    mouse: Vector2,
    center: Vector2,
    svgRadii: Vector2,
    startAngleDegrees: number,
    endAngleDegrees: number,
    sliderStartPoint: Vector2,
    sliderEndPoint: Vector2,
) : Vector2 => {
    const bounds = $svg.getBoundingClientRect();
    const [clientX, clientY] = mouse;

    const x = clientX - bounds.left;
    const y = clientY - bounds.top;

    const vector = v2Sub([x, y], center);

    let angle = getV2Angle(vector);
    if(angle < 0){
        angle += 2 * Math.PI;
    }

    const degrees = radiansToDegrees(angle);

    const isInArc = degrees >= startAngleDegrees && degrees <= (endAngleDegrees < startAngleDegrees ? endAngleDegrees + 360 : endAngleDegrees);

    if(!isInArc){
        return getSmallerAngle(degrees, startAngleDegrees) <= getSmallerAngle(degrees, endAngleDegrees) ? sliderStartPoint : sliderEndPoint;
    }

    // convert the angle from the range [0, Math.PI*2] to the range [0, Math.PI]
    angle = convertRange(angle, 0, Math.PI*2, 0, Math.PI);
    return ellipseMovement(center, angle, svgRadii[0], svgRadii[1]);

    // handleRef.current.setAttribute('cx', `${ position[0] }px`);
    // handleRef.current.setAttribute('cy', `${ position[1] }px`);
};