import { useEffect, useState, Fragment } from 'react';
import { getTicks, getTicksSettings, ITick, ITicks } from '../domain/ticks-provider';
import { ISettings } from '../domain/settings-provider';
import { ISvg } from '../domain/svg-provider';
import { IData } from '../domain/data-provider';

interface ITicksProps {
    settings: ISettings;
    svg: ISvg;
    data: IData;
}

const Ticks = (props: ITicksProps) => {

    const { settings, svg, data } = props;

    const [ ticksSettings, setTicksSettings ] = useState<ITicks|null>(null);
    const [ ticks, setTicks ] = useState<ITick[]>([]);

    useEffect(() => {
       setTicksSettings(getTicksSettings(settings, data));
    }, [
        settings,
        data,
    ]);

    useEffect(() => {
        if(!ticksSettings) return;

        let endAngleDeg = svg.endAngleDeg;
        if(endAngleDeg < svg.startAngleDeg) {
            endAngleDeg += 360;
        }

        setTicks(getTicks(
            ticksSettings,
            ticksSettings.ticksCount,
            svg.startAngleDeg,
            endAngleDeg,
            svg,
            data
        ));
    }, [
        data,
        svg,
        ticksSettings,
    ]);

    return (
        <>
            {
                ticksSettings && ticksSettings.enableTicks &&
                <g>
                    {
                        ticks.map((tick, i) => {
                            const { x, y, x1, y1, textX, textY, showText } = tick;

                            return (
                                <Fragment key={ i }>
                                    <line
                                        x1={ x }
                                        y1={ y }
                                        x2={ x1 }
                                        y2={ y1 }
                                        strokeWidth={ ticksSettings.ticksWidth }
                                        stroke={ ticksSettings.ticksColor }

                                        data-type="tick"
                                        className="mz-round-slider-tick"
                                    />

                                    {
                                        showText &&
                                        <text
                                            data-type="tick-text"
                                            className="mz-round-slider-tick-text"

                                            x={ textX }
                                            y={ textY }
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            fill={ ticksSettings.tickValuesColor }
                                            fontSize={ ticksSettings.tickValuesFontSize }
                                            fontFamily={ settings.tickValuesFontFamily }
                                            style={{
                                                userSelect: 'none',
                                                whiteSpace: 'pre',
                                            }}>
                                            { settings.tickValuesPrefix }{ tick.tickValue }{ settings.tickValuesSuffix }
                                        </text>
                                    }
                                </Fragment>
                            );
                        })
                    }
                </g>
            }
        </>
    )
};

export default Ticks;