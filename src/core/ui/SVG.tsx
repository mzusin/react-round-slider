import { useEffect } from 'react';
import { getEllipseSegment, getSVGCenter, getSVGSize } from '../domain/svg-provider';
import { Vector2 } from 'mz-math';
import { useAppDispatch, useAppSelector } from '../data/store';
import { getNumber, getString } from '../domain/common';
import {
    DEFAULT_BG_COLOR,
    DEFAULT_POINTER_RX, DEFAULT_POINTER_RY,
    DEFAULT_STROKE_WIDTH,
    DEFAULT_SVG_RX,
    DEFAULT_SVG_RY
} from '../domain/defaults';
import { normalizeAngles } from '../domain/angles-provider';
import { IStatePointer, IUserSettings } from '../interfaces';
import { sliderActions } from '../data/slider-slice';
import { Slider } from './Slider';

const getMaxPointer = (pointers: IStatePointer[]) : Vector2 => {
    let maxX = -Infinity;
    let maxY = -Infinity;

    for(const pointer of pointers){
        const [rx, ry] =  pointer.pointerRadii;
        maxX = Math.max(maxX, rx);
        maxY = Math.max(maxY, ry);
    }

    return [
        maxX,
        maxY,
    ];
};

export const SVG = (props: IUserSettings) => {

  const pointers = useAppSelector(store => store.slider.pointers);

    const dispatch = useAppDispatch();

    /**
     * Combine user settings with the defaults,
     * and init slider state properties.
     */
    useEffect(() => {
        // Define initial SVG circle/ellipse radii.
        const svgRadii: Vector2 = [
            getNumber(props.rx, DEFAULT_SVG_RX),
            getNumber(props.ry, DEFAULT_SVG_RY)
        ];

        // Define ellipse/circle segment using angles defined in degrees.
        const [startAngleDegrees, endAngleDegrees] = normalizeAngles(props.startAngleDegrees, props.endAngleDegrees);
        const angles: Vector2 = [startAngleDegrees, endAngleDegrees];

        const strokeWidth = getNumber(props.strokeWidth, DEFAULT_STROKE_WIDTH);
        const bgColor = getString(props.bgColor, DEFAULT_BG_COLOR);

        // Convert user provided pointers settings to the actual state pointers' definition.
        const _pointers = props.pointers ? props.pointers.map(pointer => {
            return {
                pointerRadii: [
                    getNumber(pointer.rx, DEFAULT_POINTER_RX),
                    getNumber(pointer.ry, DEFAULT_POINTER_RY),
                ]
            } as IStatePointer;
        }) : pointers;

        const maxPointer: Vector2 = getMaxPointer(_pointers);
        const svgSize: Vector2 = getSVGSize(svgRadii, maxPointer, strokeWidth);
        const svgCenter: Vector2 = getSVGCenter(svgRadii, maxPointer, strokeWidth);

        const { sliderStartPoint, sliderEndPoint, largeArcFlag } = getEllipseSegment(
            startAngleDegrees,
            endAngleDegrees,
            svgRadii,
            maxPointer,
            strokeWidth
        );

        const pointerPositions: Vector2[] = _pointers.map(_pointer => {
            return sliderStartPoint
        });

        dispatch(
            sliderActions.initUserSettings({
                // svg look & feel properties ---------
                svgRadii,
                angles,
                strokeWidth,
                bgColor,

                // pointers ----------------------------
                pointers: _pointers,
                pointerPositions,

                // calculated properties ---------------
                svgSize,
                svgCenter,
                sliderStartPoint,
                sliderEndPoint,
                largeArcFlag,
            })
        );
    }, []);

    return (
        <Slider />
    )
};