import { useEffect, useState } from 'react';
import { IText } from '../interfaces';
import { getValueByPercent } from '../domain/slider-provider';

const Text = (props: IText) => {

    const { 
        svgCenter, round, min, max,
        pointers, data,
     } = props;

    const [ cx, cy ] = svgCenter;
    const [ value, setValue ] = useState('');

    useEffect(() => {
        const values = [];

        for(const pointer of pointers) {
            const _value = getValueByPercent(
                pointer.percent,
                min,
                max,
                round,
                data
            );

            values.push(_value);
        }

        setValue(values.join(' '));
    }, [ 
        data, max, min, 
        pointers, round,
    ]);

    return (
        <text 
            x={ cx } 
            y={ cy } 
            style={{ userSelect: 'none' }}
            textAnchor="middle">{ value }</text>
    )
};

export default Text;