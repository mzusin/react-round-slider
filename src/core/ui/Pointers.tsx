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
    setPointer: (pointer: IPointer, newAngleDeg: number) => void;
    data: IData;
}

const Pointers = (props: IPointersProps) => {

    const { pointers, settings, svg, $svg, setPointer, data } = props;

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
                            setPointer={ setPointer }
                            data={ data }
                        />
                    )
                })
            }
        </>
    )
};

export default Pointers;