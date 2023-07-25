import { useEffect, useRef, useState } from 'react';
import { getSvg, ISvg } from './domain/svg-provider';
import { angle2value, getClosestEdge, getPointers, IPointer, IPointers, roundToStep } from './domain/pointers-provider';
import { ISettings, ISettingsPointer } from './domain/settings-provider';
import { getNumber } from './domain/common-provider';
import {
    DEFAULT_PATH_BORDER, DEFAULT_PATH_END_ANGLE, DEFAULT_PATH_RADIUS, DEFAULT_PATH_START_ANGLE,
    DEFAULT_PATH_THICKNESS
} from './domain/defaults-provider';
import Pointers from './ui/Pointers';
import { getData, IData } from './domain/data-provider';
import Connection from './ui/Connection';
import Text from './ui/Text';
import Ticks from './ui/Ticks';
import Circle from './ui/Circle';
import { mod } from 'mz-math';
import { isAngleInArc } from './domain/circle-provider';
import { outlineNoneStyle } from './domain/style-provider';

export const RoundSlider = (props: ISettings) => {

    const [ data, setData ] = useState<IData|null>(null);
    const [ svg, setSvg ] = useState<ISvg|null>(null);
    const [ pointers, setPointers ] = useState<IPointers|null>(null);
    const [ selectedPointerId, setSelectedPointerId ] = useState('');

    const prevAngleDegRef = useRef<number|null>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const _data = getData(props);
        const hasChanged = JSON.stringify(data) !== JSON.stringify(_data);
        if(!hasChanged) return;

        setData(_data);
    }, [
        data,
        props
    ]);

    useEffect(() => {
        setPointers(getPointers(props, data));
    },
        // eslint-disable-next-line
        [
        props.pointerRadius,
        props.pathStartAngle,
        props.pointerBgColor,
        props.pointerBgColorSelected,
        props.pointerBgColorDisabled,
        props.pointerBorder,
        props.pointerBorderColor,
        props.disabled,
        props.pointers,
        props.pointerRadius,
        props.pointerBgColor,
        props.pointerBgColorSelected,
        props.pointerBgColorDisabled,
        props.pointerBorder,
        props.pointerBorderColor,
        props.disabled,
        props.pathStartAngle,
        props.pathEndAngle,
        data,
    ]);

    useEffect(() => {
        if(!pointers) return;

        const pathStartAngle = getNumber(props.pathStartAngle, DEFAULT_PATH_START_ANGLE);
        let pathEndAngle = getNumber(props.pathEndAngle, DEFAULT_PATH_END_ANGLE);

        if(pathEndAngle <= pathStartAngle) {
            pathEndAngle += 360;
        }

        setSvg(getSvg(
            getNumber(props.pathRadius, DEFAULT_PATH_RADIUS),
            getNumber(props.pathThickness, DEFAULT_PATH_THICKNESS),
            getNumber(props.pathBorder, DEFAULT_PATH_BORDER),
            pointers.maxRadius,
            pathStartAngle,
            pathEndAngle,
        ));
    }, [
        props.pathRadius,
        props.pathThickness,
        props.pathBorder,
        props.pathStartAngle,
        props.pathEndAngle,
        pointers,
    ]);

    useEffect(() => {
        const clearSelectedPointer = (evt: MouseEvent) => {
            const $target = evt.target as HTMLElement;
            const $pointer = $target.closest('[data-type="pointer"]');
            if($pointer) return;

            setSelectedPointerId('');
        };

        document.addEventListener('mousedown', clearSelectedPointer);

        return () => {
            document.removeEventListener('mousedown', clearSelectedPointer);
        };
    }, []);

    const setPointersCallback = (pointer: IPointer, newAngleDeg: number) => {
        if(props.disabled || !pointers.pointers || !pointer || pointer.disabled) return;

        newAngleDeg = roundToStep(newAngleDeg, data.stepAngleDeg, svg.startAngleDeg, svg.endAngleDeg);
        if(data.isClosedShape && mod(newAngleDeg, 360) === mod(svg.endAngleDeg, 360)){
            newAngleDeg = svg.startAngleDeg;
        }

        if(pointer.angleDeg === newAngleDeg){
            updatePointer(pointer, newAngleDeg, false);
            return;
        }

        const handleOverlap = !props.pointersOverlap;
        if(handleOverlap) {

            let prevAngle, nextAngle;

            if(data.isClosedShape) {
                const prevIndex = mod(pointer.index - 1, pointers.pointers.length);
                const nextIndex = mod(pointer.index + 1, pointers.pointers.length);

                const prevPointer = pointers.pointers[prevIndex];
                const nextPointer = pointers.pointers[nextIndex];

                prevAngle = prevPointer.angleDeg;
                nextAngle = nextPointer.angleDeg;

                if(pointers.pointers.length === 2 && (prevAngle === nextAngle)) {

                    const splitPointDeg = prevAngle; // === nextAngle

                    if(prevAngleDegRef.current === null) {
                        prevAngleDegRef.current = newAngleDeg;
                    }
                    else{
                        // Clockwise: new angle in (splitPointDeg, splitPointDeg + 90]
                        // Clockwise: prev angle in [splitPointDeg - 90, splitPointDeg)
                        // CounterClockwise: new angle in [splitPointDeg - 90, splitPointDeg)
                        // CounterClockwise: prev angle in (splitPointDeg, splitPointDeg + 90]

                        const SAFE_ANGLE = 150;

                        let t1 = splitPointDeg - SAFE_ANGLE;
                        let t2 = splitPointDeg - 0.001;

                        if(t1 < 0) t1 += 360;
                        if(t2 < 0) t2 += 360;

                        const clockwiseNew = isAngleInArc(splitPointDeg + 0.001, splitPointDeg + SAFE_ANGLE, newAngleDeg);
                        const clockwisePrev = isAngleInArc(t1, t2, prevAngleDegRef.current);
                        const clockwise = clockwiseNew && clockwisePrev;

                        let t3 = splitPointDeg - SAFE_ANGLE;
                        let t4 = splitPointDeg - 0.001;

                        if(t3 < 0) t3 += 360;
                        if(t4 < 0) t4 += 360;

                        const counterClockwiseNew = isAngleInArc(t3, t4, newAngleDeg);
                        const counterClockwisePrev = isAngleInArc(splitPointDeg + 0.001, splitPointDeg + SAFE_ANGLE, prevAngleDegRef.current);
                        const counterClockwise = counterClockwiseNew && counterClockwisePrev;

                        if(clockwise || counterClockwise) {
                            updatePointer(pointer, splitPointDeg, true);
                            return;
                        }

                        if(newAngleDeg !== splitPointDeg) {
                           prevAngleDegRef.current = newAngleDeg;
                        }
                    }
                }
            }
            else{
                prevAngle = pointer.index === 0 ? svg.startAngleDeg : pointers.pointers[pointer.index - 1].angleDeg;
                nextAngle = pointer.index === pointers.pointers.length - 1 ? svg.endAngleDeg : pointers.pointers[pointer.index + 1].angleDeg;
            }

            if(nextAngle <= prevAngle) {
                nextAngle += 360;
            }
            else{
                if(mod(prevAngle, 360) <= mod(nextAngle, 360)) {
                    prevAngle = mod(prevAngle, 360);
                    nextAngle = mod(nextAngle, 360);
                }
            }

            if(!isAngleInArc(prevAngle, nextAngle, newAngleDeg)){
                newAngleDeg = getClosestEdge(
                    prevAngle,
                    nextAngle,
                    newAngleDeg,
                    svg.cx,
                    svg.cy,
                    svg.radius
                );
            }
        }

        updatePointer(pointer, newAngleDeg, pointer.angleDeg !== newAngleDeg);
    };

    const updatePointer = (pointer: IPointer, newAngleDeg: number, angleChanged: boolean) => {

        if(angleChanged) {
            const _pointers = { ...pointers };
            _pointers.pointers = [...pointers.pointers];
            _pointers.pointers[pointer.index].prevAngleDeg = _pointers.pointers[pointer.index].angleDeg;
            _pointers.pointers[pointer.index].angleDeg = newAngleDeg;
            pointers.pointers = _pointers.pointers;

            setPointers(_pointers);

            if(typeof props.onChange === 'function') {

                const updatedPointers: ISettingsPointer[] = _pointers.pointers.map(pointer => {

                    const val = angle2value(
                        data,
                        pointer.angleDeg,
                        svg.startAngleDeg,
                        svg.endAngleDeg
                    );

                    return {
                        radius: pointer.radius,
                        value: val,
                        bgColor: pointer.bgColor,
                        bgColorSelected: pointer.bgColorSelected,
                        bgColorDisabled: pointer.bgColorDisabled,
                        border: pointer.border,
                        borderColor: pointer.borderColor,
                        disabled: pointer.disabled,
                        ariaLabel: pointer.ariaLabel,
                    };
                });

                props.onChange(updatedPointers);
            }
        }

        setSelectedPointerId(pointer.id);

        const $pointer = svgRef.current?.querySelector(`[data-id="${ pointer.id }"]`) as HTMLElement;
        if($pointer) {
            $pointer.focus();
        }
    };

    return (
        <>
            {
                svg &&
                <svg
                    ref={ svgRef }
                    xmlns="http://www.w3.org/2000/svg"
                    width={ svg.size }
                    height={ svg.size }
                    tabIndex={ 0 }
                    focusable={ true }
                    aria-disabled={ props.disabled ? true : undefined }
                    style={ props.svgBgColor ? { ...outlineNoneStyle, backgroundColor: props.svgBgColor } : outlineNoneStyle }
                    className={ `mz-round-slider ${ props.disabled ? 'mz-round-slider-disabled' : '' }` }>

                    {
                        (props.SvgDefs) &&
                        <defs>
                            { props.SvgDefs }
                        </defs>
                    }

                    <Circle
                        settings={ props }
                        pointers={ pointers }
                        svg={ svg }
                        $svg={ svgRef.current }
                        setPointer={ setPointersCallback }
                    />

                    <Ticks settings={ props } svg={ svg } data={ data } />

                    <Connection
                        settings={ props }
                        pointers={ pointers }
                        svg={ svg }
                        $svg={ svgRef.current }
                        data={ data }
                        setPointer={ setPointersCallback }
                    />

                    <Pointers
                        settings={ props }
                        pointers={ pointers }
                        svg={ svg }
                        $svg={ svgRef.current }
                        data={ data }
                        setPointer={ setPointersCallback }
                        selectedPointerId={ selectedPointerId }
                    />

                    <Text
                        settings={ props }
                        pointers={ pointers }
                        svg={ svg }
                        data={ data }
                    />
                </svg>
            }
        </>
    )
};