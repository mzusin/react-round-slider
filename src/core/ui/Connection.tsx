import { ISettings } from '../domain/settings-provider';
import { getBoolean, getString } from '../domain/common-provider';
import { DEFAULT_CONNECTION_BG_COLOR, DEFAULT_CONNECTION_BG_COLOR_DISABLED } from '../domain/defaults-provider';
import { getAngleByMouse, getClosestPointer, IPointer, IPointers } from '../domain/pointers-provider';
import { MouseEvent, useEffect, useState } from 'react';
import { getConnection, IConnection } from '../domain/connection-provider';
import { ISvg } from '../domain/svg-provider';

interface IConnectionProps {
    settings: ISettings;
    pointers: IPointers;
    svg: ISvg;
    $svg: SVGSVGElement;
    setPointer: (updatedPointer: IPointer) => void;
}

const Connection = (props: IConnectionProps) => {

    const { settings, pointers, $svg, svg, setPointer } = props;

    const [ connection, setConnection ] = useState<IConnection|null>(null);

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

    const onClick = (evt: MouseEvent) => {
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

        closestPointer.angleDeg = degrees;
        setPointer(closestPointer);
    };

    return (
        <>
            {
                !getBoolean(settings.hideConnection, false) && connection &&
                <circle
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
                    data-type="connection"
                />
            }
        </>
    )
};

export default Connection;