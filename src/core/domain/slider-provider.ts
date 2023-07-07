import {
    convertRange,
    degreesToRadians,
    ellipseMovement, getAnglesSub,
    mod,
    newId,
    radiansToDegrees, setDecimalPlaces,
    v2Sub,
    Vector2
} from 'mz-math';
import { IStatePointer, IUserSettingsPointer, TData } from '../interfaces';
import { getNumber } from './common';
import {
    DEFAULT_POINTER_BG_COLOR,
    DEFAULT_POINTER_RX,
    DEFAULT_POINTER_RY,
    MAX_VALUE_DEFAULT,
    MIN_VALUE_DEFAULT,
} from './defaults';
import { isAngleInArc } from './angles-provider';
import { ReactNode } from 'react';

/**
 * Max pointer [rx, ry] is used to define svg size, svg center position,
 * and also ellipse/circle properties.
 */
export const getMaxPointer = (pointers: IStatePointer[]) : Vector2 => {
    if(pointers.length <= 0) return [0, 0];

    let maxX = -Infinity;
    let maxY = -Infinity;

    for(const pointer of pointers){
        const [rx, ry] = pointer.pointerRadii;

        maxX = Math.max(maxX, Math.max(0, rx));
        maxY = Math.max(maxY, Math.max(0, ry));
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

        const _min = minIndex === -1 ? 0 : minIndex;
        const _max = maxIndex === -1 ? data.length : maxIndex;
        return [_min, _max];
    }

    const _min = getNumber(min, MIN_VALUE_DEFAULT);
    let _max = getNumber(max, MAX_VALUE_DEFAULT);

    if(_min > _max){
        _max = _min + MAX_VALUE_DEFAULT;
    }

    return [_min, _max];
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
 * For the given pointer percent, return its value
 * that can be printed somewhere or sent back to user
 * via API or events.
 */
export const getValueByPercent = (
    percent: number,
    min: number,
    max: number,
    round: number,
    data?: TData,
) : string|number => {

    // scale a range [min, max] to [a, b]
    const value = (min === max) ? 0 : convertRange(percent, 0, 100, min, max);

    if(data && data.length > 0) {
        return data[Math.round(value)];
    }

    return setDecimalPlaces(value, round);
};

/**
 * Round up to the next multiple of X,
 * where X is the step provided by the user.
 */
export const roundToStep = (num: number, step: number) => {
    return step === 0 ? 0 : Math.round(num / step) * step;
};

/**
 * User step is defined in absolute values;
 * this function return it as %
 */
export const getStepPercent = (min: number, max: number, data: TData, step?: number) : number|undefined => {
    if(step === undefined && !!data) {
        step = 1;
    }

    if(step === undefined) return undefined;

    /*
     min ......... max (step = 1)
     0 ........... 100 (step = ?)

     (max - min) ....... step (=1)
     100 ............... ?

     ? = 100 * step / (max - min)
     */

    const diff = max - min;
    if(diff === 0) return 0;

    return step * 100 / diff;
};

/**
 * Convert user provided pointers settings to the actual state pointers' definition.
 */
export const getInitialPointers = (
    userSettingsPointers: IUserSettingsPointer[],
    min: number,
    max: number,
    data?: TData,
    pointerBgColor?: string,
    pointerSVG?: ReactNode,
) : IStatePointer[] => {

    const pointers: IStatePointer[] = [];
    const _userSettingsPointers = userSettingsPointers || [];

    for(let i=0; i<_userSettingsPointers.length; i++){
        const userSettingsPointer = _userSettingsPointers[i];
        if(userSettingsPointer.rx <= 0 || userSettingsPointer.ry <= 0) continue;

        const value = getValue(userSettingsPointer.value, min, max, data);

        // scale a range [min, max] to [a, b]
        const percent = (min === max) ? 0 : convertRange(min, max, 0, 100, value);

        const pointer: IStatePointer = {
            pointerRadii: [
                getNumber(userSettingsPointer.rx, DEFAULT_POINTER_RX),
                getNumber(userSettingsPointer.ry, DEFAULT_POINTER_RY),
            ],
            percent,
            id: newId(),
            index: 0,
            bgColor: userSettingsPointer.bgColor || pointerBgColor || DEFAULT_POINTER_BG_COLOR,
            pointerSVG: pointerSVG || userSettingsPointer.pointerSVG,
            disabled: userSettingsPointer.disabled === true,
            keyboardDisabled: false,
            mousewheelDisabled: false,
            ariaLabel: userSettingsPointer.ariaLabel,
        };

        pointers.push(pointer);
    }

    if(pointers.length > 1) {

        // It is possible that the user defines pointers in unsorted order.
        pointers.sort((pointer1, pointer2) => {
            return pointer1.percent - pointer2.percent;
        });

        // The index is used in multiple pointers overlap feature.
        for(let i=0; i < pointers.length; i++){
            pointers[i].index = i;
        }
    }

    if(!pointers || pointers.length <= 0) {
        return [{
            pointerRadii: [ DEFAULT_POINTER_RX, DEFAULT_POINTER_RY ],
            percent: 0,
            id: newId(),
            index: 0,
            bgColor: DEFAULT_POINTER_BG_COLOR,
            disabled: false,
            keyboardDisabled: false,
            mousewheelDisabled: false,
        }];
    }

    return pointers;
};

/**
 * User provides pointer values that are transformed to percents.
 * These percents should be transformed to the positions on the SVG arc.
 */
export const getPointerPositionByPercent = (
    percent: number,
    startAngleDegrees: number,
    endAngleDegrees: number,
    svgRadii: Vector2,
    center: Vector2,
) : {
    position: Vector2,
    angleDegrees: number,
} => {
    const angleDiff = Math.abs(endAngleDegrees - startAngleDegrees);
    const percentAngle = percent * angleDiff / 100;
    const angleDegrees = mod(startAngleDegrees + percentAngle, 360);

    let angleRad = degreesToRadians(angleDegrees);

    // Convert the angle from the range [0, Math.PI*2] to the range [0, Math.PI].
    angleRad = convertRange(angleRad, 0, Math.PI*2, 0, Math.PI);

    return {
        position: ellipseMovement(center, angleRad, svgRadii[0], svgRadii[1]),
        angleDegrees,
    };
};

export const getMinMaxPointer = (pointers: IStatePointer[]) : [IStatePointer, IStatePointer] | null => {
    if(!pointers || pointers.length < 2) return null;

    let minPercent = Infinity;
    let minPointer: IStatePointer|null = null;

    let maxPercent = -Infinity;
    let maxPointer: IStatePointer|null = null;

    for(let i=0; i<pointers.length; i++){
        const pointer = pointers[i];

        if(pointer.percent < minPercent){
            minPercent = pointer.percent;
            minPointer = pointer;
        }

        if(pointer.percent > maxPercent){
            maxPercent = pointer.percent;
            maxPointer = pointer;
        }
    }

    if(minPointer === null || maxPointer === null) return null;

    return [minPointer, maxPointer];
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
    max: number,
    data: TData|undefined,
    step: number|undefined
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

    let degrees = radiansToDegrees(angleRad);

    const isInArc = isAngleInArc(startAngleDegrees, endAngleDegrees, degrees);
    if(!isInArc){
        const angleSub1 = getAnglesSub(degrees, startAngleDegrees);
        const angleSub2 = getAnglesSub(degrees, endAngleDegrees);
        return angleSub1 <= angleSub2 ? min : max;
    }

    degrees -= startAngleDegrees;

    const angleDiff = Math.abs(endAngleDegrees - startAngleDegrees);

    let updatedPercent = degrees * 100 / angleDiff;

    if(updatedPercent < 0) {
        const temp = 360 - startAngleDegrees;
        const temp2 = temp * 100 / angleDiff;
        updatedPercent += temp2;
    }

    const stepPercent = getStepPercent(min, max, data, step);
    const result = mod(stepPercent === undefined ? updatedPercent : roundToStep(updatedPercent, stepPercent), 100);

    return result === 100 ? 0 : result;
};

export const getPointerIndexById = (pointers: IStatePointer[], id: string) => {
    if(!pointers || !id) return -1;
    return pointers.findIndex(pointer => pointer.id === id);
};

const isPanelClicked = ($target: HTMLElement) => {
    return $target.getAttribute('data-type') === 'panel';
};

export const isConnectionClicked = ($target: HTMLElement) => {
    return $target.getAttribute('data-type') === 'connection';
};

const isPointerClicked = ($target: HTMLElement, id: string) => {
    return $target.getAttribute('data-type') === 'pointer' &&
        $target.getAttribute('data-id') === id ||
        $target.querySelector(`[data-type="pointer"][data-index="${ id }"]`) !== null;
};

/**
 * There can be multiple pointers, part of them can be disabled.
 * This function returns the current active pointer.
 */
export const getActivePointerId = (
    $target: HTMLElement,
    pointers: IStatePointer[],
    currentPercent: number,
    selectedPointerId: string|null,
    startAngleDegrees: number,
    endAngleDegrees: number,
    isClickOrDrag: 'click' | 'drag'
) : string|null => {

    if(pointers.length <= 0) return null;

    // if only 1 pointer exists --> return it
    if(pointers.length === 1){
        return pointers[0].id;
    }

    if(isClickOrDrag === 'drag') return selectedPointerId;

    if(isPanelClicked($target) || isConnectionClicked($target)){
        const angleDiff = Math.abs(endAngleDegrees - startAngleDegrees);
        const currentValueAngle = currentPercent * angleDiff / 100;

        let minAngle = Infinity;
        let minDistancePointerId = null;

        // The closest pointer should jump.
        for(let i=0; i<pointers.length; i++){
            const pointer = pointers[i];
            const pointerAngle = pointer.percent * angleDiff / 100;
            const angleSub = getAnglesSub(pointerAngle, currentValueAngle);

            if(angleSub < minAngle){
                minAngle = angleSub;
                minDistancePointerId = pointer.id;
            }
        }

        // console.log(`Clicked on panel. The closest pointer id is ${ minDistancePointerId }`)
        return minDistancePointerId;
    }

    // If clicked directly on pointer ----
    for(let i=0; i<pointers.length; i++) {
        const pointer = pointers[i];
        if(isPointerClicked($target, pointer.id)){
            // console.log(`Pointer is clicked on ${ pointer.id }`)
            return pointer.id;
        }
    }

    //console.log(`Returned selectedPointerId ${ selectedPointerId }`);
    return selectedPointerId;
};

/**
 * When pointer is selected, it should move to be above all other pointers,
 * as SVG doesn't support normal z-index.
 */
export const handlePointerZIndex = (activePointerId: string|null, pointers: IStatePointer[]) : IStatePointer[] => {
    const _pointers = [...pointers];

    if(activePointerId === null || _pointers.length <= 1){
        return _pointers;
    }

    const foundIndex = _pointers.findIndex(pointer => pointer.id === activePointerId);
    if(foundIndex === -1){
        return _pointers;
    }

    /**
     * SVG doesn't have normal z-index.
     * To place active pointer on top of other pointers,
     * we need to reorder them.
     */
    const pointer = _pointers[foundIndex];
    _pointers.splice(foundIndex, 1);
    _pointers.push(pointer);

    return _pointers;
};

/**
 * In case of multiple pointers, get the pointer, that its value is "next".
 */
export const getNextPrevPointer = (pointers: IStatePointer[], currentPointerId: string) : [IStatePointer, IStatePointer, IStatePointer]|null => {
    const currentPointer = pointers.find(pointer => pointer.id === currentPointerId);
    if(!currentPointer) return null;

    const nextIndex = mod(currentPointer.index + 1, pointers.length);
    const nextPointer = pointers.find(pointer => pointer.index === nextIndex);
    if(!nextPointer) return null;

    const prevIndex = mod(currentPointer.index - 1, pointers.length);
    const prevPointer = pointers.find(pointer => pointer.index === prevIndex);

    return [currentPointer, nextPointer, prevPointer];
};

/**
 * In case of single pointer, update its value.
 */
export const updateSinglePointerValue = (
    pointers: IStatePointer[],
    updatedPercent: number
): IStatePointer[] => {
    if(pointers[0].disabled) return pointers;

    const copy = [...pointers];
    const pointer = copy[0];
    pointer.percent = updatedPercent;
    copy[0] = pointer;

    return copy;
};

/**
 * In case of multiple pointers, find the active pointer,
 * and update its value.
 */
export const updateMultiplePointersValue = (
    pointers: IStatePointer[],
    updatedPercent: number,
    selectedPointerId: string
) => {
    if(!selectedPointerId) return pointers;

    const pointerIndex = pointers.findIndex(p => p.id === selectedPointerId);
    if(pointerIndex === -1) return pointers;

    if(pointers[pointerIndex].disabled) return pointers;

    const copy = [...pointers];
    const pointer = {...copy[pointerIndex]};
    pointer.percent = updatedPercent;
    copy[pointerIndex] = pointer;

    return copy;
};

export const handleOverlap = (
    updatedPercent: number,
    pointers: IStatePointer[],
    activePointerId: string,
    min: number,
    max: number,
) => {
    // Pointers non-overlap cases: -----------------------------------
    // We need immediate access to the latest pointers version.
    const [currentPointer, nextPointer, prevPointer] = getNextPrevPointer(pointers, activePointerId); // activePointerId selectedPointerId
    const diff = (updatedPercent - currentPointer.percent);

    const range = Math.abs(max - min) / 2;

    if(diff !== 0 && currentPointer.percent !== 0 && updatedPercent !== 0){
        const isClockwise = Math.abs(diff) > range ? diff < 0 : diff >= 0;

        if(isClockwise && nextPointer.percent >= currentPointer.percent) {
            updatedPercent = Math.min(updatedPercent, nextPointer.percent);
        }

        if(!isClockwise && prevPointer.percent <= currentPointer.percent) {
            updatedPercent = Math.max(updatedPercent, prevPointer.percent);
        }
    }

    return updatedPercent;
};
