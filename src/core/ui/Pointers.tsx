import { Pointer } from './Pointer';
import { useAppSelector } from '../data/store';

const Pointers = () => {
    const pointers = useAppSelector(store => store.slider.pointers);

    return (
        <>
            {
                pointers.map(pointer => {
                    return (
                        <Pointer key={ pointer.id } pointer={ pointer } id={ pointer.id } />
                    )
                })
            }
        </>
    )
};

export default Pointers;