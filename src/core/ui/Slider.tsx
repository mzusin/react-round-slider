import { ISettings } from '../domain/settings-provider';
import { getSliderState } from '../domain/svg-provider';
import { MouseEvent as  ReactMouseEvent } from 'react';

export interface ISlider {
    settings: ISettings
}

export const Slider = (props: ISlider) => {

    const { settings } = props;

    const sliderState = getSliderState(settings);

    const { start, end, angle, largeArcFlag, sweepFlag } = sliderState;

    const onValueChange = (evt: MouseEvent | ReactMouseEvent | TouchEvent) => {

        //if(!svgRef || !svgRef.current || !handleRef || !handleRef.current) return;

        //const bounds = svgRef.current.getBoundingClientRect();

        // find the percent [0, 100] of the current mouse position in slider path
        /*const mouseX = evt.type.indexOf('mouse') !== -1 ? (evt as MouseEvent).clientX : (evt as TouchEvent).touches[0].clientX;
        const mouseY = evt.type.indexOf('mouse') !== -1 ? (evt as MouseEvent).clientY : (evt as TouchEvent).touches[0].clientY;*/

        //console.log(mouseX, mouseY);
    }

    const onMouseDown = (evt: MouseEvent | ReactMouseEvent) => {
        if (evt.preventDefault) {
            evt.preventDefault();
        }

        onValueChange(evt);

        window.addEventListener('mousemove', onValueChange);
        window.addEventListener('mouseup', onMouseUp);
    };

    const onMouseUp = (_evt: MouseEvent | ReactMouseEvent) => {
        window.removeEventListener('mousemove', onValueChange);
        window.removeEventListener('mouseup', onValueChange);
    };

    return (
        <path
            d={ `M ${ start[0] } ${ start[1] } A ${ settings.svgRadii[0] } ${ settings.svgRadii[0] } ${ angle } ${ largeArcFlag } ${ sweepFlag } ${ end[0] } ${ end[1] }` }
            stroke={ settings.bgColor }
            strokeWidth={ settings.strokeWidth }
            fill="none"
            shapeRendering="geometricPrecision"
            strokeLinecap="round"
            cursor="pointer"
            onMouseDown={ onMouseDown }
            onMouseUp={ onMouseUp }
            onTouchMove={ onValueChange }
            onTouchStart={ onValueChange }
        />
    )
};