import { ISettings } from '../domain/settings-provider';
import { getSliderState } from '../domain/svg-provider';

export interface ISlider {
    settings: ISettings
}

export const Slider = (props: ISlider) => {

    const { settings } = props;

    const sliderState = getSliderState(settings);
    const { start, end, angle, largeArcFlag, sweepFlag } = sliderState;

    return (
        <path
            d={ `M ${ start[0] } ${ start[1] } A ${ settings.svgRadii[0] } ${ settings.svgRadii[0] } ${ angle } ${ largeArcFlag } ${ sweepFlag } ${ end[0] } ${ end[1] }` }
            stroke={ settings.bgColor }
            strokeWidth={ settings.strokeWidth }
            fill="none"
            shapeRendering="geometricPrecision"
            strokeLinecap="round"
            cursor="pointer"
        />
    )
};