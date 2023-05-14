import { IPointer } from '../interfaces';
import { useEffect, useState } from 'react';
import { getPointerPositionByPercent } from '../domain/slider-provider';
import { Vector2 } from 'mz-math';
import { useAppSelector } from '../data/store';

export const Pointer = (props: IPointer) => {

    const { pointer } = props;
    const { percent } = pointer;
    const [ rx, ry ] = pointer.pointerRadii;

    const [center, setCenter] = useState<Vector2|null>(null);

    const angles = useAppSelector(store => store.slider.angles);
    const [ startAngleDegrees, endAngleDegrees ] = angles;

    const svgRadii = useAppSelector(store => store.slider.svgRadii);
    const svgCenter = useAppSelector(store => store.slider.svgCenter);

    useEffect(() => {

        const center = getPointerPositionByPercent(
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
                cx={ center[0] }
                cy={ center[1]}
                rx={ rx }
                ry={ ry }
                cursor="pointer"
                fill="#000"
            /> : <></>
    )
};