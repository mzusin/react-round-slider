import {
    Vector2,
    convertRange,
    mod,
    setDecimalPlaces,
    v2Sub,
    radiansToDegrees,
    degreesToRadians, circleMovement, v2Distance
} from 'mz-math';
import { ISettings } from './settings-provider';
import {
    DEFAULT_PATH_END_ANGLE,
    DEFAULT_PATH_START_ANGLE,
    DEFAULT_POINTER_BG_COLOR,
    DEFAULT_POINTER_BG_COLOR_DISABLED,
    DEFAULT_POINTER_BG_COLOR_SELECTED,
    DEFAULT_POINTER_BORDER,
    DEFAULT_POINTER_BORDER_COLOR,
    DEFAULT_POINTER_RADIUS,
} from './defaults-provider';
import { getBoolean, getNumber, getString } from './common-provider';
import { IData } from './data-provider';
import { getAnglesDistance } from './circle-provider';

export interface IPointer {
    id: string;
    index: number;
    radius: number;
    angleDeg: number;
    prevAngleDeg: number;

    bgColor: string;
    bgColorSelected: string;
    bgColorDisabled: string;
    bgColorHover: string;

    border: number;
    borderColor: string;

    disabled: boolean;
    ariaLabel?: string;
}

export interface IPointers {
    pointers: IPointer[];
    maxRadius: number;
}

export const getAngleByMouse = (
    $svg: SVGSVGElement,
    clientX: number,
    clientY: number,
    cx: number,
    cy: number,
    rx: number,
    ry: number
) => {
    const { left, top } = $svg.getBoundingClientRect();

    const relativeMouse: Vector2 = [
        clientX - left,
        clientY - top,
    ];

    const vector = v2Sub(relativeMouse, [ cx, cy ]);

    let angleRad = Math.atan2(vector[1] / ry, vector[0] / rx);
    if(angleRad < 0){
        angleRad += 2 * Math.PI;
    }

    return radiansToDegrees(angleRad);
};

export const angle2value = (data: IData, angle: number, pathStartAngle: number, pathEndAngle: number) : string | number => {

    if(pathEndAngle < pathStartAngle) {
        pathEndAngle += 360;
    }

    if(angle < pathStartAngle){
        angle += 360;
    }

    let value: string|number = convertRange(angle, pathStartAngle, pathEndAngle, data.min, data.max);

    if(data.data.length > 0) {
        const index = Math.round(value);
        value = data.data[index];
    }
    else{
        value = setDecimalPlaces(value, data.round);
    }

    return value;
};

const value2angle = (data: IData, value: string | number, pathStartAngle: number, pathEndAngle: number) => {
    let _value: number;

    if(pathEndAngle < pathStartAngle) {
        pathEndAngle += 360;
    }

    if(data.data.length > 0) {
        const valueIndex = data.data.findIndex(item => item === value);
        _value = valueIndex === -1 ? 0 : valueIndex;
    }
    else{
        _value = typeof value !== 'number' ? data.min : value;
    }

    return mod(convertRange(_value, data.min, data.max, pathStartAngle, pathEndAngle), 360);
};

export const initPointers = (
    settings: ISettings,
    data: IData
) : IPointer[] => {

    if(!settings || !settings.pointers || settings.pointers.length < 0 || !data) {
        const angleDeg = mod(getNumber(settings.pathStartAngle, DEFAULT_PATH_START_ANGLE), 360);

        const bgColor = getString(settings.pointerBgColor, DEFAULT_POINTER_BG_COLOR);
        const bgColorSelected = getString(settings.pointerBgColorSelected, DEFAULT_POINTER_BG_COLOR_SELECTED);
        const bgColorDisabled = getString(settings.pointerBgColorDisabled, DEFAULT_POINTER_BG_COLOR_DISABLED);
        const bgColorHover = getString(settings.pointerBgColorHover, bgColorSelected);

        return [{
            id: '0',
            index: 0,
            radius: getNumber(settings.pointerRadius, DEFAULT_POINTER_RADIUS),
            angleDeg,
            prevAngleDeg: angleDeg,
            bgColor,
            bgColorSelected,
            bgColorDisabled,
            bgColorHover,
            border: getNumber(settings.pointerBorder, DEFAULT_POINTER_BORDER),
            borderColor: getString(settings.pointerBorderColor, DEFAULT_POINTER_BORDER_COLOR),
            disabled: !!settings.disabled,
        }]
    }

    const pointers: IPointer[] = [];

    for(let i=0; i<settings.pointers.length; i++) {
        const settingPointer = settings.pointers[i];

        const radius = settingPointer.radius !== undefined ? settingPointer.radius : getNumber(settings.pointerRadius, DEFAULT_POINTER_RADIUS);
        const bgColor = settingPointer.bgColor ? settingPointer.bgColor : getString(settings.pointerBgColor, DEFAULT_POINTER_BG_COLOR);
        const bgColorSelected = settingPointer.bgColorSelected ? settingPointer.bgColorSelected : getString(settings.pointerBgColorSelected, DEFAULT_POINTER_BG_COLOR_SELECTED);
        const bgColorDisabled = settingPointer.bgColorDisabled ? settingPointer.bgColorDisabled : getString(settings.pointerBgColorDisabled, DEFAULT_POINTER_BG_COLOR_DISABLED);
        const bgColorHover = settingPointer.bgColorHover ? settingPointer.bgColorHover : getString(settings.pointerBgColorHover, bgColorSelected);

        const border = settingPointer.border ? settingPointer.border : getNumber(settings.pointerBorder, DEFAULT_POINTER_BORDER);
        const borderColor = settingPointer.borderColor ? settingPointer.borderColor : getString(settings.pointerBorderColor, DEFAULT_POINTER_BORDER_COLOR);

        const disabled = settingPointer.disabled !== undefined ? settingPointer.disabled : getBoolean(settings.disabled, false);
        const pathStartAngle = getNumber(settings.pathStartAngle, DEFAULT_PATH_START_ANGLE);
        const pathEndAngle = getNumber(settings.pathEndAngle, DEFAULT_PATH_END_ANGLE);

        const angleDeg = value2angle(
            data,
            settingPointer.value,
            pathStartAngle,
            pathEndAngle,
        );

        let angleAfterStep = roundToStep(angleDeg, data.stepAngleDeg, pathStartAngle, pathEndAngle);

        if(data.isClosedShape && mod(angleAfterStep, 360) === mod(pathEndAngle, 360)){
            angleAfterStep = pathStartAngle;
        }

        pointers.push({
            id: i.toString(),
            index: i,
            radius,
            angleDeg: angleAfterStep,
            prevAngleDeg: angleAfterStep,

            bgColor,
            bgColorSelected,
            bgColorDisabled,
            bgColorHover,

            border,
            borderColor,

            disabled,
            ariaLabel: settingPointer.ariaLabel,
        });
    }

    return pointers;
};

export const getPointers = (settings: ISettings, data: IData) : IPointers => {

    const pointers = initPointers(settings, data);

    return {
        pointers,
        maxRadius: getMaxRadius(pointers),
    }
};

const getMaxRadius = (pointers: IPointer[]) : number => {
    if(pointers.length <= 0) return 0;

    let max = -Infinity;

    for(const pointer of pointers){
        max = Math.max(max, Math.max(0, pointer.radius + pointer.border/2));
    }

    return max;
};

export const getClosestPointer = (
    pointers: IPointer[],
    currentPlaceDegrees: number,
    cx: number,
    cy: number,
    pathRadius: number
) => {
    if(!pointers || pointers.length <= 0) return null;

    if(pointers.length === 1) return pointers[0];

    const angleRad = convertRange(degreesToRadians(currentPlaceDegrees), 0, Math.PI * 2, 0, Math.PI); // [0, Math.PI*2] ---> [0, Math.PI]
    const currentPointOnArc = circleMovement([ cx, cy ], angleRad, pathRadius);

    let min: number|undefined = undefined;
    let closestPointer: IPointer = null;

    const enabledPointers = pointers.filter(p => !p.disabled);

    for(const pointer of enabledPointers) {
        const pointerAngleRad = convertRange(degreesToRadians(pointer.angleDeg), 0, Math.PI * 2, 0, Math.PI);
        const pointOnArc = circleMovement([ cx, cy ], pointerAngleRad, pathRadius);
        const distance = v2Distance(currentPointOnArc, pointOnArc);

        if(min === undefined || distance < min) {
            min = distance;
            closestPointer = pointer;
        }
    }

    return { ...closestPointer };
};

export const getClosestEdge = (
    startAngleDegrees: number,
    endAngleDegrees: number,
    currentPlaceDegrees: number,
    cx: number,
    cy: number,
    pathRadius: number
) => {

    const angleRad = convertRange(degreesToRadians(currentPlaceDegrees), 0, Math.PI * 2, 0, Math.PI); // [0, Math.PI*2] ---> [0, Math.PI]
    const currentPointOnArc = circleMovement([ cx, cy ], angleRad, pathRadius);

    const startAngleRad = convertRange(degreesToRadians(startAngleDegrees), 0, Math.PI * 2, 0, Math.PI); // [0, Math.PI*2] ---> [0, Math.PI]
    const startPointOnArc = circleMovement([ cx, cy ], startAngleRad, pathRadius);

    const endAngleRad = convertRange(degreesToRadians(endAngleDegrees), 0, Math.PI * 2, 0, Math.PI); // [0, Math.PI*2] ---> [0, Math.PI]
    const endPointOnArc = circleMovement([ cx, cy ], endAngleRad, pathRadius);

    const distance1 = v2Distance(currentPointOnArc, startPointOnArc);
    const distance2 = v2Distance(currentPointOnArc, endPointOnArc);

    return distance1 <= distance2 ? startAngleDegrees : endAngleDegrees;
};

export const getMinMaxDistancePointers = (pointers: IPointer[], pathStartAngle: number) : [IPointer, IPointer] | null => {
    if(!pointers || pointers.length <= 0) return null;

    let minDistance = undefined;
    let maxDistance = undefined;
    let minPointer = null;
    let maxPointer = null;

    for(const pointer of pointers) {

        const distance = getAnglesDistance(pathStartAngle, pointer.angleDeg);

        if(minDistance === undefined || distance < minDistance) {
            minPointer = pointer;
            minDistance = distance;
        }

        if(maxDistance === undefined || distance > maxDistance) {
            maxPointer = pointer;
            maxDistance = distance;
        }
    }

    if(minPointer === null || maxPointer === null) return null;

    return [
        minPointer,
        maxPointer
    ];
};

export const roundToStep = (angleDeg: number, step: number, pathStartAngle: number, pathEndAngle: number) : number => {
    if((mod(angleDeg, 360) === mod(pathStartAngle, 360)) ||
        (mod(angleDeg, 360) === mod(pathEndAngle, 360))) return angleDeg;
    return step === 0 ? 0 : Math.round(angleDeg / step) * step;
};
