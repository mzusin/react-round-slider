import { IConnection, IStatePointer } from '../interfaces';
import { useEffect, useState } from 'react';
import { getMinMaxPointer, getPointerPositionByPercent } from '../domain/slider-provider';
import { Vector2 } from 'mz-math';

const Connection = (props: IConnection) => {

    const  {
        pointers, ellipse, strokeWidth, svgCenter,
        svgRadii, connectionBgColor, startEndAngle,
    } = props;
    const { start } = ellipse;

    const [ startAngleDegrees, endAngleDegrees ] = startEndAngle;

    const [ connectionStartPoint, setConnectionStartPoint ] = useState<Vector2|null>(null);
    const [ connectionEndPoint, setConnectionEndPoint ] = useState<Vector2|null>(null);
    const [ connectionLargeArcFlag, setConnectionLargeArcFlag] = useState(0);

    useEffect(() => {
        if(!pointers || pointers.length <= 0) return;

        // Slider has only 1 pointer.
        if(pointers.length <= 1){
            const pointer = pointers[0];

            const { position: center, angleDegrees } = getPointerPositionByPercent(
                pointer.percent,
                startAngleDegrees,
                endAngleDegrees,
                svgRadii,
                svgCenter
            );

            setConnectionStartPoint(start);
            setConnectionEndPoint(center);
            setConnectionLargeArcFlag(Math.abs(angleDegrees - startAngleDegrees) <= 180 ? 0 : 1);
            return;
        }

        // Slider has multiple pointers.
        const minMax = getMinMaxPointer(pointers);
        if(minMax === null) return;

        const minPointer: IStatePointer = minMax[0];
        const maxPointer: IStatePointer = minMax[1];

        const { position: centerStart, angleDegrees: angleDegreesStart } = getPointerPositionByPercent(
            minPointer.percent,
            startAngleDegrees,
            endAngleDegrees,
            svgRadii,
            svgCenter
        );

        const { position: centerEnd, angleDegrees: angleDegreesEnd } = getPointerPositionByPercent(
            maxPointer.percent,
            startAngleDegrees,
            endAngleDegrees,
            svgRadii,
            svgCenter
        );

        setConnectionStartPoint(centerStart);
        setConnectionEndPoint(centerEnd);
        setConnectionLargeArcFlag(Math.abs(angleDegreesEnd - angleDegreesStart) <= 180 ? 0 : 1);
    }, [
        endAngleDegrees,
        pointers,
        start,
        startAngleDegrees,
        svgCenter,
        svgRadii,
    ]);

    return (
        <>
            {
                connectionStartPoint !== null && connectionEndPoint !== null &&
                <path
                    data-type="panel-fill"
                    d={ `M ${ connectionStartPoint[0] } ${ connectionStartPoint[1] } A ${ svgRadii[0] } ${ svgRadii[1] } 0 ${ connectionLargeArcFlag } 1 ${ connectionEndPoint[0] } ${ connectionEndPoint[1] }` }
                    stroke={ connectionBgColor }
                    strokeWidth={ strokeWidth + 1 }
                    fill="none"
                    shapeRendering="geometricPrecision"
                    strokeLinecap="round"
                    cursor="pointer"
                    pointerEvents="none"
                />
            }
        </>
    )
};

export default Connection;