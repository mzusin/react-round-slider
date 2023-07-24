# Text Values

Each pointer can print a text value in the middle of the circle. The interface below represents the configuration options for a text elements.

<br/>
<div id="text-values-slider"></div>
<br/>
<br/>

```ts
export interface ISettings {
    // ... other settings ...

    // A boolean value indicating whether to hide the text 
    // displayed on the slider.
    // The default value is false.
    hideText?: boolean;
    
    // A string specifying the prefix to be displayed 
    // before the slider's value text. 
    // This allows for adding additional text 
    // or symbols to the displayed value. 
    // The default value is undefined.
    textPrefix?: string;
    
    // A string specifying the suffix to be displayed 
    // after the slider's value text. 
    // This allows for adding additional text 
    // or symbols to the displayed value. 
    // The default value is undefined.
    textSuffix?: string;
    
    // A string specifying the color of the slider's value text. 
    // The default value is #000.
    textColor?: string;
    
    // A number specifying the font size of the slider's value text. 
    // The default value is 16.
    textFontSize?: number;
    
    // A string specifying the font family of the slider's value text. 
    // The default value is undefined.
    textFontFamily?: string;
    
    // A number specifying the horizontal offset of the displayed value text. 
    // The default value is 0.
    textOffsetX?: number;
    
    // A number specifying the vertical offset of the displayed value text. 
    // The default value is 0.
    textOffsetY?: number;

    // A string specifying the text betwen slider's pointer values (for
    // example, •, | or -).
    // The default value is undefined.
    textBetween?: string;

    // ... other settings ...
}
```

For example:

```tsx
const Component = () => {

    const [ pointers, setPointers ] = useState<ISettingsPointer[]>([
        {
            value: 0
        },

        {
            value: 50
        }
    ]);

    return (
        <RoundSlider
            hideText={ false }
            textPrefix={ '' }
            textSuffix={ 'px' }
            textColor={ '#8993B7' }
            textFontSize={ 24 }
            textFontFamily={ 'Helvetica,Arial,sans-serif' }
            textOffsetX={ 0 }
            textOffsetY={ 0 }
            textBetween={ ' • '}

            pointers={ pointers }
            onChange={ setPointers }
        />
    );
};
```