import {
    MouseEvent as ReactMouseEvent,
    TouchEvent as ReactTouchEvent,
    useRef,
} from 'react';
import { Pointer } from './Pointer';
import { getPointerPercentByMouse } from '../domain/slider-provider';
import { useAppDispatch, useAppSelector } from '../data/store';
import { sliderActions } from '../data/slider-slice';

export const Slider = () => {

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
    const min = useAppSelector(store => store.slider.min);
    const max = useAppSelector(store => store.slider.max);

    const pointers = useAppSelector(store => store.slider.pointers);

    const [ startAngleDegrees, endAngleDegrees ] = angles;
    const [ svgWidth, svgHeight ] = svgSize;

    const dispatch = useAppDispatch();

    const onValueChange = (evt: MouseEvent | ReactMouseEvent | TouchEvent | ReactTouchEvent) => {

        if(!svgRef || !svgRef.current || !sliderRef || !sliderRef.current) return;

        const mouseX = evt.type.indexOf('mouse') !== -1 ? (evt as MouseEvent).clientX : (evt as TouchEvent).touches[0].clientX;
        const mouseY = evt.type.indexOf('mouse') !== -1 ? (evt as MouseEvent).clientY : (evt as TouchEvent).touches[0].clientY;

        const updatedPercent = getPointerPercentByMouse(
            svgRef.current as SVGSVGElement,
            [mouseX, mouseY],
            svgCenter,
            svgRadii,
            startAngleDegrees,
            endAngleDegrees,
            min,
            max,
        );

        const pointer = {...pointers[0]};
        pointer.percent = updatedPercent;

        const copy = [...pointers];
        copy[0] = pointer;

        dispatch(sliderActions.updatePointers(copy));
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
                pointers.map((pointer, i) => {
                    return (
                        <Pointer key={ i } pointer={ pointer } />
                    )
                })
            }
        </svg>
    )
};