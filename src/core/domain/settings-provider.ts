export interface ISettings {

    // data -----------------
    min?: number | string;
    max?: number | string;
    step?: number;
    arrowStep?: number;
    data?: (string | number)[];
    round?: number;

    // path -----------------
    pathStartAngle?: number,
    pathEndAngle?: number,
    pathRadius?: number;
    pathThickness?: number;
    pathBgColor?: string;
    pathBorder?: number;
    pathBorderColor?: string;

    // pointers -------------
    pointers?: ISettingsPointer[];
    pointerBgColor?: string;
    pointerBgColorSelected?: string;
    pointerBorder?: number;
    pointerBorderColor?: string;
    pointersOverlap?: boolean;

    // connection ------------
    hideConnection?: boolean;
    connectionBgColor?: string;

    // text ------------------
    hideText?: boolean;
    textPrefix?: string;
    textSuffix?: string;
    textColor?: string;
    textFontSize?: number;
    textFontFamily?: string;

    // ticks -----------------
    disableTicks?: boolean;
    ticksWidth?: number;
    ticksHeight?: number;
    longerTicksHeight?: number;
    ticsCount?: number;
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
}

export interface ISettingsPointer {
    radius?: number;
    value?: string | number;
    bgColor?: string;
    bgColorSelected?: string;
    border?: number;
    borderColor?: string;
}
