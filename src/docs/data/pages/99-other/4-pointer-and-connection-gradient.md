## Pointer & Connection Gradient

It is possible to make the background color of the pointers gradient using the SVG [&lt;defs>](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/defs).

<br/>
<div id="pointer-gradient-slider"></div>
<br/>
<br/>

```ts
export interface ISettings {
    // ... other settings ...

    SvgDefs?: ReactNode;

    // ... other settings ...
}
```

For example:

```tsx
const Component = () => {

    const [ pointers, setPointers ] = useState<ISettingsPointer[]>([
        {
            value: 30
        },
        {
            value: 70
        }
    ]);

    return (
        <RoundSlider
            pointers={ pointers }
            onChange={ setPointers }

            SvgDefs={
                <>
                    <linearGradient id="pointer" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#8e50c4" />
                        <stop offset="100%" stopColor="#422563" />
                    </linearGradient>

                    <linearGradient id="pointer-selected" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#f2c832" />
                        <stop offset="100%" stopColor="#f19305" />
                    </linearGradient>

                    <linearGradient id="connection" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#00bc9b" />
                        <stop offset="100%" stopColor="#5eaefd" />
                    </linearGradient>
                </>
            }

            pointerBgColor={ 'url(#pointer)' }
            pointerBgColorSelected={ 'url(#pointer-selected)' }
            connectionBgColor={ 'url(#connection)' }

            textColor={ '#8993B7' }
            textFontSize={ 24 }
        />
    );
};
```

> Please note that the gradient IDs must be unique and match the corresponding background color properties.