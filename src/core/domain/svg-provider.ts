import {
    convertRange,
    degreesToRadians, ellipseMovement,
    getV2Angle, getAnglesSub,
    polarToCartesian,
    radiansToDegrees,
    v2Sub,
    Vector2, setDecimalPlaces,
} from 'mz-math';
import { isAngleInArc } from './angles-provider';

/**
 * Calculate SVG size depending on ellipse radii and max pointer size.
 */
export const getSVGSize = (svgRadii: Vector2, maxPointerRadii: Vector2, strokeWidth: number) => {

    const [ rxSvg, rySvg ] = svgRadii;
    const [ rxPointer, ryPointer ] = maxPointerRadii;

    const diffX = Math.max(0, rxPointer * 2 - strokeWidth);
    const diffY = Math.max(0, ryPointer * 2 - strokeWidth);

    const svgWidth = rxSvg * 2 + strokeWidth + diffX;
    const svgHeight = rySvg * 2 + strokeWidth + diffY;

    return {
        svgWidth,
        svgHeight,
    }
};

/**
 * Calculate the center point of the SVG.
 */
export const getSVGCenter = (svgRadii: Vector2, maxPointerRadii: Vector2, strokeWidth: number) : Vector2 => {

    const { svgWidth, svgHeight } = getSVGSize(svgRadii, maxPointerRadii, strokeWidth);

    return [
        setDecimalPlaces(svgWidth / 2, 2),
        setDecimalPlaces(svgHeight / 2, 2)
    ];
};

export const getSliderProps = (
    startAngleDegrees: number,
    endAngleDegrees: number,
    svgRadii: Vector2,
    pointerRadii: Vector2,
    strokeWidth: number
) => {

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
    const angleSub1 = getAnglesSub(degrees, startAngleDegrees);
    const angleSub2 = getAnglesSub(degrees, endAngleDegrees);

    const isInArc = isAngleInArc(startAngleDegrees, endAngleDegrees, degrees);
    if(!isInArc){
        return angleSub1 <= angleSub2 ? sliderStartPoint : sliderEndPoint;
    }

    // convert the angle from the range [0, Math.PI*2] to the range [0, Math.PI]
    angle = convertRange(angle, 0, Math.PI*2, 0, Math.PI);
    return ellipseMovement(center, angle, svgRadii[0], svgRadii[1]);
};