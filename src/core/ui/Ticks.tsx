import { ITick, ITicks } from '../interfaces';
import { MutableRefObject, useEffect, useState } from 'react';
import { v2MulScalar, v2Normalize } from 'mz-math';
import { TICKS_SIZE_DEFAULT } from '../domain/defaults';

const getTicks = (
    ticsCount: number,
    totalLength: number,
    sliderRef: MutableRefObject<SVGPathElement>
) : ITick[] => {
    const ticks: ITick[] = [];

    const oneTickSize = ticsCount === 0 ? 0 : totalLength / ticsCount;

    for(let i=0; i<ticsCount; i++) {
        const distance = i * oneTickSize;
        const point = sliderRef?.current?.getPointAtLength(distance);
        const x = point ? point.x : 0;
        const y = point ? point.y : 0;

        ticks.push({
            distance,
            x,
            y,
        });
    }

    return ticks;
};

export const Ticks = (props: ITicks) => {

    const {
        ticksColor, ticksSize,
        ticsCount, totalLength,
        sliderRef, svgCenter,
    } = props;
    const [ ticks, setTicks ] = useState<ITick[]>([]);

    useEffect(() => {
        setTicks(getTicks(ticsCount, totalLength, sliderRef));
    }, [
        ticsCount, totalLength, sliderRef,
    ]);

    const [ cx, cy ] = svgCenter;

    return (
        <g>
            {
                ticks.map((tick, i) => {
                    const { x, y } = tick;

                    const distance = Math.sqrt(Math.pow(cx - x, 2) + Math.pow(cy - y, 2));
                    const desiredDistance = distance * 0.1;

                    const normalizedDirectionVector = v2Normalize([cx - x, cy - y]);
                    const vectorFromP1ToP3 = v2MulScalar(normalizedDirectionVector, desiredDistance);

                    const x3 = x + vectorFromP1ToP3[0];
                    const y3 = y + vectorFromP1ToP3[1];

                    return (
                        <line
                            key={ i }
                            x1={ x }
                            y1={ y }
                            x2={ x3 }
                            y2={ y3 }
                            strokeWidth={ ticksSize || TICKS_SIZE_DEFAULT }
                            stroke={ ticksColor }
                        />
                    );
                })
            }
        </g>
    )
};

export default Ticks;