import { useRef } from 'react';
import { Vector2 } from 'mz-math';

export interface IPointer {
    center: Vector2;
    radii: Vector2;
}

export const Pointer = (props: IPointer) => {

    const pointerRef = useRef<SVGEllipseElement>(null);

    const [cx, cy] = props.center;
    const [rx, ry] = props.radii;

    return (
        <ellipse
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