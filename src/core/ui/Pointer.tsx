import { useContext, useRef } from 'react';
import { Vector2 } from 'mz-math';
import { SettingsContext } from '../domain/settings-provider';

export interface IPointer {
    center: Vector2;
}

export const Pointer = (props: IPointer) => {

    const pointerRef = useRef<SVGEllipseElement>(null);

    const settings = useContext(SettingsContext);

    const [cx, cy] = props.center;
    const [rx, ry] = settings.pointerRadii;

    return (
        <ellipse
            data-type="pointer"
            ref={ pointerRef }
            cx={ cx }
            cy={ cy}
            rx={ rx }
            ry={ ry }
            cursor="pointer"
            fill="#000"
        />
    )
};