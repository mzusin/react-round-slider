import { Vector2 } from 'mz-math';
import { TData, TStep } from './ui/RoundSlider';

export interface ISettingsPointer {

    // user provided properties (or defaults) ----------
    pointerRadii: Vector2;
}

export interface ISettings {

    // user provided properties (or defaults) ----------
    svgRadii: Vector2;
    startAngleDegrees: number;
    endAngleDegrees: number;

    strokeWidth: number;
    bgColor: string;

    pointers: ISettingsPointer[],

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
    rx?: number;
    ry?: number;
    value?: number | string;
}

export interface IRoundSlider {
    rx?: number;
    ry?: number;

    min?: number | string;
    max?: number | string;
    step?: TStep;
    data?: TData;

    pointers?: IRoundSliderPointer[];

    strokeWidth?: number;
    bgColor?: string;

    startAngleDegrees?: number;
    endAngleDegrees?: number;
}
