import { forwardRef, LegacyRef } from 'react';
import { useAppSelector } from '../data/store';
import { IPanel } from '../interfaces';

const Panel = (_props: IPanel, sliderRef: LegacyRef<SVGPathElement|null>) => {
    const sliderStartPoint = useAppSelector(store => store.slider.sliderStartPoint);
    const sliderEndPoint = useAppSelector(store => store.slider.sliderEndPoint);
    const largeArcFlag = useAppSelector(store => store.slider.largeArcFlag);
    const bgColor = useAppSelector(store => store.slider.bgColor);
    const strokeWidth = useAppSelector(store => store.slider.strokeWidth);
    const svgRadii = useAppSelector(store => store.slider.svgRadii);

    return (
        <path
            data-type="panel"
            ref={ sliderRef }
            d={ `M ${ sliderStartPoint[0] } ${ sliderStartPoint[1] } A ${ svgRadii[0] } ${ svgRadii[1] } 0 ${ largeArcFlag } 1 ${ sliderEndPoint[0] } ${ sliderEndPoint[1] }` }
            stroke={ bgColor }
            strokeWidth={ strokeWidth }
            fill="none"
            shapeRendering="geometricPrecision"
            strokeLinecap="round"
            cursor="pointer"
        />
    )
};

export default forwardRef(Panel);