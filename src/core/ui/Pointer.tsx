import { getAngleByMouse, getClosestEdge, IPointer } from '../domain/pointers-provider';
import {
    useEffect,
    useState,
    MouseEvent as ReactMouseEvent,
    TouchEvent as ReactTouchEvent,
    KeyboardEvent,
    useRef, useCallback, MutableRefObject
} from 'react';
import { circleMovement, convertRange, degreesToRadians, Vector2 } from 'mz-math';
import { ISettings } from '../domain/settings-provider';
import { ISvg } from '../domain/svg-provider';
import { isAngleInArc } from '../domain/circle-provider';
import { IData } from '../domain/data-provider';
import { outlineNoneStyle } from '../domain/style-provider';

export interface IPointerProps {
    settings: ISettings;
    pointer: IPointer;
    svg: ISvg;
    $svg: SVGSVGElement;
    setPointer: (updatedPointer: IPointer) => void;
    data: IData;
}

const getPointerFill = (
    pointer: IPointer,
    pointerRef: MutableRefObject<SVGGElement>,
    bgColor: string,
    bgColorSelected: string,
    bgColorDisabled: string
) => {
    if(pointer.disabled) return bgColorDisabled;

    if(document.activeElement === pointerRef.current) {
        return bgColorSelected || bgColor;
    }

    return bgColor;
};

const Pointer = (props: IPointerProps) => {

    const pointerRef = useRef<SVGGElement|null>(null);

    const {
        pointer, svg, $svg,
        setPointer, data, settings,
    } = props;

    const {
        radius,
        angleDeg,
        bgColor,
        bgColorSelected,
        bgColorDisabled,
        border,
        borderColor,
    } = props.pointer;

    const { cx, cy } = svg;

    const [ center, setCenter ] = useState<Vector2|null>(null);

    useEffect(() => {
        const angleRad = convertRange(degreesToRadians(angleDeg), 0, Math.PI * 2, 0, Math.PI); // [0, Math.PI*2] ---> [0, Math.PI]
        const pointerCenter = circleMovement([cx, cy], angleRad, svg.radius);
        setCenter(pointerCenter);
    }, [
        angleDeg,
        cx,
        cy,
        svg.radius,
    ]);

    const onValueChange = useCallback((evt: MouseEvent | ReactMouseEvent | TouchEvent | ReactTouchEvent) => {
        if(!$svg || settings.disabled || pointer.disabled) return;

        const mouseX = evt.type.indexOf('mouse') !== -1 ? (evt as MouseEvent).clientX : (evt as TouchEvent).touches[0].clientX;
        const mouseY = evt.type.indexOf('mouse') !== -1 ? (evt as MouseEvent).clientY : (evt as TouchEvent).touches[0].clientY;

        const degrees = getAngleByMouse(
            $svg,
            mouseX,
            mouseY,
            svg.cx,
            svg.cy,
            svg.radius,
            svg.radius
        );

        if(!isAngleInArc(
            svg.startAngleDeg,
            svg.endAngleDeg,
            degrees
        )){
            pointer.angleDeg = getClosestEdge(
                svg.startAngleDeg,
                svg.endAngleDeg,
                pointer.angleDeg,
                svg.cx,
                svg.cy,
                svg.radius
            );
        }
        else{
            pointer.angleDeg = degrees;
        }

        setPointer(pointer);
    }, [
        $svg,
        pointer,
        setPointer,
        svg.cx,
        svg.cy,
        svg.endAngleDeg,
        svg.radius,
        svg.startAngleDeg,
        settings.disabled,
    ]);

    const onMouseUp = () => {
        window.removeEventListener('mousemove', onValueChange);
        window.removeEventListener('mouseup', onValueChange);
    };

    const onMouseDown = (evt: ReactMouseEvent) => {
        if(settings.disabled || pointer.disabled) return;

        const $target = evt.target as SVGGElement;
        if(!$target) return;

        onValueChange(evt);

        window.addEventListener('mousemove', onValueChange);
        window.addEventListener('mouseup', onMouseUp);
    };

    const onKeyDown = (evt: KeyboardEvent) => {

        if(settings.disabled || pointer.disabled || settings.keyboardDisabled) return;

        switch (evt.key) {
            case 'ArrowLeft': {
                evt.preventDefault();
                pointer.angleDeg += data.stepAngleDeg;
                setPointer(pointer);
                break;
            }

            case 'ArrowRight': {
                evt.preventDefault();
                pointer.angleDeg -= data.stepAngleDeg;
                setPointer(pointer);
                break;
            }

            case 'ArrowUp': {
                evt.preventDefault();
                pointer.angleDeg -= data.stepAngleDeg;
                setPointer(pointer);
                break;
            }

            case 'ArrowDown': {
                evt.preventDefault();
                pointer.angleDeg += data.stepAngleDeg;
                setPointer(pointer);
                break;
            }
        }
    };

    useEffect(() => {
        const $current = pointerRef.current;

        const onTouch = (evt: TouchEvent | ReactTouchEvent) => {
            if(settings.disabled || pointer.disabled) return;

            evt.preventDefault();
            evt.stopPropagation();
            onValueChange(evt);
        };

        const onWheel = (evt: WheelEvent) => {

            if(settings.disabled || pointer.disabled || settings.mousewheelDisabled || document.activeElement !== $current) return;

            evt.stopPropagation();
            evt.preventDefault();

            const scrollTop = evt.deltaY < 0;

            if(scrollTop) {
                pointer.angleDeg += data.stepAngleDeg;
            }
            else{
                pointer.angleDeg -= data.stepAngleDeg;
            }

            setPointer(pointer);
        };

        $current?.addEventListener('touchmove', onTouch, {
            passive: false,
        });

        document.addEventListener('wheel', onWheel, {
            passive: false,
        });

        return () => {
            $current?.removeEventListener('touchmove', onTouch);
            document.removeEventListener('wheel', onWheel);
        };
    }, [
        center,
        onValueChange,
        data.stepAngleDeg,
        pointer,
        setPointer,
        settings.disabled,
        settings.mousewheelDisabled,
    ]);

    return (
        <>
            {
                center &&
                <g
                    ref={ pointerRef }
                    transform={ `translate(${ center[0] - radius/2 }, ${ center[1] - radius/2 })` }

                    role="slider"
                    aria-disabled={ pointer.disabled ? true : undefined }

                    data-type={ 'pointer' }
                    data-angle={ pointer.angleDeg }
                    data-id={ pointer.id }
                    data-index={ pointer.index }

                    onMouseDown={ onMouseDown }
                    onKeyDown={ onKeyDown }
                    tabIndex={ 0 }

                    cursor={ pointer.disabled ? 'default' : 'pointer' }
                    style={ outlineNoneStyle }>
                    <circle
                        cx={ radius/2 }
                        cy={ radius/2 }
                        r={ radius }

                        fill={ getPointerFill(pointer, pointerRef, bgColor, bgColorSelected, bgColorDisabled) }
                        strokeWidth={ border }
                        stroke={ borderColor }
                    />
                </g>
            }
        </>
    )
};

export default Pointer;