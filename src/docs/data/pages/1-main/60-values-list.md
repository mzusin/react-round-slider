# Values List

It is possible to pass a list of values instead of just minimum and maximum. These values can be numbers or text values.

<br/>
<div id="values-list-slider"></div>
<br/>
<br/>

```ts
export interface ISettings {
    // ... other settings ...
    
    // An array of strings or numbers representing custom data 
    // associated with each position on the slider. 
    // The default value = undefined.
    data?: (string | number)[];

    // ... other settings ...
}
```

For example:

```tsx
const Component = () => {

    const [ pointers, setPointers ] = useState<ISettingsPointer[]>([
        {
            value: 'a',
        }
    ]);

    return (
        <RoundSlider
            data={[
                'a', 'b', 'c', 'd', 'e', 'f',
                'g', 'h', 'i', 'j', 'k', 'l',
                'm', 'n', 'o', 'p', 'q', 'r',
                's', 't', 'u', 'v', 'w', 'x',
                'y', 'z',
            ]}

            textColor={ '#5DAED2' }
            textFontSize={ 24 }
            textFontFamily={ 'Helvetica,Arial,sans-serif' }

            enableTicks={ true }
            showTickValues={ true }
            ticksGroupSize={ 1 }

            pointers={ pointers }
            onChange={ setPointers }
        />
    );
};
```