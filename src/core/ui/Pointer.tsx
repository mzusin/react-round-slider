import { IPointer } from '../interfaces';

export const Pointer = (props: IPointer) => {

    const [cx, cy] = props.center;
    const [rx, ry] = props.pointerRadii;

    return (
        <ellipse
            data-type="pointer"
            cx={ cx }
            cy={ cy}
            rx={ rx }
            ry={ ry }
            cursor="pointer"
            fill="#000"
        />
    )
};