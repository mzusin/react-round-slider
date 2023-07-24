import { ReactNode } from 'react';

export interface ISettings {

    // svg ------------------
    svgBgColor?: string;

    // events ---------------
    onChange?: (pointers: ISettingsPointer[]) => void;

    // data -----------------
    min?: number | string;
    max?: number | string;
    step?: number;
    arrowStep?: number;
    data?: (string | number)[];
    round?: number;

    // path -----------------
    pathStartAngle?: number;
    pathEndAngle?: number;
    pathRadius?: number;
    pathThickness?: number;
    pathBgColor?: string;
    pathInnerBgColor?: string;
    pathInnerBgFull?: boolean;
    pathBorder?: number;
    pathBorderColor?: string;

    // pointers -------------
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

    // connection ------------
    hideConnection?: boolean;
    connectionBgColor?: string;
    connectionBgColorDisabled?: string;
    connectionBgColorHover?: string;
    rangeDragging?: boolean;

    // text ------------------
    hideText?: boolean;
    textPrefix?: string;
    textSuffix?: string;
    textColor?: string;
    textFontSize?: number;
    textFontFamily?: string;
    textOffsetX?: number;
    textOffsetY?: number;
    textBetween?: string;

    // ticks -----------------
    enableTicks?: boolean;
    ticksWidth?: number;
    ticksHeight?: number;
    longerTicksHeight?: number;
    ticksCount?: number;
    ticksGroupSize?: number;
    ticksDistanceToPanel?: number;
    ticksColor?: string;

    // tick values -----------
    showTickValues?: boolean;
    longerTickValuesOnly?: boolean;
    tickValuesColor?: string;
    tickValuesFontSize?: number;
    tickValuesFontFamily?: string;
    tickValuesDistance?: number;
    tickValuesPrefix?: string;
    tickValuesSuffix?: string;

    // disabled --------------
    disabled?: boolean;
    keyboardDisabled?: boolean;
    mousewheelDisabled?: boolean;

    // other -----------------
    SvgDefs?: ReactNode;

    // animation -------------
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
