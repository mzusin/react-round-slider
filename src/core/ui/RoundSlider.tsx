import { IRoundSlider } from '../interfaces';

export const RoundSlider = (props: IRoundSlider) => {

    const { width, height } = props;

    const rx = width / 2;
    const ry = height / 2;
    const angle = 180;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={ width }
            height={ height }>

            <path
                d={ `M ${ width } ${ height / 2 } A ${ rx } ${ ry } ${ angle } 1 1 0 ${ height / 2 }` }
                stroke="#ccc"
                strokeWidth="15"
                fill="none"
            />
        </svg>
    )
};