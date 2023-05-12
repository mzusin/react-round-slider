import {
    MouseEvent as ReactMouseEvent,
    TouchEvent as ReactTouchEvent, useEffect,
    useRef,
} from 'react';
import { Pointer } from './Pointer';
import { getEllipseSegment, getPointerPosition, getSVGCenter, getSVGSize } from '../domain/svg-provider';
import { Vector2 } from 'mz-math';
import { useAppDispatch, useAppSelector } from '../data/store';
import { getNumber, getString } from '../domain/common';
import {
    DEFAULT_BG_COLOR,
    DEFAULT_POINTER_RX, DEFAULT_POINTER_RY,
    DEFAULT_STROKE_WIDTH,
    DEFAULT_SVG_RX,
    DEFAULT_SVG_RY
} from '../domain/defaults';
import { normalizeAngles } from '../domain/angles-provider';
import { IStatePointer, IUserSettings } from '../interfaces';
import { sliderActions } from '../data/slider-slice';

const getMaxPointer = (pointers: IStatePointer[]) : Vector2 => {
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

export const Slider = (props: IUserSettings) => {

    const svgRef = useRef<SVGSVGElement>(null);
    const sliderRef = useRef<SVGPathElement>(null);

    const sliderStartPoint = useAppSelector(store => store.slider.sliderStartPoint);
    const sliderEndPoint = useAppSelector(store => store.slider.sliderEndPoint);
    const largeArcFlag = useAppSelector(store => store.slider.largeArcFlag);
    const svgRadii = useAppSelector(store => store.slider.svgRadii);
    const bgColor = useAppSelector(store => store.slider.bgColor);
    const strokeWidth = useAppSelector(store => store.slider.strokeWidth);
    const svgSize = useAppSelector(store => store.slider.svgSize);
    const svgCenter = useAppSelector(store => store.slider.svgCenter);
    const angles = useAppSelector(store => store.slider.angles);

    const pointers = useAppSelector(store => store.slider.pointers);
    const pointerPositions = useAppSelector(store => store.slider.pointerPositions);

    const [ startAngleDegrees, endAngleDegrees ] = angles;
    const [ svgWidth, svgHeight ] = svgSize;

    const dispatch = useAppDispatch();

    /**
     * Combine user settings with the defaults,
     * and init slider state properties.
     */
    useEffect(() => {
        // Define initial SVG circle/ellipse radii.
        const svgRadii: Vector2 = [
            getNumber(props.rx, DEFAULT_SVG_RX),
            getNumber(props.ry, DEFAULT_SVG_RY)
        ];

        // Define ellipse/circle segment using angles defined in degrees.
        const [startAngleDegrees, endAngleDegrees] = normalizeAngles(props.startAngleDegrees, props.endAngleDegrees);
        const angles: Vector2 = [startAngleDegrees, endAngleDegrees];

        const strokeWidth = getNumber(props.strokeWidth, DEFAULT_STROKE_WIDTH);
        const bgColor = getString(props.bgColor, DEFAULT_BG_COLOR);

        // Convert user provided pointers settings to the actual state pointers' definition.
        const _pointers = props.pointers ? props.pointers.map(pointer => {
            return {
                pointerRadii: [
                    getNumber(pointer.rx, DEFAULT_POINTER_RX),
                    getNumber(pointer.ry, DEFAULT_POINTER_RY),
                ]
            } as IStatePointer;
        }) : pointers;

        const maxPointer: Vector2 = getMaxPointer(_pointers);
        const svgSize: Vector2 = getSVGSize(svgRadii, maxPointer, strokeWidth);
        const svgCenter: Vector2 = getSVGCenter(svgRadii, maxPointer, strokeWidth);

        const { sliderStartPoint, sliderEndPoint, largeArcFlag } = getEllipseSegment(
            startAngleDegrees,
            endAngleDegrees,
            svgRadii,
            maxPointer,
            strokeWidth
        );

        const pointerPositions: Vector2[] = _pointers.map(pointer => {
            return sliderStartPoint
        });

        dispatch(
            sliderActions.initUserSettings({
                // svg look & feel properties ---------
                svgRadii,
                angles,
                strokeWidth,
                bgColor,

                // pointers ----------------------------
                pointers: _pointers,
                pointerPositions,

                // calculated properties ---------------
                svgSize,
                svgCenter,
                sliderStartPoint,
                sliderEndPoint,
                largeArcFlag,
            })
        );
    }, []);

    const onValueChange = (evt: MouseEvent | ReactMouseEvent | TouchEvent | ReactTouchEvent) => {

        if(!svgRef || !svgRef.current || !sliderRef || !sliderRef.current) return;

        const mouseX = evt.type.indexOf('mouse') !== -1 ? (evt as MouseEvent).clientX : (evt as TouchEvent).touches[0].clientX;
        const mouseY = evt.type.indexOf('mouse') !== -1 ? (evt as MouseEvent).clientY : (evt as TouchEvent).touches[0].clientY;

        const pointerPos = getPointerPosition(
            svgRef.current as SVGSVGElement,
            [mouseX, mouseY],
            svgCenter,
            svgRadii,
            startAngleDegrees,
            endAngleDegrees,
            sliderStartPoint,
            sliderEndPoint,
        );

        const copy = [...pointerPositions];
        copy[0] = pointerPos;

        dispatch(sliderActions.updatePointersPosition(copy));
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
    };

    const onMouseUp = (_evt: MouseEvent | ReactMouseEvent) => {
        window.removeEventListener('mousemove', onValueChange);
        window.removeEventListener('mouseup', onValueChange);
    };

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            ref={ svgRef }
            width={ svgWidth }
            height={ svgHeight }
            onMouseDown={ onMouseDown }
            onMouseUp={ onMouseUp }
            onTouchMove={ onValueChange }
            onTouchStart={ onValueChange }>

            <path
                ref={ sliderRef }
                d={ `M ${ sliderStartPoint[0] } ${ sliderStartPoint[1] } A ${ svgRadii[0] } ${ svgRadii[1] } 0 ${ largeArcFlag } 1 ${ sliderEndPoint[0] } ${ sliderEndPoint[1] }` }
                stroke={ bgColor }
                strokeWidth={ strokeWidth }
                fill="none"
                shapeRendering="geometricPrecision"
                strokeLinecap="round"
                cursor="pointer"
            />

            {
                pointerPositions.map((pointerPosition, i) => {
                    return (
                        <Pointer key={ i } center={ pointerPosition } pointerRadii={ pointers[i].pointerRadii } />
                    )
                })
            }
        </svg>
    )
};