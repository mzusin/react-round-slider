import { useRef } from 'react';
import { IPointer } from '../interfaces';
// import { SettingsContext } from '../domain/settings-provider';

export const Pointer = (props: IPointer) => {

    const pointerRef = useRef<SVGEllipseElement>(null);

    // const settings = useContext(SettingsContext);

    const [cx, cy] = props.center;
    const [rx, ry] = props.pointerRadii;

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