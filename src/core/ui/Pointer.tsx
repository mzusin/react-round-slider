import { IPointer } from '../interfaces';
import { CSSProperties, useEffect, useState } from 'react';
import { Vector2 } from 'mz-math';
import { getPointerPositionByPercent } from '../domain/slider-provider';
import { DEFAULT_POINTER_STYLE } from '../domain/defaults';

const Pointer = (props: IPointer) => {

    const {
        id, pointer, startEndAngle,
        svgRadii, svgCenter,
        pointerBgColor, pointerSVG,
        disabledPointerStyle,
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

    let pointerStyle: CSSProperties = {
        ...DEFAULT_POINTER_STYLE,
    };

    if(pointer.disabled) {
        pointerStyle = { ...pointerStyle, ...disabledPointerStyle };
    }

    return (
        center ?
            <>
                {
                    !pointerSVG &&
                    <ellipse
                        className={ pointer.disabled ? 'disabled' : undefined }
                        aria-disabled={ pointer.disabled ? true : undefined }
                        style={ pointerStyle }

                        data-type="pointer"
                        data-index={ pointer.index }
                        data-id={ id }
                        data-percent={ pointer.percent }

                        cx={ center[0] }
                        cy={ center[1]}
                        rx={ rx }
                        ry={ ry }

                        cursor="pointer"
                        tabIndex={ 0 }
                        role="slider"
                        fill={ pointerBgColor }
                    />
                }

                {
                    pointerSVG &&
                    <g
                        className={ pointer.disabled ? 'disabled' : undefined }
                        aria-disabled={ pointer.disabled ? true : undefined }
                        style={ pointerStyle }

                        data-type="pointer"
                        data-index={ pointer.index }
                        data-id={ id }
                        data-percent={ pointer.percent }

                        cursor="pointer"
                        transform={ `translate(${ center[0] - rx/2 }, ${ center[1] - ry/2 })` }
                        tabIndex={ 0 }
                        role="slider">
                        <g pointerEvents="none">
                            { pointerSVG }
                        </g>
                    </g>
                }
            </> : <></>
    )
};

export default Pointer;