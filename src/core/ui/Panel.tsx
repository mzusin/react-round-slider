import { forwardRef, LegacyRef } from 'react';
import { IPanel } from '../interfaces';

const Panel = (props: IPanel, sliderRef: LegacyRef<SVGPathElement|null>) => {

    const  { ellipse, strokeWidth, svgRadii, bgColor } = props;
    const { start, end, largeArcFlag } = ellipse;

    return (
        <path
            data-type="panel"
            ref={ sliderRef }
            d={ `M ${ start[0] } ${ start[1] } A ${ svgRadii[0] } ${ svgRadii[1] } 0 ${ largeArcFlag } 1 ${ end[0] } ${ end[1] }` }
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