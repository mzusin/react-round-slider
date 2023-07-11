import { useEffect, useState, MouseEvent } from 'react';
import { getCircle, ICircle } from '../domain/circle-provider';
import { getString } from '../domain/common-provider';
import { ISettings } from '../domain/settings-provider';
import {
    DEFAULT_PATH_BG_COLOR,
    DEFAULT_PATH_BORDER_COLOR,
} from '../domain/defaults-provider';
import { ISvg } from '../domain/svg-provider';
import { getAngleByMouse, getClosestPointer, IPointer, IPointers } from '../domain/pointers-provider';

interface ICircleProps {
    settings: ISettings;
    pointers: IPointers;
    svg: ISvg;
    $svg: SVGSVGElement;
    setPointer: (updatedPointer: IPointer) => void;
}

const Circle = (props: ICircleProps) => {

    const { settings, pointers, $svg, svg, setPointer } = props;
    const [ circle, setCircle ] = useState<ICircle>({
        strokeDasharray: '0 1000000',
        strokeOffset: 0,
    });

    useEffect(() => {
        setCircle(getCircle(
            svg.startAngleDeg,
            svg.endAngleDeg,
            svg.radius
        ));
    }, [
        svg.startAngleDeg,
        svg.endAngleDeg,
        svg.radius,
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
        <g onClick={ onClick }>
            {
                svg.border > 0 &&
                <circle
                    strokeDasharray={ circle.strokeDasharray }
                    strokeDashoffset={ circle.strokeOffset }
                    cx={ svg.cx }
                    cy={ svg.cy }
                    r={ svg.radius }
                    stroke={ getString(settings.pathBorderColor, DEFAULT_PATH_BORDER_COLOR) }
                    strokeWidth={ svg.thickness + svg.border * 2 }
                    fill="none"
                    shapeRendering="geometricPrecision"
                    strokeLinecap="round"
                    cursor="pointer"
                    data-type="path-border"
                />
            }

            <circle
                strokeDasharray={ circle.strokeDasharray }
                strokeDashoffset={ circle.strokeOffset }
                cx={ svg.cx }
                cy={ svg.cy }
                r={ svg.radius }
                stroke={ getString(settings.pathBgColor, DEFAULT_PATH_BG_COLOR) }
                strokeWidth={ svg.thickness }
                fill="none"
                shapeRendering="geometricPrecision"
                strokeLinecap="round"
                cursor="pointer"
                data-type="path"
            />
        </g>
    )
};

export default Circle;
