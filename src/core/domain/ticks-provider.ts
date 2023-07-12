import {
    circleMovement,
    convertRange,
    degreesToRadians,
    setDecimalPlaces,
    v2MulScalar,
    v2Normalize
} from 'mz-math';
import { ISvg } from './svg-provider';
import { IData } from './data-provider';
import { ISettings } from './settings-provider';
import { getBoolean, getNumber, getString } from './common-provider';
import {
    DEFAULT_TICKS_COLOR, DEFAULT_TICKS_ENABLED, DEFAULT_TICKS_GROUP_SIZE,
    DEFAULT_TICKS_HEIGHT, DEFAULT_TICKS_VALUES_COLOR,
    DEFAULT_TICKS_VALUES_DISTANCE, DEFAULT_TICKS_VALUES_FONT_SIZE,
    DEFAULT_TICKS_WIDTH
} from './defaults-provider';

export interface ITicks {
    ticksCount: number;
    enableTicks: boolean;
    ticksWidth: number;
    ticksHeight: number;
    longerTicksHeight: number;
    ticksDistanceToPanel: number;
    tickValuesDistance: number;
    ticksColor: string;
    tickValuesColor: string;
    tickValuesFontSize: number;
    ticksGroupSize: number;
    longerTickValuesOnly: boolean;
    showTickValues: boolean;
}

export interface ITick {
    x: number;
    y: number;
    x1: number;
    y1: number;
    textX: number;
    textY: number;
    isLonger: boolean;
    showText: boolean;
    tickValue?: string;
}

export const getTicksSettings = (settings: ISettings, data: IData) : ITicks => {

    let ticksCount = getNumber(settings.ticksCount, 0);
    if(!ticksCount) {
        if(data.data && data.data.length > 0) {
            ticksCount = data.data.length;
        }
        else{
            ticksCount = data.max;
        }
    }

    const ticksHeight = getNumber(settings.ticksHeight, DEFAULT_TICKS_HEIGHT);

    return {
        ticksCount,
        enableTicks: getBoolean(settings.enableTicks, DEFAULT_TICKS_ENABLED),
        ticksWidth: getNumber(settings.ticksWidth, DEFAULT_TICKS_WIDTH),
        ticksHeight,
        longerTicksHeight: getNumber(settings.longerTicksHeight, ticksHeight * 2),
        ticksDistanceToPanel: getNumber(settings.ticksDistanceToPanel, 0),
        tickValuesDistance: getNumber(settings.tickValuesDistance, DEFAULT_TICKS_VALUES_DISTANCE),
        ticksColor: getString(settings.ticksColor, DEFAULT_TICKS_COLOR),
        tickValuesColor: getString(settings.tickValuesColor, DEFAULT_TICKS_VALUES_COLOR),
        tickValuesFontSize: getNumber(settings.tickValuesFontSize, DEFAULT_TICKS_VALUES_FONT_SIZE),
        ticksGroupSize: getNumber(settings.ticksGroupSize, DEFAULT_TICKS_GROUP_SIZE),
        longerTickValuesOnly: getBoolean(settings.longerTickValuesOnly, true),
        showTickValues: getBoolean(settings.showTickValues, true),
    };
};

export const getTicks = (
    ticksSettings: ITicks,
    ticksCount: number,
    pathStartAngle: number,
    pathEndAngle: number,
    svg: ISvg,
    data: IData
) : ITick[] => {

    const ticks: ITick[] = [];

    const deltaAngle = Math.abs(pathEndAngle - pathStartAngle);
    const oneTickAngleSize = ticksCount === 0 ? 0 : deltaAngle / ticksCount;

    let count = ticksCount;
    if(!data.isClosedShape) {
        count++;
    }

    for(let i=0; i<count; i++) {
        const currentAngle = pathStartAngle + i * oneTickAngleSize;
        const angleRad = convertRange(degreesToRadians(currentAngle), 0, Math.PI * 2, 0, Math.PI); // [0, Math.PI*2] ---> [0, Math.PI]

        let [x, y] = circleMovement([svg.cx, svg.cy], angleRad, svg.radius);

        const isLonger = ticksSettings.ticksGroupSize !== undefined && (i % ticksSettings.ticksGroupSize === 0 );

        let desiredDistance = ticksSettings.ticksHeight;

        if(isLonger) {
            desiredDistance = ticksSettings.longerTicksHeight;
        }

        const normalizedDirectionVector = v2Normalize([svg.cx - x, svg.cy - y]);
        const tickEndVector = v2MulScalar(normalizedDirectionVector, desiredDistance);

        const tickStartVector = v2MulScalar(normalizedDirectionVector, ticksSettings.ticksDistanceToPanel + svg.thickness/2);
        x += tickStartVector[0];
        y += tickStartVector[1];

        const x1 = x + tickEndVector[0];
        const y1 = y + tickEndVector[1];

        // ------- Define tick value. ---------------------
        let tickValue: string|undefined = undefined;
        if(ticksSettings.showTickValues && (!ticksSettings.longerTickValuesOnly || ticksSettings.longerTickValuesOnly && (isLonger || ticksSettings.ticksGroupSize === undefined))) {

            let value: string|number = convertRange(i, 0, ticksCount, data.min, data.max);

            if(data.data.length > 0) {
                const index = Math.round(value);
                value = data.data[index];
            }
            else{
                value = setDecimalPlaces(value, data.round);
            }

            tickValue = (value ?? '').toString();
        }

        let textX = 0;
        let textY = 0;
        const showText = tickValue !== undefined;

        if(showText) {
            const _tickValuesDistance = getNumber(desiredDistance + ticksSettings.tickValuesDistance, desiredDistance * 1.5);
            const tickTextVector = v2MulScalar(normalizedDirectionVector, _tickValuesDistance);
            textX = x + tickTextVector[0];
            textY = y + tickTextVector[1];
        }

        ticks.push({
            x,
            y,
            x1,
            y1,
            textX,
            textY,
            isLonger,
            tickValue,
            showText,
        });
    }

    return ticks;
};