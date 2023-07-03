import { ITick, ITicks } from '../interfaces';
import { MutableRefObject, useEffect, useState } from 'react';
import { v2MulScalar, v2Normalize } from 'mz-math';
import { TICKS_WIDTH_DEFAULT, TICKS_HEIGHT_DEFAULT } from '../domain/defaults';

const getTicks = (
    ticsCount: number,
    totalLength: number,
    sliderRef: MutableRefObject<SVGPathElement>,
    ticksGroupSize?: number
) : ITick[] => {
    const ticks: ITick[] = [];

    const oneTickSize = ticsCount === 0 ? 0 : totalLength / ticsCount;

    for(let i=0; i<ticsCount; i++) {
        const distance = i * oneTickSize;
        const point = sliderRef?.current?.getPointAtLength(distance);

        const x = point ? point.x : 0;
        const y = point ? point.y : 0;
        const isLonger = ticksGroupSize !== undefined && (i % ticksGroupSize === 0);

        ticks.push({
            distance,
            x,
            y,
            isLonger,
        });
    }

    return ticks;
};

export const Ticks = (props: ITicks) => {

    const {
        ticksColor, ticksWidth,
        ticksHeight, longerTicksHeight,
        ticsCount, ticksGroupSize, totalLength,
        sliderRef, svgCenter, ticksDistanceToPanel,
    } = props;
    const [ ticks, setTicks ] = useState<ITick[]>([]);

    useEffect(() => {
        setTicks(getTicks(ticsCount, totalLength, sliderRef, ticksGroupSize));
    }, [
        ticsCount, totalLength, sliderRef, ticksGroupSize,
    ]);

    const [ cx, cy ] = svgCenter;

    return (
        <g>
            {
                ticks.map((tick, i) => {
                    let { x, y } = tick;

                    let desiredDistance = ticksHeight || TICKS_HEIGHT_DEFAULT;

                    if(tick.isLonger) {
                        desiredDistance = longerTicksHeight;
                    }

                    const normalizedDirectionVector = v2Normalize([cx - x, cy - y]);
                    const tickEndVector = v2MulScalar(normalizedDirectionVector, desiredDistance);

                    if(ticksDistanceToPanel !== undefined) {
                        const tickStartVector = v2MulScalar(normalizedDirectionVector, ticksDistanceToPanel);
                        x += tickStartVector[0];
                        y += tickStartVector[1];
                    }

                    const x3 = x + tickEndVector[0];
                    const y3 = y + tickEndVector[1];

                    return (
                        <line
                            key={ i }
                            x1={ x }
                            y1={ y }
                            x2={ x3 }
                            y2={ y3 }
                            strokeWidth={ ticksWidth || TICKS_WIDTH_DEFAULT }
                            stroke={ ticksColor }
                        />
                    );
                })
            }
        </g>
    )
};

export default Ticks;