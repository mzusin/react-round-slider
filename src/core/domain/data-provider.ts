import { ISettings } from './settings-provider';
import { getNumber } from './common-provider';
import {
    DEFAULT_ARROW_STEP,
    DEFAULT_MAX,
    DEFAULT_MIN,
    DEFAULT_PATH_END_ANGLE,
    DEFAULT_PATH_START_ANGLE,
    DEFAULT_ROUND,
    DEFAULT_STEP
} from './defaults-provider';
import { mod } from 'mz-math';

export interface IData {
    min: number;
    max: number;
    stepAngleDeg: number;
    arrowStepAngleDeg: number;
    round: number;
    data: (string | number)[];
    isClosedShape: boolean;
}

export const getData = (setting: ISettings) : IData => {

    let min = getNumber(setting.min, DEFAULT_MIN);
    let max = getNumber(setting.max, DEFAULT_MAX);
    const step = getNumber(setting.step, DEFAULT_STEP);
    const arrowStep = getNumber(setting.arrowStep, DEFAULT_ARROW_STEP);
    const round = getNumber(setting.round, DEFAULT_ROUND);
    const data = setting.data || [];

    if(data.length > 0) {
        const minIndex = data.findIndex(item => item === min);
        const maxIndex = data.findIndex(item => item === max);

        min = minIndex === -1 ? 0 : minIndex;
        max = maxIndex === -1 ? data.length : maxIndex;
    }
    else{
        if(min > max) {
            min = max + DEFAULT_MAX;
        }
    }

    const pathStartAngle = getNumber(setting.pathStartAngle, DEFAULT_PATH_START_ANGLE);
    const pathEndAngle = getNumber(setting.pathEndAngle, DEFAULT_PATH_END_ANGLE);
    const isClosedShape = mod(pathStartAngle, 360) === mod(pathEndAngle, 360);

    const stepAngleDeg = step * (pathEndAngle - pathStartAngle) / (max - min);
    const arrowStepAngleDeg = arrowStep * (pathEndAngle - pathStartAngle) / (max - min);

    return {
        min,
        max,
        round,
        data,
        stepAngleDeg,
        arrowStepAngleDeg,
        isClosedShape,
    }
};