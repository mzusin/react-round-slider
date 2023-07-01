import { ITick, ITicks } from '../interfaces';
import { MutableRefObject, useEffect, useState } from 'react';
import { v2MulScalar, v2Normalize } from 'mz-math';

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
        ticksColor, ticsCount, totalLength,
        sliderRef, svgCenter,
    } = props;
    const [ ticks, setTicks ] = useState<ITick[]>([]);

    useEffect(() => {
        setTicks(getTicks(ticsCount, totalLength, sliderRef));
    }, [
        ticsCount, totalLength
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
                            strokeWidth={ 3 }
                            stroke={ ticksColor }
                        />
                    );



                    /*const dx = cx - x;
                    const dy = cy - y;
                    let angle = Math.atan2(cy, cx) * (180 / Math.PI);
                    console.log(angle)

                    return (
                        <rect
                            key={ i }
                            x={ x }
                            y={ y }
                            width="3"
                            height="10"
                            fill={ ticksColor }
                            transform={ `rotate(${ angle }, ${ x }, ${ y })` }
                        />
                    )*/
                })
            }
        </g>
    )
};

export default Ticks;