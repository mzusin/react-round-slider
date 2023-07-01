import { IEllipse, IStatePointer, IUserSettings } from './interfaces';
import {
    useEffect, useRef, useState,
    MouseEvent as ReactMouseEvent,
    TouchEvent as ReactTouchEvent,
    KeyboardEvent, WheelEvent, CSSProperties,
} from 'react';
import { isNumber, Vector2 } from 'mz-math'; 
import {
    getActivePointerId,
    getInitialPointers,
    getMaxPointer,
    getMinMax, getPointerIndexById, getPointerPercentByMouse, getStepPercent, handleOverlap,
    updateMultiplePointersValue, updateSinglePointerValue
} from './domain/slider-provider';
import { getEllipseSegment, getSVGCenter, getSVGSize } from './domain/svg-provider';
import { getBoolean, getNumber, getString } from './domain/common';
import {
    DEFAULT_BG_COLOR,
    DEFAULT_CONNECTION_BG_COLOR, DEFAULT_POINTER_BG_COLOR,
    DEFAULT_STROKE_WIDTH,
    DEFAULT_SVG_RX,
    DEFAULT_SVG_RY, DEFAULT_SVG_STYLE,
    DISABLED_POINTER_STYLE, POINTER_OVERLAP_DEFAULT,
    ROUND_DEFAULT, TICKS_HEIGHT_DEFAULT, TICKS_WIDTH_DEFAULT,
} from './domain/defaults';
import Panel from './ui/Panel';
import { normalizeAngles } from './domain/angles-provider';
import Connection from './ui/Connection';
import Pointer from './ui/Pointer';
import Text from './ui/Text';
import Ticks from './ui/Ticks';

export const RoundSlider = (props: IUserSettings) => {

    const svgRef = useRef<SVGSVGElement>(null);
    const sliderRef = useRef<SVGPathElement>(null);
    const isClickOrDrag = useRef<'click'|'drag'>('click');``

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
    const [ pointerBgColor, setPointerBgColor ] = useState(DEFAULT_POINTER_BG_COLOR);
    const [ pointersOverlap, setPointersOverlap ] = useState(false);
    const [ disabled, setDisabled ] = useState(false);
    const [ disabledPointerStyle , setDisabledPointerStyle ] = useState<CSSProperties|undefined>(undefined);
    const [ keyboardDisabled, setKeyboardDisabled ] = useState(false);
    const [ mousewheelDisabled, setMousewheelDisabled ] = useState(false);
    const [ round, setRound ] = useState(ROUND_DEFAULT);

    const [ min, max ] = minMax;
    const [ svgWidth, svgHeight ] = svgSize;
    const [ startAngleDegrees, endAngleDegrees ] = startEndAngle;

    // text value ------------------
    const [ hideText, setHideText ] = useState(false);
    const [ textPrefix, setTextPrefix ] = useState('');
    const [ textSuffix, setTextSuffix ] = useState('');

    // ticks -----------------------
    const [ disableTicks, setDisableTicks ] = useState(false);
    const [ ticksWidth, setTicksWidth ] = useState(TICKS_WIDTH_DEFAULT);
    const [ ticksHeight, setTicksHeight ] = useState(TICKS_HEIGHT_DEFAULT);
    const [ ticsCount, setTicsCount ] = useState(0);

    // ---------------- STATE ----------------------------

    useEffect(() => {
        setDisableTicks(getBoolean(props.disableTicks, false));
        setTicksWidth(getNumber(props.ticksWidth, TICKS_WIDTH_DEFAULT));
        setTicksHeight(getNumber(props.ticksHeight, TICKS_HEIGHT_DEFAULT));

        let ticksCount = getNumber(props.ticsCount, 0);
        if(!ticksCount) {
            if(props.data && props.data.length > 0) {
                ticksCount = props.data.length - 1;
            }
            else{
                const diff = Math.abs(startAngleDegrees - endAngleDegrees) % 360;
                ticksCount = diff * (max - min) / 360;
            }
        }

        setTicsCount(ticksCount);
    }, [
        props.disableTicks,
        props.ticksWidth,
        props.ticksHeight,
        props.ticsCount,
        max, min, props.data,
        startAngleDegrees, endAngleDegrees,
    ]);

    useEffect(() => {
        setBgColor(getString(props.bgColor, DEFAULT_BG_COLOR));
        setConnectionBgColor(getString(props.connectionBgColor, DEFAULT_CONNECTION_BG_COLOR));
        setPointerBgColor(getString(props.pointerBgColor, DEFAULT_POINTER_BG_COLOR));
    }, [
        props.bgColor,
        props.connectionBgColor,
        props.pointerBgColor
    ]);

    useEffect(() => {
        setPointersOverlap(getBoolean(props.pointersOverlap, POINTER_OVERLAP_DEFAULT));
    }, [
        props.pointersOverlap,
    ]);

    useEffect(() => {
        setDisabled(getBoolean(props.disabled, false));
        setDisabledPointerStyle(props.disabledPointerStyle || DISABLED_POINTER_STYLE);
        setKeyboardDisabled(getBoolean(props.keyboardDisabled, false));
        setMousewheelDisabled(getBoolean(props.mousewheelDisabled, false));
    }, [
        props.disabled,
        props.disabledPointerStyle,
        props.keyboardDisabled,
        props.mousewheelDisabled,
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
            props.data,
            pointerBgColor,
            props.pointerSVG
        ));
    }, [
        props.pointers,
        props.data,
        min,
        max,
        pointerBgColor,
        props.pointerSVG,
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

    useEffect(() => {
        setRound(getNumber(props.round, ROUND_DEFAULT));
    }, [ props.round ]);

    useEffect(() => {
        setHideText(props.hideText);
        setTextPrefix(props.textPrefix);
        setTextSuffix(props.textSuffix);
    }, [ props.hideText, props.textPrefix, props.textSuffix ]);

    // ---------------- EVENTS ----------------------------

    const onValueChange = (evt: MouseEvent | ReactMouseEvent | TouchEvent | ReactTouchEvent) => {

        if(disabled || !svgRef || !svgRef.current) return;

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
            props.data,
            props.step
        );

        // SINGLE POINTER -----------------------------------------
        if(pointers.length <= 1) {
            setSelectedPointerId(pointers[0]?.id || null);
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

        setPointers(currentPointers => {
            const skipOverlapCheck = pointersOverlap || max === min;

            if(!skipOverlapCheck) {
                updatedPercent = handleOverlap(
                    updatedPercent,
                    currentPointers,
                    _selectedPointerId,
                    min,
                    max
                );
            }

            return updateMultiplePointersValue(currentPointers, updatedPercent, _selectedPointerId);
        });

        // const updatedPointers = handlePointerZIndex(activePointerId, pointers);
    }

    const onMouseDown = (evt: MouseEvent | ReactMouseEvent) => {
        if(disabled) return;

        const $target = evt.target as SVGElement;
        if(!$target) return;

        const isAllowedTarget = $target === sliderRef.current || $target.getAttribute('data-type') === 'pointer';
        if(!isAllowedTarget) return;

        /* Prevent default blocks keydown events:
        if (evt.preventDefault) {
            evt.preventDefault();
        }*/

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

    // ---------------- HELPERS ----------------------------

    const goPrevNext = (isNext: boolean) => {
        const pointerIndex = getPointerIndexById(pointers, selectedPointerId);
        if(pointerIndex === -1) return;

        const pointer = { ...pointers[pointerIndex] };
        let percent = pointer.percent;
        if(!isNumber(percent)) return;

        let stepPercent = getStepPercent(min, max, props.data, props.step);
        if(stepPercent === undefined) {
            stepPercent = 1;
        }

        if(isNext) {
            percent -= stepPercent;
        }
        else{
            percent += stepPercent;
        }

        if(percent > 100){
            percent = 100;
        }

        // rerender -----
        pointer.percent = percent;
        const copy = [...pointers];
        copy[pointerIndex] = pointer;
        setPointers(copy);
    };

    // ---------------- ARROWS & MOUSE ----------------------------

    const arrowLeftUp = () => {
        if(disabled || keyboardDisabled) return;

        const pointerIndex = getPointerIndexById(pointers, selectedPointerId);
        if(pointerIndex === -1 || pointers[pointerIndex].disabled) return;

        goPrevNext(false);
    };

    const arrowRightDown = () => {
        if(disabled || keyboardDisabled) return;

        const pointerIndex = getPointerIndexById(pointers, selectedPointerId);
        if(pointerIndex === -1 || pointers[pointerIndex].disabled) return;

        goPrevNext(true);
    };

    const onKeyDown = (evt: KeyboardEvent) => {
        switch (evt.key) {
            case 'ArrowLeft': {
                evt.preventDefault();
                arrowLeftUp();
                break;
            }

            case 'ArrowRight': {
                evt.preventDefault();
                arrowRightDown();
                break;
            }

            case 'ArrowUp': {
                evt.preventDefault();
                arrowLeftUp();
                break;
            }

            case 'ArrowDown': {
                evt.preventDefault();
                arrowRightDown();
                break;
            }
        }
    };

    const onWheel = (evt: WheelEvent) => {
        if(disabled || mousewheelDisabled) return;

        const pointerIndex = getPointerIndexById(pointers, selectedPointerId);
        if(pointerIndex === -1 || pointers[pointerIndex].disabled) return;

        evt.stopPropagation();
        // evt.preventDefault();

        const scrollTop = evt.deltaY < 0;
        goPrevNext(!scrollTop);
    };

    // ---------------- RENDERING -------------------------

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
            onTouchStart={ onValueChange }
            onKeyDown={ onKeyDown }
            className={ disabled ? 'disabled' : undefined }
            aria-disabled={ disabled ? true : undefined }
            tabIndex={ 0 }
            focusable={ true }
            onWheel={ onWheel }
            style={ DEFAULT_SVG_STYLE }>

            <Panel
                ref={ sliderRef }
                ellipse={ ellipse }
                strokeWidth={ strokeWidth }
                svgRadii={ svgRadii }
                bgColor={ bgColor }
            />

            {
                !disableTicks &&
                <Ticks
                    sliderRef={ sliderRef }
                    ticksWidth={ ticksWidth }
                    ticksHeight={ ticksHeight }
                    ticksColor={ bgColor }
                    ticsCount={ ticsCount }
                    totalLength={ sliderRef?.current?.getTotalLength() || 0 }
                    svgCenter={ svgCenter }
                />
            }

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

                            pointerBgColor={ pointer.bgColor }
                            pointerSVG={ props.pointerSVG || pointer.pointerSVG }

                            disabledPointerStyle={ disabledPointerStyle }
                            min={ min }
                            max={ max }
                            round={ round }
                            data={ props.data }
                            ariaLabel={ pointer.ariaLabel }
                        />
                    )
                })
            }

            {
                !hideText &&
                <Text 
                    svgCenter={ svgCenter } 
                    round={ round }
                    min={ min }
                    max={ max }
                    pointers={ pointers }
                    data={ props.data }
                    textPrefix={ textPrefix }
                    textSuffix={ textSuffix }
                />
            }

        </svg>
    )
};