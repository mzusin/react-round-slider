import { ISvg } from '../domain/svg-provider';
import { ISettings } from '../domain/settings-provider';
import { ICircle } from '../domain/circle-provider';
import { useEffect, useState } from 'react';
import { circleMovement, convertRange, degreesToRadians, mod, Vector2 } from 'mz-math';
import { getBoolean } from '../domain/common-provider';

interface IInnerCircleProps {
    maskId: string;
    settings: ISettings;
    svg: ISvg;
    circle: ICircle;
}

const InnerCircle = (props: IInnerCircleProps) => {

    const { svg, maskId, settings, circle } = props;

    const [ startPoint, setStartPoint ] = useState<Vector2>([0, 0]);
    const [ endPoint, setEndPoint ] = useState<Vector2>([0, 0]);
    const [ largeArcFlag, setLargeArcFlag ] = useState(0);
    const [ pathInnerBgFull, setPathInnerBgFull] = useState(false);

    useEffect(() => {
        if(mod(svg.startAngleDeg, 360) === mod(svg.endAngleDeg, 360)) {
            setPathInnerBgFull(true);
            return;
        }

        setPathInnerBgFull(getBoolean(settings.pathInnerBgFull, false));
    }, [
        settings.pathInnerBgFull,
        svg.startAngleDeg,
        svg.endAngleDeg,
    ]);

    useEffect(() => {
        const startAngleDeg = convertRange(svg.startAngleDeg, 0, Math.PI*2, 0, Math.PI);
        setStartPoint(circleMovement([svg.cx, svg.cy], degreesToRadians(startAngleDeg), svg.radius));

        const endAngleDeg = convertRange(svg.endAngleDeg, 0, Math.PI*2, 0, Math.PI);
        setEndPoint(circleMovement([svg.cx, svg.cy], degreesToRadians(endAngleDeg), svg.radius));

        const largeArcFlag = svg.endAngleDeg - svg.startAngleDeg <= 180 ? 1 : 0;
        setLargeArcFlag(largeArcFlag);
    }, [
        svg.cx,
        svg.cy,
        svg.endAngleDeg,
        svg.radius,
        svg.startAngleDeg,
    ]);

    return (
        <>
            {
                !pathInnerBgFull &&
                <mask id={ maskId }>
                    <path
                        fill="black"
                        d={ `M ${ startPoint[0] } ${ startPoint[1] } A ${ svg.radius } ${ svg.radius } 1 ${ largeArcFlag } 0 ${ endPoint[0] } ${ endPoint[1] }` }
                    />
                    <path
                        fill="white"
                        d={ `M ${ startPoint[0] } ${ startPoint[1] } A ${ svg.radius } ${ svg.radius } 0 ${ largeArcFlag === 1 ? 0 : 1 } 1 ${ endPoint[0] } ${ endPoint[1] }` }
                    />
                </mask>
            }

            <circle
                strokeDasharray={ circle.strokeDasharray }
                strokeDashoffset={ circle.strokeOffset }
                cx={ svg.cx }
                cy={ svg.cy }
                r={ svg.radius }
                stroke={ 'transparent' }
                strokeWidth={ svg.thickness }
                fill={ settings.pathInnerBgColor }
                shapeRendering="geometricPrecision"
                strokeLinecap="round"
                data-type="path-inner"
                className="mz-round-slider-path-inner"
                mask={ pathInnerBgFull ? '' : `url(#${ maskId })`}
            />
        </>
    )
};

export default InnerCircle;