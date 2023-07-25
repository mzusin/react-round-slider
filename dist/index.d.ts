import { ReactNode } from 'react';
import { JSX } from 'react/jsx-runtime';

declare module 'mz-react-round-slider' {

    export interface ISettings {
        svgBgColor?: string;
        onChange?: (pointers: ISettingsPointer[]) => void;
        min?: number | string;
        max?: number | string;
        step?: number;
        arrowStep?: number;
        data?: (string | number)[];
        round?: number;
        pathStartAngle?: number;
        pathEndAngle?: number;
        pathRadius?: number;
        pathThickness?: number;
        pathBgColor?: string;
        pathInnerBgColor?: string;
        pathInnerBgFull?: boolean;
        pathBorder?: number;
        pathBorderColor?: string;
        pointers?: ISettingsPointer[];
        pointerBgColor?: string;
        pointerBgColorSelected?: string;
        pointerBgColorDisabled?: string;
        pointerBgColorHover?: string;
        pointerBorder?: number;
        pointerBorderColor?: string;
        pointersOverlap?: boolean;
        pointerSVG?: ReactNode;
        pointerRadius?: number;
        hideConnection?: boolean;
        connectionBgColor?: string;
        connectionBgColorDisabled?: string;
        connectionBgColorHover?: string;
        rangeDragging?: boolean;
        hideText?: boolean;
        textPrefix?: string;
        textSuffix?: string;
        textColor?: string;
        textFontSize?: number;
        textFontFamily?: string;
        textOffsetX?: number;
        textOffsetY?: number;
        textBetween?: string;
        enableTicks?: boolean;
        ticksWidth?: number;
        ticksHeight?: number;
        longerTicksHeight?: number;
        ticksCount?: number;
        ticksGroupSize?: number;
        ticksDistanceToPanel?: number;
        ticksColor?: string;
        showTickValues?: boolean;
        longerTickValuesOnly?: boolean;
        tickValuesColor?: string;
        tickValuesFontSize?: number;
        tickValuesFontFamily?: string;
        tickValuesDistance?: number;
        tickValuesPrefix?: string;
        tickValuesSuffix?: string;
        disabled?: boolean;
        keyboardDisabled?: boolean;
        mousewheelDisabled?: boolean;
        SvgDefs?: ReactNode;
        animateOnClick?: boolean;
        animationDuration?: number;
    }

    export interface ISettingsPointer {
        radius?: number;
        value?: string | number;
        bgColor?: string;
        bgColorSelected?: string;
        bgColorDisabled?: string;
        bgColorHover?: string;
        border?: number;
        borderColor?: string;
        disabled?: boolean;
        ariaLabel?: string;
    }

    export interface ICircle {
        strokeDasharray: string;
        strokeOffset: number;
    }

    export interface IConnection {
        radius: number;
        cx: number;
        cy: number;
        startAngleDeg: number;
        endAngleDeg: number;
        strokeDasharray: number[];
        strokeOffset: number;
    }

    export interface IData {
        min: number;
        max: number;
        stepAngleDeg: number;
        arrowStepAngleDeg: number;
        round: number;
        data: (string | number)[];
        isClosedShape: boolean;
    }

    export interface IPointer {
        id: string;
        index: number;
        radius: number;
        angleDeg: number;
        prevAngleDeg: number;
        bgColor: string;
        bgColorSelected: string;
        bgColorDisabled: string;
        bgColorHover: string;
        border: number;
        borderColor: string;
        disabled: boolean;
        ariaLabel?: string;
    }

    export interface IPointers {
        pointers: IPointer[];
        maxRadius: number;
    }

    export interface ISvg {
        cx: number;
        cy: number;
        radius: number;
        size: number;
        thickness: number;
        border: number;
        startAngleDeg: number;
        endAngleDeg: number;
    }

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

    export const RoundSlider: (props: ISettings) => JSX.Element;
}