import { IEllipse, IStatePointer, IUserSettings } from './interfaces';
import {
    useEffect, useRef, useState,
    MouseEvent as ReactMouseEvent,
    TouchEvent as ReactTouchEvent,
} from 'react';
import { Vector2 } from 'mz-math';
import {
    getActivePointerId,
    getInitialPointers,
    getMaxPointer,
    getMinMax, getPointerPercentByMouse, handleOverlap,
    handleValueChange, updateMultiplePointersValue, updateSinglePointerValue
} from './domain/slider-provider';
import { getEllipseSegment, getSVGCenter, getSVGSize } from './domain/svg-provider';
import { getBoolean, getNumber, getString } from './domain/common';
import {
    DEFAULT_BG_COLOR,
    DEFAULT_CONNECTION_BG_COLOR,
    DEFAULT_STROKE_WIDTH,
    DEFAULT_SVG_RX,
    DEFAULT_SVG_RY, POINTER_OVERLAP_DEFAULT
} from './domain/defaults';
import Panel from './ui/Panel';
import { normalizeAngles } from './domain/angles-provider';
import Connection from './ui/Connection';
import Pointer from './ui/Pointer';

export const RoundSlider = (props: IUserSettings) => {

    const svgRef = useRef<SVGSVGElement>(null);
    const sliderRef = useRef<SVGPathElement>(null);
    const isClickOrDrag = useRef<'click'|'drag'>('click');

    const [ selectedPointerId, setSelectedPointerId ] = useState<string|null>(null);
    const [ svgRadii, setSvgRadii ] = useState<Vector2>([0, 0]);
    const [ strokeWidth, setStrokeWidth ] = useState(0);
    const [ minMax, setMinMax ] = useState<Vector2>([0, 0]);
    const [ pointers, setPointers ] = useState<IStatePointer[]>([]);
    const [ maxPointer, setMaxPointer ] = useState<Vector2>([0, 0]);
    const [ svgSize, setSvgSize ] = useState<Vector2>([0, 0]);
    const [ svgCenter, setSvgCenter ] = useState<Vector2>([0, 0]);
    const [ startEndAngle, setStartEndAngle ] = useState<Vector2>([0, 0]);
    const [ ellipse, setEllipse ] = useState<IEllipse>( {
        start: [ 0, 0 ],
        end: [ 0, 0 ],
        largeArcFlag: 0,
    });
    const [ bgColor, setBgColor ] = useState(DEFAULT_BG_COLOR);
    const [ connectionBgColor, setConnectionBgColor ] = useState(DEFAULT_CONNECTION_BG_COLOR);
    const [ pointersOverlap, setPointersOverlap ] = useState(false);

    const [ min, max ] = minMax;
    const [ svgWidth, svgHeight ] = svgSize;
    const [ startAngleDegrees, endAngleDegrees ] = startEndAngle;

    useEffect(() => {
        setBgColor(getString(props.bgColor, DEFAULT_BG_COLOR));
    }, [
        props.bgColor,
    ]);

    useEffect(() => {
        setConnectionBgColor(getString(props.connectionBgColor, DEFAULT_CONNECTION_BG_COLOR));
    }, [
        props.bgColor,
        props.connectionBgColor,
    ]);

    useEffect(() => {
        setPointersOverlap(getBoolean(props.pointersOverlap, POINTER_OVERLAP_DEFAULT));
    }, [
        props.pointersOverlap,
    ]);

    /**
     * Define initial SVG circle/ellipse radii.
     */
    useEffect(() => {
        setSvgRadii([
            getNumber(props.rx, DEFAULT_SVG_RX),
            getNumber(props.ry, DEFAULT_SVG_RY)
        ]);
    }, [
        props.rx,
        props.ry,
    ]);

    /**
     * Define the initial slider stroke width.
     */
    useEffect(() => {
        setStrokeWidth(getNumber(props.strokeWidth, DEFAULT_STROKE_WIDTH));
    }, [
        props.strokeWidth,
    ]);

    /**
     * On component init, min and max should be initialized together,
     * because their validations depend on each other.
     * In case when the data is provided, min & max represent index in the data array.
     */
    useEffect(() => {
        setMinMax(getMinMax(props.min, props.max, props.data));
    }, [
        props.min,
        props.max,
        props.data,
    ]);

    /**
     * Convert user provided pointers settings to the actual state pointers' definition.
     */
    useEffect(() => {
        setPointers(getInitialPointers(
            props.pointers,
            min,
            max,
            props.data
        ));
    }, [
        props.pointers,
        props.data,
        min,
        max,
    ]);

    /**
     * Max pointer [rx, ry] is used to define svg size, svg center position,
     * and also ellipse/circle properties.
     */
    useEffect(() => {
        setMaxPointer(getMaxPointer(pointers));
    }, [
        pointers,
    ]);

    /**
     * Calculate SVG size depending on ellipse radii and max pointer size.
     */
    useEffect(() => {
        setSvgSize(getSVGSize(svgRadii, maxPointer, strokeWidth));
    }, [
        svgRadii,
        maxPointer,
        strokeWidth,
    ]);

    /**
     * Calculate the center point of the SVG.
     */
    useEffect(() => {
        setSvgCenter(getSVGCenter(svgRadii, maxPointer, strokeWidth));
    }, [
        svgRadii,
        maxPointer,
        strokeWidth,
    ]);

    useEffect(() => {
        setStartEndAngle(normalizeAngles(props.startAngleDegrees, props.endAngleDegrees));
    }, [
        props.startAngleDegrees,
        props.endAngleDegrees,
    ]);

    /**
     * Get start & end points of SVG ellipse/circle segment.
     * Also define the 'large-arc-flag' property of svg path data elliptical arc.
     */
    useEffect(() => {
        setEllipse(getEllipseSegment(
            startAngleDegrees,
            endAngleDegrees,
            svgRadii,
            maxPointer,
            strokeWidth
        ));
    }, [
        startAngleDegrees,
        endAngleDegrees,
        svgRadii,
        maxPointer,
        strokeWidth,
    ]);

    const onValueChange = (evt: MouseEvent | ReactMouseEvent | TouchEvent | ReactTouchEvent) => {

        if(!svgRef || !svgRef.current) return;

        const mouseX = evt.type.indexOf('mouse') !== -1 ? (evt as MouseEvent).clientX : (evt as TouchEvent).touches[0].clientX;
        const mouseY = evt.type.indexOf('mouse') !== -1 ? (evt as MouseEvent).clientY : (evt as TouchEvent).touches[0].clientY;

        /**
         * Once user drags the pointer, get updated pointer percent
         * depending on the new mouse position.
         */
        let updatedPercent = getPointerPercentByMouse(
            svgRef.current as SVGSVGElement,
            [mouseX, mouseY],
            svgCenter,
            svgRadii,
            startAngleDegrees,
            endAngleDegrees,
            min,
            max,
        );

        // SINGLE POINTER -----------------------------------------
        if(pointers.length <= 1) {
            setPointers(currentPointers => {
                return updateSinglePointerValue(currentPointers, updatedPercent);
            });
            return;
        }

        /**
         * There can be multiple pointers, part of them can be disabled.
         * This code defines the current active pointer.
         */
        let _selectedPointerId = selectedPointerId;
        setSelectedPointerId(currentSelectedPointerId => {
            _selectedPointerId = getActivePointerId(
                evt.target as HTMLElement,
                pointers,
                updatedPercent,
                currentSelectedPointerId,
                startAngleDegrees,
                endAngleDegrees,
                isClickOrDrag.current
            );
            return _selectedPointerId;
        });

        // MULTIPLE POINTERS ---------------------------------------
        if(_selectedPointerId === null) return;

        const skipOverlapCheck = pointersOverlap || max === min;
        if(!skipOverlapCheck) {
            updatedPercent = handleOverlap(
                updatedPercent,
                pointers,
                _selectedPointerId,
                min,
                max
            );
        }

        setPointers(currentPointers => {
            return updateMultiplePointersValue(currentPointers, updatedPercent, _selectedPointerId);
        });

        // const updatedPointers = handlePointerZIndex(activePointerId, pointers);
    }

    const onMouseDown = (evt: MouseEvent | ReactMouseEvent) => {

        const $target = evt.target as SVGElement;
        if(!$target) return;

        const isAllowedTarget = $target === sliderRef.current || $target.getAttribute('data-type') === 'pointer';
        if(!isAllowedTarget) return;

        if (evt.preventDefault) {
            evt.preventDefault();
        }

        onValueChange(evt);

        window.addEventListener('mousemove', onValueChange);
        window.addEventListener('mouseup', onMouseUp);
        isClickOrDrag.current = 'drag';
    };

    const onMouseUp = (_evt: MouseEvent | ReactMouseEvent) => {
        window.removeEventListener('mousemove', onValueChange);
        window.removeEventListener('mouseup', onValueChange);
        isClickOrDrag.current = 'click';
    };

    return (
        <svg
            data-type="bg"
            xmlns="http://www.w3.org/2000/svg"
            ref={ svgRef }
            width={ svgWidth }
            height={ svgHeight }
            onMouseDown={ onMouseDown }
            onMouseUp={ onMouseUp }
            onTouchMove={ onValueChange }
            onTouchStart={ onValueChange }>

            <Panel
                ref={ sliderRef }
                ellipse={ ellipse }
                strokeWidth={ strokeWidth }
                svgRadii={ svgRadii }
                bgColor={ bgColor }
            />

            <Connection
                pointers={ pointers }
                ellipse={ ellipse }
                svgRadii={ svgRadii }
                strokeWidth={ strokeWidth }
                connectionBgColor={ connectionBgColor }
                startEndAngle={ startEndAngle }
                svgCenter={ svgCenter }
            />

            {
                pointers.map(pointer => {
                    return (
                        <Pointer
                            key={ pointer.id }
                            pointer={ pointer }
                            id={ pointer.id }
                            startEndAngle={ startEndAngle }
                            svgRadii={ svgRadii }
                            svgCenter={ svgCenter }
                        />
                    )
                })
            }
        </svg>
    )
};