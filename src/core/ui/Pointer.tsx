import { IPointer } from '../interfaces';
import { useEffect, useState } from 'react';
import { Vector2 } from 'mz-math';
import { getPointerPositionByPercent } from '../domain/slider-provider';

const Pointer = (props: IPointer) => {

    const {
        id, pointer, startEndAngle,
        svgRadii, svgCenter,
    } = props;
    const { percent, pointerRadii } = pointer;
    const [ rx, ry ] = pointerRadii;
    const [ startAngleDegrees, endAngleDegrees ] = startEndAngle;

    const [ center, setCenter ] = useState<Vector2|null>(null);

    /**
     * User provides pointer values that are transformed to percents.
     * These percents should be transformed to the positions on the SVG arc.
     */
    useEffect(() => {

        const { position: center } = getPointerPositionByPercent(
            percent,
            startAngleDegrees,
            endAngleDegrees,
            svgRadii,
            svgCenter
        );

        setCenter(center);

    }, [
        percent,
        svgRadii, svgCenter,
        startAngleDegrees, endAngleDegrees,
    ]);

    return (
        center ?
            <ellipse
                data-type="pointer"
                data-index={ pointer.index }
                data-id={ id }
                cx={ center[0] }
                cy={ center[1]}
                rx={ rx }
                ry={ ry }
                cursor="pointer"
                fill="#000"
            /> : <></>
    )
};

export default Pointer;