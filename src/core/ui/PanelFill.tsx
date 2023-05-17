import { IPanelFill } from '../interfaces';
import { useAppSelector } from '../data/store';
import { useEffect, useState } from 'react';
import { getPointerPositionByPercent } from '../domain/slider-provider';
import { Vector2 } from 'mz-math';

export const PanelFill = (_props: IPanelFill) => {

    const angles = useAppSelector(store => store.slider.angles);
    const [ startAngleDegrees, endAngleDegrees ] = angles;

    const svgRadii = useAppSelector(store => store.slider.svgRadii);
    const svgCenter = useAppSelector(store => store.slider.svgCenter);
    const strokeWidth = useAppSelector(store => store.slider.strokeWidth);

    const sliderStartPoint = useAppSelector(store => store.slider.sliderStartPoint);

    const bgColor = 'red'; // TODO

    const pointers = useAppSelector(store => store.slider.pointers);

    const [panelFillEndPoint, setPanelFillEndPoint] = useState<Vector2>(sliderStartPoint);
    const [largeArcFlag, setLargeArcFlag] = useState(0);

    useEffect(() => {

        if(!pointers || pointers.length <= 0) return;

        const pointer = pointers[0];

        const { position: center, angleDegrees } = getPointerPositionByPercent(
            pointer.percent,
            startAngleDegrees,
            endAngleDegrees,
            svgRadii,
            svgCenter
        );

        setPanelFillEndPoint(center);
        setLargeArcFlag(angleDegrees - startAngleDegrees <= 180 ? 0 : 1);

    }, [
        pointers,
        svgRadii, svgCenter,
        startAngleDegrees, endAngleDegrees,
    ]);

    return (
        <path
            data-type="panel-fill"
            d={ `M ${ sliderStartPoint[0] } ${ sliderStartPoint[1] } A ${ svgRadii[0] } ${ svgRadii[1] } 0 ${ largeArcFlag } 1 ${ panelFillEndPoint[0] } ${ panelFillEndPoint[1] }` }
            stroke={ bgColor }
            strokeWidth={ strokeWidth }
            fill="none"
            shapeRendering="geometricPrecision"
            strokeLinecap="round"
            cursor="pointer"
        />
    )
};