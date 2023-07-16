import { IPointer, IPointers } from '../domain/pointers-provider';
import Pointer from './Pointer';
import { ISettings } from '../domain/settings-provider';
import { ISvg } from '../domain/svg-provider';
import { IData } from '../domain/data-provider';

export interface IPointersProps {
    pointers: IPointers;
    settings: ISettings;
    svg: ISvg;
    $svg: SVGSVGElement;
    data: IData;
    setPointer: (pointer: IPointer, newAngleDeg: number) => void;
    setSelectedPointerId: (value: (((prevState: string) => string) | string)) => void;
    selectedPointerId: string;
}

const Pointers = (props: IPointersProps) => {

    const {
        pointers, settings, svg, $svg, data,
        setPointer, setSelectedPointerId, selectedPointerId,
    } = props;

    return (
        <>
            {
                pointers.pointers.map(pointer => {

                    return (
                        <Pointer
                            key={ pointer.id }
                            pointer={ pointer }
                            svg={ svg }
                            settings={ settings }
                            $svg={ $svg }
                            data={ data }
                            setPointer={ setPointer }
                            setSelectedPointerId={ setSelectedPointerId }
                            selectedPointerId={ selectedPointerId }
                        />
                    )
                })
            }
        </>
    )
};

export default Pointers;