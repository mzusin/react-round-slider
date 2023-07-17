import { ISettings } from '../domain/settings-provider';
import { getBoolean, getNumber, getString } from '../domain/common-provider';
import {
    DEFAULT_ANIMATION_DURATION,
    DEFAULT_CONNECTION_BG_COLOR,
    DEFAULT_CONNECTION_BG_COLOR_DISABLED
} from '../domain/defaults-provider';
import {
    getAngleByMouse,
    getClosestPointer,
    getMinMaxDistancePointers,
    IPointer,
    IPointers
} from '../domain/pointers-provider';
import {
    MouseEvent as ReactMouseEvent,
    useCallback,
    useEffect, useRef,
    useState
} from 'react';
import { getConnection, IConnection } from '../domain/connection-provider';
import { ISvg } from '../domain/svg-provider';
import { IData } from '../domain/data-provider';
import { animate, IAnimationResult, mod } from 'mz-math';
import { getAnimationProgressAngle } from '../domain/animation-provider';

interface IConnectionProps {
    settings: ISettings;
    pointers: IPointers;
    svg: ISvg;
    $svg: SVGSVGElement;
    data: IData;
    setPointer: (pointer: IPointer, newAngleDeg: number) => void;
}

const getStroke = (
    disabled: boolean,
    connectionBgColorDisabled: string,
    connectionBgColor: string,
    isMouseOver: boolean,
    connectionBgColorHover: string
) => {
    if(disabled) return getString(connectionBgColorDisabled, DEFAULT_CONNECTION_BG_COLOR_DISABLED);

    const bgColor = getString(connectionBgColor, DEFAULT_CONNECTION_BG_COLOR);

    if(isMouseOver) {
        return getString(connectionBgColorHover, bgColor);
    }

    return bgColor;
};

const Connection = (props: IConnectionProps) => {

    const { settings, pointers, $svg, svg, data, setPointer } = props;

    const [ connection, setConnection ] = useState<IConnection|null>(null);
    const [ animation, setAnimation ] = useState<IAnimationResult|null>(null);
    const [ stroke, setStroke ] = useState(DEFAULT_CONNECTION_BG_COLOR);
    const [ isMouseOver, setIsMouseOver ] = useState(false);

    const rangeDraggingLastAngle = useRef<number>();
    const animationClosestPointer = useRef<IPointer|null>(null);
    const animationSourceDegrees = useRef(0);
    const animationTargetDegrees = useRef(0);

    useEffect(() => {
        setStroke(getStroke(
            settings.disabled,
            settings.connectionBgColorDisabled,
            settings.connectionBgColor,
            isMouseOver,
            settings.connectionBgColorHover
        ));
    }, [
        settings.disabled,
        settings.connectionBgColorDisabled,
        settings.connectionBgColor,
        settings.connectionBgColorHover,
        isMouseOver,
    ]);

    useEffect(() => {
        setConnection(getConnection(
            pointers,
            svg.radius,
            svg.cx,
            svg.cy,
            svg.startAngleDeg,
            svg.endAngleDeg
        ));
    }, [
        pointers,
        svg.radius,
        svg.cx,
        svg.cy,
        svg.startAngleDeg,
        svg.endAngleDeg
    ]);

    const onClick = (evt: ReactMouseEvent) => {

        if(!$svg || settings.disabled || (animation && animation.isAnimating())) return;

        const degrees = getAngleByMouse(
            $svg,
            evt.clientX,
            evt.clientY,
            svg.cx,
            svg.cy,
            svg.radius,
            svg.radius
        );

        const closestPointer = getClosestPointer(
            pointers.pointers,
            degrees,
            svg.cx,
            svg.cy,
            svg.radius
        );

        if(!closestPointer) return;

        if(settings.animateOnClick) {
            animationClosestPointer.current = closestPointer;
            animationSourceDegrees.current = closestPointer.angleDeg;
            animationTargetDegrees.current = degrees;
            animation?.start();
        }
        else{
            setPointer(closestPointer, degrees);
        }
    };

    // RANGE DRAGGING -------------------------------------------

    const onValueChange = useCallback((evt: MouseEvent | ReactMouseEvent) => {
        if(!$svg || settings.disabled || !settings.rangeDragging) return;

        const minMaxResult = getMinMaxDistancePointers(pointers.pointers, svg.startAngleDeg);
        if(!minMaxResult) return;

        const [ minPointer, maxPointer ] = minMaxResult;

        const mouseDegrees = getAngleByMouse(
            $svg,
            evt.clientX,
            evt.clientY,
            svg.cx,
            svg.cy,
            svg.radius,
            svg.radius
        );

        if(rangeDraggingLastAngle.current === undefined) {
            rangeDraggingLastAngle.current = mouseDegrees;
            return;
        }

        const diff = (mouseDegrees - rangeDraggingLastAngle.current);
        if(diff === 0 || Math.abs(diff) < data.stepAngleDeg) return;

        setPointer(minPointer, mod(minPointer.angleDeg + diff, 360));
        setPointer(maxPointer, mod(maxPointer.angleDeg + diff, 360));

        rangeDraggingLastAngle.current = mouseDegrees;
    }, [
        $svg,
        svg.cx,
        svg.cy,
        svg.radius,
        data.stepAngleDeg,
        pointers.pointers,
        setPointer,
        settings.disabled,
        settings.rangeDragging,
        svg.startAngleDeg,
    ]);

    const onMouseUp = () => {
        window.removeEventListener('mousemove', onValueChange);
        window.removeEventListener('mouseup', onValueChange);

        rangeDraggingLastAngle.current = undefined;
    };

    const onMouseDown = (evt: ReactMouseEvent) => {
        if(!settings.rangeDragging || settings.disabled || pointers.pointers.length <= 1) return;

        onValueChange(evt);

        window.addEventListener('mousemove', onValueChange);
        window.addEventListener('mouseup', onMouseUp);
    };

    // ANIMATE ON CLICK -------------------------------------------
    useEffect(() => {
        if(animation) {
            animation.stop();
        }

        if(!settings.animateOnClick) {
            setAnimation(null);
            return;
        }

        const _animation = animate({
            callback: (progress) => {
                if(!animationClosestPointer.current) return;
                const currentDegrees = getAnimationProgressAngle(
                    progress,
                    animationSourceDegrees.current,
                    animationTargetDegrees.current,
                    svg.startAngleDeg
                );
                setPointer(animationClosestPointer.current, currentDegrees);
            },
            duration: getNumber(settings.animationDuration, DEFAULT_ANIMATION_DURATION),
        });

        setAnimation(_animation);

    },
        // eslint-disable-next-line
        [
        settings.animateOnClick,
        settings.animationDuration,
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
                !getBoolean(settings.hideConnection, false) && connection &&
                <circle
                    data-type="connection"
                    className="mz-round-slider-connection"

                    cx={ connection.cx }
                    cy={ connection.cy }
                    r={ connection.radius }

                    strokeDasharray={ connection.strokeDasharray.join(' ') }
                    strokeDashoffset={ connection.strokeOffset }
                    stroke={ stroke }
                    strokeWidth={ svg.thickness + 1 }

                    fill="none"
                    shapeRendering="geometricPrecision"
                    strokeLinecap="round"
                    cursor={ settings.disabled ? 'default' : 'pointer' }

                    onClick={ onClick }
                    onMouseDown={ onMouseDown }
                    onMouseOver={ onMouseOver }
                    onMouseOut={ onMouseOut }

                    style={{
                        transition: '0.2s stroke',
                    }}
                />
            }
        </>
    )
};

export default Connection;