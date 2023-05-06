import { mod, Vector2 } from 'mz-math';
import { DEFAULT_END_ANGLE, DEFAULT_START_ANGLE, getNumber } from './settings-provider';

export const isAngleInArc = (startAngleDegrees: number, endAngleDegrees: number, currentDegrees: number) : boolean => {
    return currentDegrees >= startAngleDegrees && currentDegrees <= endAngleDegrees ||
        (currentDegrees + 360) >= startAngleDegrees && (currentDegrees + 360) <= endAngleDegrees;
};

export const normalizeAngles = (startAngleDegrees: number|undefined, endAngleDegrees: number|undefined) : Vector2 => {
    let _startAngleDegrees = getNumber(startAngleDegrees, DEFAULT_START_ANGLE);

    _startAngleDegrees = mod(_startAngleDegrees, 360);

    if(_startAngleDegrees < 0){
        _startAngleDegrees += 360;
    }

    let _endAngleDegrees = getNumber(endAngleDegrees, DEFAULT_END_ANGLE);
    _endAngleDegrees = mod(_endAngleDegrees, 360);

    if(_endAngleDegrees < 0){
        _endAngleDegrees += 360;
    }

    if(_endAngleDegrees < _startAngleDegrees){
        _endAngleDegrees += 360;
        //[_startAngleDegrees, _endAngleDegrees] = [_endAngleDegrees, _startAngleDegrees];
    }

    if(_startAngleDegrees === _endAngleDegrees){
        _endAngleDegrees += 360 - 0.001;
    }

    /*if(_startAngleDegrees === _endAngleDegrees){
        _startAngleDegrees = 0;
        _endAngleDegrees = 360 - 0.001;
    }*/

    return [
        _startAngleDegrees,
        _endAngleDegrees
    ];
};