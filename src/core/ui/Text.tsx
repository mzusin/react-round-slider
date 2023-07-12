import { ISettings } from '../domain/settings-provider';
import { angle2value, IPointers } from '../domain/pointers-provider';
import { getBoolean, getNumber, getString } from '../domain/common-provider';
import {
    DEFAULT_TEXT_COLOR,
    DEFAULT_TEXT_FONT_SIZE
} from '../domain/defaults-provider';
import { useEffect, useState } from 'react';
import { ISvg } from '../domain/svg-provider';
import { IData } from '../domain/data-provider';

interface ITextProps {
    settings: ISettings;
    pointers: IPointers;
    svg: ISvg;
    data: IData;
}

const Text = (props: ITextProps) => {

    const { settings, pointers, svg, data } = props;

    const { cx, cy } = svg;
    const [ value, setValue ] = useState('');

    useEffect(() => {

        const values = pointers.pointers.map(pointer => angle2value(
            data,
            pointer.angleDeg,
            svg.startAngleDeg,
            svg.endAngleDeg
        ));

        values.sort((value1, value2) => {
            return value1.toString().localeCompare(
                value2.toString(),
                'en',
                { numeric: true }
            );
        });

        const texts = values.map(value => `${ settings.textPrefix || '' }${ value }${ settings.textSuffix || '' }`);
        setValue(texts.join(' '));

    }, [
        data,
        pointers.pointers,
        svg.startAngleDeg,
        svg.endAngleDeg,
        settings.textPrefix,
        settings.textSuffix,
    ]);

    const hideText = getBoolean(settings.hideText, false);

    return (
        <>
            {
                !hideText &&
                <text
                    x={ cx }
                    y={ cy }
                    fill={ getString(settings.textColor, DEFAULT_TEXT_COLOR) }
                    fontSize={ getNumber(settings.textFontSize, DEFAULT_TEXT_FONT_SIZE) }
                    fontFamily={ settings.textFontFamily }
                    style={{
                        userSelect: 'none',
                        whiteSpace: 'pre',
                    }}
                    textAnchor="middle">

                    { value }

                </text>
            }
        </>
    )
};

export default Text;