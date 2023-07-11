import { ISettings } from '../domain/settings-provider';
import { getBoolean, getString } from '../domain/common-provider';
import { DEFAULT_CONNECTION_BG_COLOR, DEFAULT_CONNECTION_BG_COLOR_DISABLED } from '../domain/defaults-provider';
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

interface IConnectionProps {
    settings: ISettings;
    pointers: IPointers;
    svg: ISvg;
    $svg: SVGSVGElement;
    data: IData;
    setPointer: (pointer: IPointer, newAngleDeg: number) => void;
}

const Connection = (props: IConnectionProps) => {

    const { settings, pointers, $svg, svg, data, setPointer } = props;

    const [ connection, setConnection ] = useState<IConnection|null>(null);

    const rangeDraggingLastAngle = useRef<number>();

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
        if(!$svg || settings.disabled) return;

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

        setPointer(closestPointer, degrees);
    };

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

        if(rangeDraggingLastAngle.current !== undefined){
            const diff = (mouseDegrees - rangeDraggingLastAngle.current);

            const startAngleDeg = svg.startAngleDeg;
            let endAngleDeg = svg.endAngleDeg;
            if(endAngleDeg < endAngleDeg) endAngleDeg += 360;

            const range = Math.abs(endAngleDeg - startAngleDeg);
            if(diff !== 0 && Math.abs(diff) !== range) {

                const isClockwise = Math.abs(diff) > range ? diff < 0 : diff > 0;
                if(isClockwise) {
                    setPointer(minPointer, minPointer.angleDeg + data.stepAngleDeg);
                    setPointer(maxPointer, maxPointer.angleDeg + data.stepAngleDeg);
                }
                else{
                    setPointer(minPointer, minPointer.angleDeg - data.stepAngleDeg);
                    setPointer(maxPointer, maxPointer.angleDeg - data.stepAngleDeg);
                }
            }
        }

        rangeDraggingLastAngle.current = mouseDegrees;
    }, [
        $svg,
        svg.cx,
        svg.cy,
        svg.radius,
        svg.startAngleDeg,
        svg.endAngleDeg,
        settings.disabled,
        data.stepAngleDeg,
        pointers.pointers,
        setPointer,
        rangeDraggingLastAngle,
        settings.rangeDragging,
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

    return (
        <>
            {
                !getBoolean(settings.hideConnection, false) && connection &&
                <circle
                    data-type="connection"

                    cx={ connection.cx }
                    cy={ connection.cy }
                    r={ connection.radius }

                    strokeDasharray={ connection.strokeDasharray.join(' ') }
                    strokeDashoffset={ connection.strokeOffset }
                    stroke={
                        settings.disabled ?
                        getString(settings.connectionBgColorDisabled, DEFAULT_CONNECTION_BG_COLOR_DISABLED) :
                        getString(settings.connectionBgColor, DEFAULT_CONNECTION_BG_COLOR)
                    }
                    strokeWidth={ svg.thickness + 1 }

                    fill="none"
                    shapeRendering="geometricPrecision"
                    strokeLinecap="round"
                    cursor={ settings.disabled ? 'default' : 'pointer' }

                    onClick={ onClick }
                    onMouseDown={ onMouseDown }
                />
            }
        </>
    )
};

export default Connection;