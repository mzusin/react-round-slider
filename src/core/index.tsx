import { useEffect, useRef, useState } from 'react';
import { getSvg, ISvg } from './domain/svg-provider';
import { getClosestEdge, getPointers, IPointer, IPointers, roundToStep } from './domain/pointers-provider';
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

        setSvg(getSvg(
            getNumber(props.pathRadius, DEFAULT_PATH_RADIUS),
            getNumber(props.pathThickness, DEFAULT_PATH_THICKNESS),
            getNumber(props.pathBorder, DEFAULT_PATH_BORDER),
            pointers.maxRadius,
            getNumber(props.pathStartAngle, DEFAULT_PATH_START_ANGLE),
            getNumber(props.pathEndAngle, DEFAULT_PATH_END_ANGLE),
        ));
    }, [
        props.pathRadius,
        props.pathThickness,
        props.pathBorder,
        props.pathStartAngle,
        props.pathEndAngle,
        pointers,
    ]);

    const setPointersCallback = (updatedPointer: IPointer) => {
        if(props.disabled || !pointers.pointers || !updatedPointer || updatedPointer.disabled) return;

        updatedPointer.angleDeg = roundToStep(updatedPointer.angleDeg, data.stepAngleDeg);

        const handleOverlap = !props.pointersOverlap && pointers.pointers.length > 1;
        if(handleOverlap) {

            let prevAngle, nextAngle;

            if(data.isClosedShape) {
                const prevIndex = mod(updatedPointer.index - 1, pointers.pointers.length);
                const nextIndex = mod(updatedPointer.index + 1, pointers.pointers.length);

                prevAngle = pointers.pointers[prevIndex].angleDeg;
                nextAngle = pointers.pointers[nextIndex].angleDeg;
            }
            else{
                prevAngle = updatedPointer.index === 0 ? svg.startAngleDeg : pointers.pointers[updatedPointer.index - 1].angleDeg;
                nextAngle = updatedPointer.index === pointers.pointers.length - 1 ? svg.endAngleDeg : pointers.pointers[updatedPointer.index + 1].angleDeg;
            }

            if(nextAngle <= prevAngle) {
                nextAngle += 360;
            }

            if(!isAngleInArc(prevAngle, nextAngle, updatedPointer.angleDeg)){
                updatedPointer.angleDeg = getClosestEdge(
                    prevAngle,
                    nextAngle,
                    updatedPointer.angleDeg,
                    svg.cx,
                    svg.cy,
                    svg.radius
                );
            }
        }

        const _pointers = { ...pointers };
        _pointers.pointers = [...pointers.pointers];
        _pointers.pointers[updatedPointer.index] = updatedPointer;
        pointers.pointers = _pointers.pointers;

        setPointers(_pointers);
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
                    style={ outlineNoneStyle }>

                    <Ticks settings={ props } svg={ svg } data={ data } />

                    <Circle
                        settings={ props }
                        pointers={ pointers }
                        svg={ svg }
                        $svg={ svgRef.current }
                        setPointer={ setPointersCallback }
                    />

                    <Connection
                        settings={ props }
                        pointers={ pointers }
                        svg={ svg }
                        $svg={ svgRef.current }
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