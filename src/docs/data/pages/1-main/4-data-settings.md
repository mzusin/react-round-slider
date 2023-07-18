# Data Settings

The interface below represents the data configuration options for a round slider component. 

<br/>
<div id="data-options-slider"></div>
<br/>
<br/>

```ts
export interface ISettings {
    // ... other settings ...

    // A number or string representing the minimum value allowed on the slider.
    // This sets the lower limit for the slider's range. 
    // The default value = 0.
    min?: number | string;
    
    // A number or string representing the maximum value allowed on the slider.
    // This sets the upper limit for the slider's range. 
    // The default value = 100.
    max?: number | string;
    
    // A number specifying the increment or decrement value 
    // when moving the slider handle. 
    // This determines the granularity of the slider's values. 
    // The default value = 1.
    step?: number;
    
    // A number specifying the increment or decrement value 
    // when using arrow keys to move the slider handle.
    // The default value = 1.
    arrowStep?: number;
    
    // An array of strings or numbers representing custom data 
    // associated with each position on the slider. 
    // The default value = undefined.
    data?: (string | number)[];
    
    // A number specifying the number of decimal places 
    // to round the slider's values. 
    // This determines the precision of the slider's displayed values. 
    // The default value = 0.
    round?: number;

    // ... other settings ...
}
```

For example:

```tsx
const Component = () => {

    const [ pointers, setPointers ] = useState<ISettingsPointer[]>([
        {
            value: -100
        }
    ]);

    return (
        <RoundSlider
            min={ -100 }
            max={ 100 }
            step={ 0.01 }
            arrowStep={ 1 }
            round={ 2 }

            pointers={ pointers }
            onChange={ setPointers }
        />
    );
};
```