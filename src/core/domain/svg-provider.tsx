import { degreesToRadians, polarToCartesian, setDecimalPlaces, Vector2 } from 'mz-math';
import { IEllipse } from '../interfaces';

/**
 * Calculate SVG size depending on ellipse radii and max pointer size.
 */
export const getSVGSize = (svgRadii: Vector2, maxPointerRadii: Vector2, strokeWidth: number) : Vector2 => {

    const [ rxSvg, rySvg ] = svgRadii;
    const [ rxPointer, ryPointer ] = maxPointerRadii;

    const diffX = Math.max(0, rxPointer * 2 - strokeWidth);
    const diffY = Math.max(0, ryPointer * 2 - strokeWidth);

    const svgWidth = rxSvg * 2 + strokeWidth + diffX;
    const svgHeight = rySvg * 2 + strokeWidth + diffY;

    return [
        svgWidth,
        svgHeight,
    ];
};

/**
 * Calculate the center point of the SVG.
 */
export const getSVGCenter = (svgRadii: Vector2, maxPointerRadii: Vector2, strokeWidth: number) : Vector2 => {

    const [ svgWidth, svgHeight ] = getSVGSize(svgRadii, maxPointerRadii, strokeWidth);

    return [
        setDecimalPlaces(svgWidth / 2, 2),
        setDecimalPlaces(svgHeight / 2, 2)
    ];
};

/**
 * Get start & end points of SVG ellipse/circle segment.
 * Also define the 'large-arc-flag' property of svg path data elliptical arc.
 * Elliptical arc: rx ry angle large-arc-flag sweep-flag x y.
 */
export const getEllipseSegment = (
    startAngleDegrees: number,
    endAngleDegrees: number,
    svgRadii: Vector2,
    pointerRadii: Vector2,
    strokeWidth: number
) : IEllipse => {

    let _endAngleDegrees = endAngleDegrees;
    const largeArcFlag = _endAngleDegrees - startAngleDegrees <= 180 ? 0 : 1;

    if(startAngleDegrees > _endAngleDegrees){
        _endAngleDegrees += 360;
    }

    const center = getSVGCenter(svgRadii, pointerRadii, strokeWidth);

    const sliderStartPoint = polarToCartesian(center, svgRadii, degreesToRadians(startAngleDegrees));
    const sliderEndPoint = polarToCartesian(center, svgRadii, degreesToRadians(_endAngleDegrees));

    return {
        start: sliderStartPoint,
        end: sliderEndPoint,
        largeArcFlag,
    }
};