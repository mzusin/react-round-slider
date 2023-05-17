import { IPanelFill, IStatePointer } from '../interfaces';
import { useAppSelector } from '../data/store';
import { useEffect, useState } from 'react';
import { getMinMaxPointer, getPointerPositionByPercent } from '../domain/slider-provider';
import { Vector2 } from 'mz-math';

export const PanelFill = (_props: IPanelFill) => {

    const angles = useAppSelector(store => store.slider.angles);
    const [ startAngleDegrees, endAngleDegrees ] = angles;

    const svgRadii = useAppSelector(store => store.slider.svgRadii);
    const svgCenter = useAppSelector(store => store.slider.svgCenter);
    const strokeWidth = useAppSelector(store => store.slider.strokeWidth);
    const connectionBgColor = useAppSelector(store => store.slider.connectionBgColor);
    const sliderStartPoint = useAppSelector(store => store.slider.sliderStartPoint);

    const pointers = useAppSelector(store => store.slider.pointers);

    const [panelFillStartPoint, setPanelFillStartPoint] = useState<Vector2|null>(null);
    const [panelFillEndPoint, setPanelFillEndPoint] = useState<Vector2|null>(null);
    const [largeArcFlag, setLargeArcFlag] = useState(0);

    useEffect(() => {

        if(!pointers || pointers.length <= 0) return;

        if(pointers.length <= 1){
            const pointer = pointers[0];

            const { position: center, angleDegrees } = getPointerPositionByPercent(
                pointer.percent,
                startAngleDegrees,
                endAngleDegrees,
                svgRadii,
                svgCenter
            );

            setPanelFillStartPoint(sliderStartPoint);
            setPanelFillEndPoint(center);
            setLargeArcFlag(Math.abs(angleDegrees - startAngleDegrees) <= 180 ? 0 : 1);
        }
        else{
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

            setPanelFillStartPoint(centerStart);
            setPanelFillEndPoint(centerEnd);
            setLargeArcFlag(Math.abs(angleDegreesEnd - angleDegreesStart) <= 180 ? 0 : 1);
        }

    }, [
        pointers,
        svgRadii, svgCenter,
        startAngleDegrees, endAngleDegrees,
    ]);

    return (
       <>
           {
               panelFillStartPoint !== null && panelFillEndPoint !== null &&
               <path
                   data-type="panel-fill"
                   d={ `M ${ panelFillStartPoint[0] } ${ panelFillStartPoint[1] } A ${ svgRadii[0] } ${ svgRadii[1] } 0 ${ largeArcFlag } 1 ${ panelFillEndPoint[0] } ${ panelFillEndPoint[1] }` }
                   stroke={ connectionBgColor }
                   strokeWidth={ strokeWidth + 1 }
                   fill="none"
                   shapeRendering="geometricPrecision"
                   strokeLinecap="round"
                   cursor="pointer"
               />
           }
       </>
    )
};