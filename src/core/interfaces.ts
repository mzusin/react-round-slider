import { Vector2 } from 'mz-math';

export type TStep = ((value: number | string, percent: number) => number) | number | undefined | null;
export type TData = (string | number)[] | undefined;

export interface IUserSettingsPointer {
    rx?: number;
    ry?: number;
    value?: number | string;
}

export interface IUserSettings {
    rx?: number;
    ry?: number;

    min?: number | string;
    max?: number | string;
    step?: TStep;
    data?: TData;

    pointers?: IUserSettingsPointer[];

    strokeWidth?: number;
    bgColor?: string;

    startAngleDegrees?: number;
    endAngleDegrees?: number;
}

export interface ISettings {

    // user provided properties (or defaults) ----------
    svgRadii: Vector2;
    startAngleDegrees: number;
    endAngleDegrees: number;

    strokeWidth: number;
    bgColor: string;

    pointers: IRoundSliderPointer[],

    // calculated properties ----------------------------
    svgWidth: number;
    svgHeight: number;
    svgCenter: Vector2;

    sliderStartPoint: Vector2;
    sliderEndPoint: Vector2;
    largeArcFlag: number;
}

export interface IPanelFill {

}

export interface IPointer {
    center: Vector2;
    pointerRadii: Vector2;
}

export interface IRoundSliderPointer {

    // user provided properties (or defaults) ----------
    pointerRadii: Vector2;
}


