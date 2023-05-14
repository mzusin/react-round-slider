import {
    convertRange,
    degreesToRadians,
    ellipseMovement,
    getV2Angle, getAnglesSub,
    polarToCartesian,
    radiansToDegrees,
    v2Sub,
    Vector2, setDecimalPlaces, isNumber, mod, newId,
} from 'mz-math';
import { isAngleInArc } from './angles-provider';
import { IStatePointer, IUserSettingsPointer, TData, TStep } from '../interfaces';
import { DEFAULT_POINTER_RX, DEFAULT_POINTER_RY, MAX_VALUE_DEFAULT, MIN_VALUE_DEFAULT } from './defaults';
import { getNumber } from './common';

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
        sliderStartPoint,
        sliderEndPoint,
        largeArcFlag,
    }
};

/**
 * On initialization, user provides pointer values that are transformed to percents.
 * These percents should be transformed to the positions on the SVG arc.
 */
export const getPointerPositionByPercent = (
    percent: number,
    startAngleDegrees: number,
    endAngleDegrees: number,
    svgRadii: Vector2,
    center: Vector2,
) : Vector2 => {
    const angleDiff = Math.abs(endAngleDegrees - startAngleDegrees);
    const percentAngle = percent * angleDiff / 100;
    const angleDegrees = mod(startAngleDegrees + percentAngle, 360);

    let angleRad = degreesToRadians(angleDegrees);

    // Convert the angle from the range [0, Math.PI*2] to the range [0, Math.PI].
    angleRad = convertRange(angleRad, 0, Math.PI*2, 0, Math.PI);

    return ellipseMovement(center, angleRad, svgRadii[0], svgRadii[1]);
};

/**
 * Once user drags the pointer, get updated pointer percent
 * depending on the new mouse position.
 */
export const getPointerPercentByMouse = (
    $svg: SVGSVGElement,
    absoluteMouse: Vector2,
    center: Vector2,
    svgRadii: Vector2,
    startAngleDegrees: number,
    endAngleDegrees: number,
    min: number,
    max: number
) : number => {
    const [clientX, clientY] = absoluteMouse;

    const { left, top } = $svg.getBoundingClientRect();

    const relativeMouse: Vector2 = [
        clientX - left,
        clientY - top,
    ];

    const vector = v2Sub(relativeMouse, center);

    const [rx, ry] = svgRadii;

    let angleRad = Math.atan2(vector[1] / ry, vector[0] / rx);
    if(angleRad < 0){
        angleRad += 2 * Math.PI;
    }

    const degrees = radiansToDegrees(angleRad);

    const isInArc = isAngleInArc(startAngleDegrees, endAngleDegrees, degrees);
    if(!isInArc){
        const angleSub1 = getAnglesSub(degrees, startAngleDegrees);
        const angleSub2 = getAnglesSub(degrees, endAngleDegrees);
        return angleSub1 <= angleSub2 ? min : max;
    }

    const angleDiff = Math.abs(endAngleDegrees - startAngleDegrees);

    return degrees * 100 / angleDiff;
};

/**
 * Define pointer position according to the current user settings and mouse/touch position.
 */
export const getPointerPosition = (
    $svg: SVGSVGElement,
    absoluteMouse: Vector2,
    center: Vector2,
    svgRadii: Vector2,
    startAngleDegrees: number,
    endAngleDegrees: number,
    sliderStartPoint: Vector2,
    sliderEndPoint: Vector2,
) : Vector2 => {
    const [clientX, clientY] = absoluteMouse;

    const { left, top } = $svg.getBoundingClientRect();

    const relativeMouse: Vector2 = [
        clientX - left,
        clientY - top,
    ];

    const vector = v2Sub(relativeMouse, center);

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

    // Convert the angle from the range [0, Math.PI*2] to the range [0, Math.PI].
    angle = convertRange(angle, 0, Math.PI*2, 0, Math.PI);
    return ellipseMovement(center, angle, svgRadii[0], svgRadii[1]);
};

/**
 * Max pointer [rx, ry] is used to define svg size, svg center position,
 * and also ellipse/circle properties.
 */
export const getMaxPointer = (pointers: IStatePointer[]) : Vector2 => {
    let maxX = -Infinity;
    let maxY = -Infinity;

    for(const pointer of pointers){
        const [rx, ry] =  pointer.pointerRadii;
        maxX = Math.max(maxX, rx);
        maxY = Math.max(maxY, ry);
    }

    return [
        maxX,
        maxY,
    ];
};

/**
 * On component init, min and max should be initialized together,
 * because their validations depend on each other.
 * In case when the data is provided, min & max represent index in the data array.
 */
export const getMinMax = (
    min: number | string | undefined | null,
    max: number | string | undefined | null,
    data?: TData
): Vector2 => {
    if(!!data && data.length > 0){

        const minIndex = data.findIndex(item => item === min);
        const maxIndex = data.findIndex(item => item === max);

        let _min = minIndex === -1 ? 0 : minIndex;
        let _max = maxIndex === -1 ? data.length - 1 : maxIndex;
        return [_min, _max];
    }

    let _min = getNumber(min, MIN_VALUE_DEFAULT);
    let _max = getNumber(max, MAX_VALUE_DEFAULT);

    if(_min > _max){
        _max = _min + MAX_VALUE_DEFAULT;
    }

    if(_max < _min){
        _max = _min + MAX_VALUE_DEFAULT;
    }

    return [_min, _max];
};

/**
 * Step is defined in absolute units (not percent!)
 * This function should validate step provided by the user,
 * for example the case when step > all the data range.
 */
export const getStep = (userStep: TStep, min: number, max: number) : TStep => {
    if(userStep === null || userStep === undefined){
        return undefined;
    }

    if (typeof userStep === 'function') {
        return userStep;
    }

    if(isNumber(userStep)){
        let step = getNumber(userStep, 1);

        const diff = Math.abs(max - min);
        if (step > diff) {
            step = undefined;
        }

        return step;
    }

    return undefined;
};

/**
 * This function will validate the pointer value provided by the user.
 * If data is provided, it will return and index of the data array.
 * Otherwise, it will return the actual value.
 * It will also will check if the value is in the [min, max] range.
 */
export const getValue = (
    value: string | number,
    min: number,
    max: number,
    data?: TData
) : number => {

    if(data && data.length > 0){
        const index = data.findIndex(item => item === value);

        // the provided value doesn't exist in the data array --->
        // just return the first index.
        if(index === -1) return 0;

        // Index of data array represents its value.
        return index;
    }

    let _value = getNumber(value, min);

    if(_value < min){
        _value = min;
    }

    if(_value > max){
        _value = max;
    }

    return _value;
};

/**
 * Convert user provided pointers settings to the actual state pointers' definition.
 */
export const getInitialPointers = (
    userSettingsPointers: IUserSettingsPointer[],
    min: number,
    max: number,
    data?: TData
) : IStatePointer[] => {

    const pointers: IStatePointer[] = [];

    for(let i=0; i<userSettingsPointers.length; i++){
        const userSettingsPointer = userSettingsPointers[i];

        const value = getValue(userSettingsPointer.value, min, max, data);

        // scale a range [min, max] to [a, b]
        const percent = convertRange(min, max, 0, 100, value);

        const pointer: IStatePointer = {
            pointerRadii: [
                getNumber(userSettingsPointer.rx, DEFAULT_POINTER_RX),
                getNumber(userSettingsPointer.ry, DEFAULT_POINTER_RY),
            ],
            percent,
            id: newId(),
        };

        pointers.push(pointer);
    }

    return pointers;
};

/**
 * There can be multiple pointers, part of them can be disabled.
 * This function returns the current active pointer.
 */
export const getActivePointerId = (
    $target: HTMLElement,
    pointers: IStatePointer[],
    currentPercent: number,
    selectedPointerId: string|null
) : string|null => {
    if(pointers.length <= 0) return null;

    // if only 1 pointer exists --> return it
    if(pointers.length === 1){
        return pointers[0].id;
    }

    if(!isPanelClicked($target) && !isBgClicked($target)){

        // if clicked directly on 1 of the pointers ---> return it
        for(let i=0; i<pointers.length; i++) {
            const pointer = pointers[i];
            if(isPointerClicked($target, pointer.id)){
                console.log(`Pointer is clicked on ${ pointer.id }`)
                return pointer.id;
            }
        }

        // if already selected pointer ---> return it
        for(let i=0; i<pointers.length; i++) {
            const pointer = pointers[i];
            if(selectedPointerId === pointer.id){
                console.log(`Selected pointer ${ i }`)
                return pointer.id;
            }
        }
    }

    // find the closest pointer and return it
    let minDistance = Infinity;
    let minDistancePointerId = null;

    for(let i=0; i<pointers.length; i++){
        const pointer = pointers[i];
        const distance = Math.abs(currentPercent - pointer.percent);
        if(distance < minDistance){
            minDistance = distance;
            minDistancePointerId = pointer.id;
        }
    }

    return minDistancePointerId;
};

const isPanelClicked = ($target: HTMLElement) => {
    return $target.getAttribute('data-type') === 'panel';
};

const isBgClicked = ($target: HTMLElement) => {
    return $target.getAttribute('data-type') === 'bg';
};

const isPointerClicked = ($target: HTMLElement, id: string) => {
    return $target.getAttribute('data-type') === 'pointer' &&
           $target.getAttribute('data-id') === id ||
           $target.querySelector(`[data-type="pointer"][data-index="${ id }"]`) !== null;
};

