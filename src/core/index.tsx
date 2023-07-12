import { useEffect, useRef, useState } from 'react';
import { getSvg, ISvg } from './domain/svg-provider';
import { angle2value, getClosestEdge, getPointers, IPointer, IPointers, roundToStep } from './domain/pointers-provider';
import { ISettings } from './domain/settings-provider';
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

    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        setData(getData(props));
    }, [ props ]);

    useEffect(() => {
        setPointers(getPointers(props, data));
    }, [
        props,
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

    const setPointersCallback = (pointer: IPointer, newAngleDeg: number) => {
        if(props.disabled || !pointers.pointers || !pointer || pointer.disabled) return;

        newAngleDeg = roundToStep(newAngleDeg, data.stepAngleDeg);
        if(data.isClosedShape && mod(newAngleDeg, 360) === mod(svg.endAngleDeg, 360)){
            newAngleDeg = svg.startAngleDeg;
        }

        if(pointer.angleDeg === newAngleDeg) return;

        const handleOverlap = !props.pointersOverlap;
        if(handleOverlap) {

            let prevAngle, nextAngle;

            if(data.isClosedShape) {
                const prevIndex = mod(pointer.index - 1, pointers.pointers.length);
                const nextIndex = mod(pointer.index + 1, pointers.pointers.length);

                prevAngle = pointers.pointers[prevIndex].angleDeg;
                nextAngle = pointers.pointers[nextIndex].angleDeg;
            }
            else{
                prevAngle = pointer.index === 0 ? svg.startAngleDeg : pointers.pointers[pointer.index - 1].angleDeg;
                nextAngle = pointer.index === pointers.pointers.length - 1 ? svg.endAngleDeg : pointers.pointers[pointer.index + 1].angleDeg;
            }

            if(nextAngle <= prevAngle) {
                nextAngle += 360;
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

        if(pointer.angleDeg === newAngleDeg) return;

        const _pointers = { ...pointers };
        _pointers.pointers = [...pointers.pointers];
        _pointers.pointers[pointer.index].angleDeg = newAngleDeg;
        pointers.pointers = _pointers.pointers;

        setPointers(_pointers);

        if(typeof props.onChange === 'function') {
            const values = _pointers.pointers.map(pointer => angle2value(
                data,
                pointer.angleDeg,
                svg.startAngleDeg,
                svg.endAngleDeg
            ));

            props.onChange(values);
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
                    style={ props.svgBgColor ? { ...outlineNoneStyle, backgroundColor: props.svgBgColor } : outlineNoneStyle }>

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
                        setPointer={ setPointersCallback }
                        data={ data }
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