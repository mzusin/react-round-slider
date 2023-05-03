import { MouseEvent as ReactMouseEvent, useContext, TouchEvent as ReactTouchEvent } from 'react';
import { SettingsContext } from '../domain/settings-provider';

export const Slider = () => {

    const settings = useContext(SettingsContext);

    const {
        sliderStartPoint, sliderEndPoint,
        largeArcFlag, svgRadii,
        bgColor, strokeWidth
    } = settings;

    const onValueChange = (evt: MouseEvent | ReactMouseEvent | TouchEvent | ReactTouchEvent) => {

        console.log(evt);

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
            d={ `M ${ sliderStartPoint[0] } ${ sliderStartPoint[1] } A ${ svgRadii[0] } ${ svgRadii[0] } 0 ${ largeArcFlag } 1 ${ sliderEndPoint[0] } ${ sliderEndPoint[1] }` }
            stroke={ bgColor }
            strokeWidth={ strokeWidth }
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