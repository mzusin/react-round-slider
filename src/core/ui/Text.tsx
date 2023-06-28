import { useEffect, useState } from 'react';
import { IText } from '../interfaces';
import { getValueByPercent } from '../domain/slider-provider';

const Text = (props: IText) => {

    const { 
        svgCenter, round, min, max,
        pointers, data, textPrefix, textSuffix,
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

            values.push(`${ textPrefix || '' }${ _value }${ textSuffix || '' }`);
        }

        setValue(values.join(' '));
    }, [ 
        data, max, min, 
        pointers, round,
        textPrefix, textSuffix,
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