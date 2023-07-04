import { ITick, ITicks, TData } from '../interfaces';
import { Fragment, MutableRefObject, useEffect, useState } from 'react';
import { v2MulScalar, v2Normalize } from 'mz-math';
import {
    TICKS_WIDTH_DEFAULT,
    TICKS_HEIGHT_DEFAULT,
    DEFAULT_TEXT_COLOR,
    DEFAULT_TEXT_FONT_SIZE
} from '../domain/defaults';
import { getValueByPercent } from '../domain/slider-provider';
import { getNumber } from '../domain/common';

const getTicks = (
    ticsCount: number,
    totalLength: number,
    sliderRef: MutableRefObject<SVGPathElement>,
    min: number,
    max: number,
    round: number,
    data?: TData,
    ticksGroupSize?: number,
    showTickValues?: boolean,
    longerTickValuesOnly?: boolean
) : ITick[] => {
    const ticks: ITick[] = [];

    const oneTickSize = ticsCount === 0 ? 0 : totalLength / ticsCount;

    for(let i=0; i<ticsCount; i++) {
        const distance = i * oneTickSize;
        const point = sliderRef?.current?.getPointAtLength(distance);

        const x = point ? point.x : 0;
        const y = point ? point.y : 0;
        const isLonger = ticksGroupSize !== undefined && (i % ticksGroupSize === 0);
        let tickValue: string|undefined = undefined;

        if(showTickValues && (!longerTickValuesOnly || longerTickValuesOnly && (isLonger || ticksGroupSize === undefined))) {
            tickValue = (getValueByPercent(
                distance * 100 / totalLength,
                min,
                max,
                round,
                data,
            ) ?? '').toString();
        }

        ticks.push({
            distance,
            x,
            y,
            isLonger,
            tickValue,
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
        min, max, round, data,
        showTickValues, longerTickValuesOnly,
        tickValuesColor, tickValuesFontSize,
        tickValuesFontFamily, tickValuesDistance,
    } = props;
    const [ ticks, setTicks ] = useState<ITick[]>([]);

    useEffect(() => {
        setTicks(getTicks(
            ticsCount,
            totalLength,
            sliderRef,
            min,
            max,
            round,
            data,
            ticksGroupSize,
            showTickValues,
            longerTickValuesOnly
        ));
    }, [
        ticsCount, totalLength, sliderRef, ticksGroupSize,
        data, longerTickValuesOnly, min, max, round, showTickValues,
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

                    const tickStartVector = v2MulScalar(normalizedDirectionVector, ticksDistanceToPanel);
                    x += tickStartVector[0];
                    y += tickStartVector[1];

                    const x3 = x + tickEndVector[0];
                    const y3 = y + tickEndVector[1];

                    let textX = 0;
                    let textY = 0;
                    const showText = tick.tickValue !== undefined;

                    if(showText) {
                        const _tickValuesDistance = getNumber(desiredDistance + tickValuesDistance, desiredDistance * 1.5);
                        const tickTextVector = v2MulScalar(normalizedDirectionVector, _tickValuesDistance);
                        textX = x + tickTextVector[0];
                        textY = y + tickTextVector[1];
                    }

                    return (
                        <Fragment key={ i }>
                            <line
                                x1={ x }
                                y1={ y }
                                x2={ x3 }
                                y2={ y3 }
                                strokeWidth={ ticksWidth || TICKS_WIDTH_DEFAULT }
                                stroke={ ticksColor }
                            />

                            {
                                showText &&
                                <text
                                    x={ textX }
                                    y={ textY }
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fill={ tickValuesColor || DEFAULT_TEXT_COLOR }
                                    fontSize={ tickValuesFontSize || DEFAULT_TEXT_FONT_SIZE }
                                    fontFamily={ tickValuesFontFamily }
                                >{ tick.tickValue }</text>
                            }
                        </Fragment>
                    );
                })
            }
        </g>
    )
};

export default Ticks;