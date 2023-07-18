import { angle2value, getAngleByMouse, getClosestEdge, IPointer } from '../domain/pointers-provider';
import {
    useEffect,
    useState,
    MouseEvent as ReactMouseEvent,
    TouchEvent as ReactTouchEvent,
    KeyboardEvent,
    useRef, useCallback,
} from 'react';
import { circleMovement, convertRange, degreesToRadians, Vector2 } from 'mz-math';
import { ISettings } from '../domain/settings-provider';
import { ISvg } from '../domain/svg-provider';
import { isAngleInArc } from '../domain/circle-provider';
import { IData } from '../domain/data-provider';
import { outlineNoneStyle } from '../domain/style-provider';
import { DEFAULT_POINTER_BG_COLOR } from '../domain/defaults-provider';

export interface IPointerProps {
    settings: ISettings;
    pointer: IPointer;
    svg: ISvg;
    $svg: SVGSVGElement;
    data: IData;
    setPointer: (pointer: IPointer, newAngleDeg: number) => void;
    selectedPointerId: string;
}

const getPointerFill = (
    pointer: IPointer,
    selectedPointerId: string,
    bgColor: string,
    bgColorSelected: string,
    bgColorDisabled: string,
    bgColorHover: string,
    isMouseOver: boolean
) => {
    if(pointer.disabled) return bgColorDisabled;

    if(isMouseOver) return bgColorHover;

    if(pointer.id === selectedPointerId) {
        return bgColorSelected;
    }

    return bgColor;
};

const Pointer = (props: IPointerProps) => {

    const pointerRef = useRef<SVGGElement|null>(null);

    const {
        pointer, svg, $svg, data, settings,
        setPointer, selectedPointerId,
    } = props;

    const {
        radius,
        angleDeg,
        bgColor,
        bgColorSelected,
        bgColorDisabled,
        bgColorHover,
        border,
        borderColor,
    } = props.pointer;

    const { cx, cy } = svg;

    const [ center, setCenter ] = useState<Vector2|null>(null);
    const [ value, setValue ] = useState<string>('');
    const [ fill, setFill ] = useState(DEFAULT_POINTER_BG_COLOR);
    const [ isMouseOver, setIsMouseOver ] = useState(false);

    useEffect(() => {
        setFill(getPointerFill(
            pointer,
            selectedPointerId,
            bgColor,
            bgColorSelected,
            bgColorDisabled,
            bgColorHover,
            isMouseOver
        ));
    }, [
        pointer,
        selectedPointerId,
        bgColor,
        bgColorSelected,
        bgColorDisabled,
        bgColorHover,
        isMouseOver
    ]);

    useEffect(() => {
        const value = angle2value(
            data,
            pointer.angleDeg,
            svg.startAngleDeg,
            svg.endAngleDeg
        );
        setValue(value === undefined ? '' : value.toString())
    }, [
        data,
        pointer.angleDeg,
        svg.startAngleDeg,
        svg.endAngleDeg,
    ]);

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

        let newAngleDeg;

        if(!isAngleInArc(
            svg.startAngleDeg,
            svg.endAngleDeg,
            degrees
        )){
            newAngleDeg = getClosestEdge(
                svg.startAngleDeg,
                svg.endAngleDeg,
                pointer.angleDeg,
                svg.cx,
                svg.cy,
                svg.radius
            );
        }
        else{
            newAngleDeg = degrees;
        }

        setPointer(pointer, newAngleDeg);
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

        onValueChange(evt);

        window.addEventListener('mousemove', onValueChange);
        window.addEventListener('mouseup', onMouseUp);
    };

    const onKeyDown = (evt: KeyboardEvent) => {

        if(settings.disabled || pointer.disabled || settings.keyboardDisabled) return;

        switch (evt.key) {
            case 'ArrowLeft': {
                evt.preventDefault();
                setPointer(pointer, pointer.angleDeg + data.arrowStepAngleDeg);
                break;
            }

            case 'ArrowRight': {
                evt.preventDefault();
                setPointer(pointer, pointer.angleDeg - data.arrowStepAngleDeg);
                break;
            }

            case 'ArrowUp': {
                evt.preventDefault();
                setPointer(pointer, pointer.angleDeg - data.arrowStepAngleDeg);
                break;
            }

            case 'ArrowDown': {
                evt.preventDefault();
                setPointer(pointer, pointer.angleDeg + data.arrowStepAngleDeg);
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

            let newAngleDeg;
            if(scrollTop) {
                newAngleDeg = pointer.angleDeg + data.arrowStepAngleDeg;
            }
            else{
                newAngleDeg = pointer.angleDeg - data.arrowStepAngleDeg;
            }

            setPointer(pointer, newAngleDeg);
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
        data.arrowStepAngleDeg,
        pointer,
        setPointer,
        settings.disabled,
        settings.mousewheelDisabled,
    ]);

    const onMouseOver = () => {
        setIsMouseOver(true);
    };

    const onMouseOut = () => {
        setIsMouseOver(false);
    };

    return (
        <>
            {
                center &&
                <g
                    ref={ pointerRef }
                    transform={ `translate(${ center[0] - radius/2 }, ${ center[1] - radius/2 })` }

                    role="slider"
                    aria-disabled={ pointer.disabled ? true : undefined }
                    aria-valuenow={ pointer.angleDeg }
                    aria-valuetext={ value }
                    aria-label={ pointer.ariaLabel }

                    data-type="pointer"
                    className={ `mz-round-slider-pointer ${ pointer.disabled ? 'mz-round-slider-pointer-disabled' : '' }` }
                    data-angle={ pointer.angleDeg }
                    data-id={ pointer.id }
                    data-index={ pointer.index }

                    onMouseDown={ onMouseDown }
                    onKeyDown={ onKeyDown }
                    onMouseOver={ onMouseOver }
                    onMouseOut={ onMouseOut }
                    tabIndex={ 0 }

                    cursor={ pointer.disabled ? 'default' : 'pointer' }
                    style={ outlineNoneStyle }>

                    {
                        !settings.pointerSVG &&
                        <circle
                            cx={ radius/2 }
                            cy={ radius/2 }
                            r={ radius }
                            fill={ fill }
                            strokeWidth={ border }
                            stroke={ borderColor }
                            style={{
                                transition: '0.3s fill',
                            }}
                        />
                    }

                    {
                        settings.pointerSVG &&
                        <g>
                            { settings.pointerSVG }
                        </g>
                    }
                </g>
            }
        </>
    )
};

export default Pointer;