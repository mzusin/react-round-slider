import { useEffect, useState, MouseEvent, useRef } from 'react';
import { getCircle, ICircle } from '../domain/circle-provider';
import { getNumber, getString } from '../domain/common-provider';
import { ISettings } from '../domain/settings-provider';
import {
    DEFAULT_ANIMATION_DURATION,
    DEFAULT_PATH_BG_COLOR,
    DEFAULT_PATH_BORDER_COLOR,
} from '../domain/defaults-provider';
import { ISvg } from '../domain/svg-provider';
import { getAngleByMouse, getClosestPointer, IPointer, IPointers } from '../domain/pointers-provider';
import { animate, IAnimationResult, newId } from 'mz-math';
import { getAnimationProgressAngle } from '../domain/animation-provider';
import InnerCircle from './InnerCircle';

interface ICircleProps {
    settings: ISettings;
    pointers: IPointers;
    svg: ISvg;
    $svg: SVGSVGElement;
    setPointer: (pointer: IPointer, newAngleDeg: number) => void;
}

const Circle = (props: ICircleProps) => {

    const { settings, pointers, $svg, svg, setPointer } = props;

    const [ animation, setAnimation ] = useState<IAnimationResult|null>(null);
    const [ maskId ] = useState(newId());
    const [ circle, setCircle ] = useState<ICircle>({
        strokeDasharray: '0 1000000',
        strokeOffset: 0,
    });

    const animationClosestPointer = useRef<IPointer|null>(null);
    const animationSourceDegrees = useRef(0);
    const animationTargetDegrees = useRef(0);

    useEffect(() => {
        setCircle(getCircle(
            svg.startAngleDeg,
            svg.endAngleDeg,
            svg.radius
        ));
    }, [
        svg.startAngleDeg,
        svg.endAngleDeg,
        svg.radius,
    ]);

    const onClick = (evt: MouseEvent) => {
        if(!$svg || settings.disabled || (animation && animation.isAnimating())) return;

        const degrees = getAngleByMouse(
            $svg,
            evt.clientX,
            evt.clientY,
            svg.cx,
            svg.cy,
            svg.radius,
            svg.radius
        );

        const closestPointer = getClosestPointer(
            pointers.pointers,
            degrees,
            svg.cx,
            svg.cy,
            svg.radius
        );

        if(!closestPointer) return;

        if(settings.animateOnClick) {
            animationClosestPointer.current = closestPointer;
            animationSourceDegrees.current = closestPointer.angleDeg;
            animationTargetDegrees.current = degrees;
            animation?.start();
        }
        else{
            setPointer(closestPointer, degrees);
        }
    };

    // ANIMATE ON CLICK -------------------------------------------
    useEffect(() => {
        if(animation) {
            animation.stop();
        }

        if(!settings.animateOnClick) {
            setAnimation(null);
            return;
        }

        const _animation = animate({
            callback: (progress) => {
                if(!animationClosestPointer.current) return;
                const currentDegrees = getAnimationProgressAngle(
                    progress,
                    animationSourceDegrees.current,
                    animationTargetDegrees.current,
                    svg.startAngleDeg
                );
                setPointer(animationClosestPointer.current, currentDegrees);
            },
            duration: getNumber(settings.animationDuration, DEFAULT_ANIMATION_DURATION),
        });

        setAnimation(_animation);
    },
        // eslint-disable-next-line
        [
        settings.animateOnClick,
        settings.animationDuration,
    ]);

    return (
        <g onClick={ onClick }>

            {
                settings.pathInnerBgColor &&
                <InnerCircle
                    maskId={ maskId }
                    settings={ settings }
                    svg={ svg }
                    circle={ circle }
                />
            }

            {
                svg.border > 0 &&
                <circle
                    strokeDasharray={ circle.strokeDasharray }
                    strokeDashoffset={ circle.strokeOffset }
                    cx={ svg.cx }
                    cy={ svg.cy }
                    r={ svg.radius }
                    stroke={ getString(settings.pathBorderColor, DEFAULT_PATH_BORDER_COLOR) }
                    strokeWidth={ svg.thickness + svg.border * 2 }
                    fill="none"
                    shapeRendering="geometricPrecision"
                    strokeLinecap="round"
                    cursor="pointer"
                    data-type="path-border"
                    className="mz-round-slider-path-border"
                />
            }

            <circle
                strokeDasharray={ circle.strokeDasharray }
                strokeDashoffset={ circle.strokeOffset }
                cx={ svg.cx }
                cy={ svg.cy }
                r={ svg.radius }
                stroke={ getString(settings.pathBgColor, DEFAULT_PATH_BG_COLOR) }
                strokeWidth={ svg.thickness }
                fill="none"
                shapeRendering="geometricPrecision"
                strokeLinecap="round"
                cursor="pointer"
                data-type="path"
                className="mz-round-slider-path"
            />
        </g>
    )
};

export default Circle;
