import { ISettings } from './settings-provider';
import { degreesToRadians, polarToCartesian, Vector2 } from 'mz-math';

export const getSVGSize = (settings: ISettings) => {

    const { svgRadii, pointerRadii, strokeWidth } = settings;

    const [rxSvg, rySvg] = svgRadii;
    const [rxPointer, ryPointer] = pointerRadii;

    // If pointer size >
    const diffX = Math.max(0, rxPointer * 2 - strokeWidth);
    const diffY = Math.max(0, ryPointer * 2 - strokeWidth);

    const svgWidth = rxSvg * 2 + strokeWidth + diffX;
    const svgHeight = rySvg * 2 + strokeWidth + diffY;

    return {
        svgWidth,
        svgHeight,
    }
};

export const getSliderState = (settings: ISettings) => {

    let endAngleDegrees = settings.endAngleDegrees;
    const largeArcFlag = endAngleDegrees - settings.startAngleDegrees <= 180 ? 0 : 1;

    if(settings.startAngleDegrees > endAngleDegrees){
        endAngleDegrees += 360;
    }

    const [rx, ry] = settings.svgRadii;
    const [rxPointer, ryPointer] = settings.pointerRadii;

    const diffX = Math.max(0, rxPointer * 2 - settings.strokeWidth);
    const diffY = Math.max(0, ryPointer * 2 - settings.strokeWidth);

    const center: Vector2 = [
        rx + settings.strokeWidth / 2 + diffX / 2,
        ry + settings.strokeWidth / 2 + diffY / 2
    ];

    const start = polarToCartesian(center, settings.svgRadii, degreesToRadians(settings.startAngleDegrees));
    const end = polarToCartesian(center, settings.svgRadii, degreesToRadians(endAngleDegrees));

    return {
        // rx ry angle large-arc-flag sweep-flag x y
        start,
        end,

        angle: 0,
        sweepFlag: 1,
        largeArcFlag,
    }
};