import { ITick, ITicks } from '../interfaces';
import { MutableRefObject, useEffect, useState } from 'react';

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

    const { ticksColor, ticsCount, totalLength, sliderRef } = props;
    const [ ticks, setTicks ] = useState<ITick[]>([]);

    useEffect(() => {
        setTicks(getTicks(ticsCount, totalLength, sliderRef));
    }, [
        ticsCount, totalLength
    ]);

    return (
        <g>
            {
                ticks.map((tick, i) => {
                    const { x, y } = tick;

                    return (
                        <rect
                            key={ i }
                            x={ x }
                            y={ y }
                            width="3"
                            height="10"
                            fill={ ticksColor }
                        />
                    )
                })
            }
        </g>
    )
};

export default Ticks;