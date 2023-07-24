import { setDecimalPlaces, Vector2 } from 'mz-math';

export interface ISvg {
    cx: number;
    cy: number;
    radius: number;
    size: number;
    thickness: number;
    border: number;
    startAngleDeg: number;
    endAngleDeg: number;
}

export const getSvg = (
    circleRadius: number,
    circleThickness: number,
    circleBorder: number,
    maxPointerRadius: number,
    startAngleDeg: number,
    endAngleDeg: number
) : ISvg => {

    const thickness = circleThickness + circleBorder * 2;

    const diff = Math.max(0, maxPointerRadius * 2 - thickness);
    const size = circleRadius * 2 + thickness + diff;

    const [ cx, cy ] = getSVGCenter(
        circleRadius,
        maxPointerRadius,
        circleThickness,
        circleBorder
    );

    return {
        cx,
        cy,
        radius: circleRadius,
        size,
        thickness: circleThickness,
        border: circleBorder,
        startAngleDeg,
        endAngleDeg
    } as ISvg;
};

export const getSVGCenter = (
    circleRadius: number,
    maxPointerRadius: number,
    circleThickness: number,
    circleBorder: number
) : Vector2 => {

    const size = getSVGSize(
        circleRadius,
        maxPointerRadius,
        circleThickness,
        circleBorder
    );

    const val = setDecimalPlaces(size/2, 2);

    return [
        val,
        val,
    ];
};

export const getSVGSize = (
    circleRadius: number,
    maxPointerRadius: number,
    circleThickness: number,
    circleBorder: number
) : number => {
    const thickness = circleThickness + circleBorder * 2;
    const diff = Math.max(0, maxPointerRadius * 2 - thickness);
    return circleRadius * 2 + thickness + diff;
};