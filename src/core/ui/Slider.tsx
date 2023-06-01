import {
    MouseEvent as ReactMouseEvent,
    TouchEvent as ReactTouchEvent, useEffect,
    useRef,
} from 'react';
import {
    getActivePointerId, getNextPrevPointer,
    getPointerPercentByMouse,
    handlePointerZIndex
} from '../domain/slider-provider';
import { RootState, useAppDispatch, useAppSelector, useAppStore } from '../data/store';
import { sliderActions } from '../data/slider-slice';
import Panel from './Panel';
import Pointers from './Pointers';
import { Connection } from './Connection';

export const Slider = () => {

    const sliderRef = useRef<SVGPathElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const spId = useRef(''); // selected pointer id
    const isClickOrDrag = useRef<'click'|'drag'>('click');

    const svgRadii = useAppSelector(store => store.slider.svgRadii);
    const svgSize = useAppSelector(store => store.slider.svgSize);
    const svgCenter = useAppSelector(store => store.slider.svgCenter);
    const angles = useAppSelector(store => store.slider.angles);
    const min = useAppSelector(store => store.slider.min);
    const max = useAppSelector(store => store.slider.max);
    const pointersOverlap = useAppSelector(store => store.slider.pointersOverlap);

    const pointers = useAppSelector(store => store.slider.pointers);
    const store = useAppStore();
    const selectedPointerId = useAppSelector(store => store.slider.selectedPointerId);

    const [ startAngleDegrees, endAngleDegrees ] = angles;
    const [ svgWidth, svgHeight ] = svgSize;

    useEffect(() => {
        spId.current = selectedPointerId;
    }, [selectedPointerId]);

    const dispatch = useAppDispatch();

    const onValueChange = (evt: MouseEvent | ReactMouseEvent | TouchEvent | ReactTouchEvent) => {

        if(!svgRef || !svgRef.current) return;

        const mouseX = evt.type.indexOf('mouse') !== -1 ? (evt as MouseEvent).clientX : (evt as TouchEvent).touches[0].clientX;
        const mouseY = evt.type.indexOf('mouse') !== -1 ? (evt as MouseEvent).clientY : (evt as TouchEvent).touches[0].clientY;

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

        const activePointerId = getActivePointerId(
            evt.target as HTMLElement,
            pointers,
            updatedPercent,
            spId.current,
            startAngleDegrees,
            endAngleDegrees,
            isClickOrDrag.current
        );

        const _pointers = handlePointerZIndex(activePointerId, pointers);

        spId.current = activePointerId;

        const skipOverlapCheck = pointersOverlap || pointers.length <= 1 || max === min;
        if(!skipOverlapCheck) {
            /** Pointers non-overlap cases: ------------------------------------ */
            // We need immediate access to the latest pointers version.
            const latestPointers = (store.getState() as RootState).slider.pointers;
            const [currentPointer, nextPointer, prevPointer] = getNextPrevPointer(latestPointers, spId.current);
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
        }

        dispatch(sliderActions.onSelectedPointerChange({
            activePointerId,
            pointers: _pointers,
        }));

        if(activePointerId === null) return;

        const pointerIndex = _pointers.findIndex(p => p.id === activePointerId);
        if(pointerIndex === -1) return;

        const copy = [..._pointers];
        const pointer = {...copy[pointerIndex]};
        pointer.percent = updatedPercent;
        copy[pointerIndex] = pointer;

        dispatch(sliderActions.onPointerChange(copy));
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

            <Panel ref={ sliderRef } />
            <Connection />
            <Pointers />
        </svg>
    )
};