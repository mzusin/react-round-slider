import { mod, Vector2 } from 'mz-math';
import { DEFAULT_END_ANGLE, DEFAULT_START_ANGLE, getNumber } from './settings-provider';

/**
 * Defines if the current angle is in the provided range [startAngle, endAngle].
 * It should work with the SVG path elliptic arc segment.
 */
export const isAngleInArc = (startAngleDegrees: number, endAngleDegrees: number, currentDegrees: number) : boolean => {
    return currentDegrees >= startAngleDegrees && currentDegrees <= endAngleDegrees ||
        (currentDegrees + 360) >= startAngleDegrees && (currentDegrees + 360) <= endAngleDegrees;
};

/**
 * Normalize start and end angles the way, that
 * it will be easy to draw an ellipse / circle path
 * with SVG path data (elliptic arc).
 */
export const normalizeAngles = (startAngleDegrees?: number, endAngleDegrees?: number) : Vector2 => {
    let _startAngleDegrees = getNumber(startAngleDegrees, DEFAULT_START_ANGLE);
    let _endAngleDegrees = getNumber(endAngleDegrees, DEFAULT_END_ANGLE);

    _startAngleDegrees = mod(_startAngleDegrees, 360);
    _endAngleDegrees = mod(_endAngleDegrees, 360);

    if(_startAngleDegrees < 0){
        _startAngleDegrees += 360;
    }

    if(_endAngleDegrees < 0){
        _endAngleDegrees += 360;
    }

    if(_endAngleDegrees < _startAngleDegrees){
        _endAngleDegrees += 360;
    }

    // If start angle equals to the end angle, svg arc will draw a dot instead of circle / ellipse path.
    // To avoid this behaviour, subtract small amount of the end angle (0.001).
    if(_startAngleDegrees === _endAngleDegrees){
        _endAngleDegrees += 359.999; // 360 - 0.001;
    }

    return [
        _startAngleDegrees,
        _endAngleDegrees
    ];
};