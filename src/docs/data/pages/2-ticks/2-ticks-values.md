## Ticks Values

The below interface represents the configuration options for tick values (labels) in a round slider component.

<br/>
<div id="ticks-values-slider"></div>
<br/>
<br/>

```ts
export interface ISettings {
    // ... other settings ...

    // A boolean value indicating 
    // whether to show the tick values (labels) on the slider. 
    // If set to true, the tick values will be displayed. 
    // The default value is true.
    showTickValues?: boolean;
    
    // A boolean value indicating 
    // whether to show tick values only for longer ticks. 
    // If set to true, the tick values will be displayed 
    // only for the longer tick marks.
    // This is useful for displaying labels on selected or significant ticks. 
    // The default value is true.
    longerTickValuesOnly?: boolean;
    
    // A string specifying the color of the tick values. 
    // This color is applied to the text of the tick labels. 
    // The default value is #000.
    tickValuesColor?: string;
    
    // A number specifying the font size of the tick values. 
    // This determines the size of the text used for the tick labels. 
    // The default value is 12.
    tickValuesFontSize?: number;
    
    // A string specifying the font family of the tick values. 
    // This allows for customizing the font used for the tick labels. 
    // The default value is undefined.
    tickValuesFontFamily?: string;
    
    // A number specifying the distance 
    // between the tick values and the slider. 
    // This determines the gap or margin 
    // between the tick labels and the circular slider track. 
    // The default value is 15.
    tickValuesDistance?: number;
    
    // A string specifying the prefix 
    // to be displayed before the tick values. 
    // This allows for adding additional text 
    // or symbols to the displayed tick labels. 
    // The default value is undefined.
    tickValuesPrefix?: string;
    
    // A string specifying the suffix 
    // to be displayed after the tick values. 
    // This allows for adding additional text 
    // or symbols to the displayed tick labels. 
    // The default value is undefined.
    tickValuesSuffix?: string;

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
            textPrefix={ ' ' }
            textSuffix={ '°' }
            textColor={ '#5DAED2' }

            enableTicks={ true }
            ticksWidth={ 3 }
            ticksHeight={ 10 }
            longerTicksHeight={ 25 }
            ticksCount={ 100 }
            ticksGroupSize={ 5 }
            ticksDistanceToPanel={ 3 }
            ticksColor={ '#efefef' }

            showTickValues={ true }
            longerTickValuesOnly={ true }
            tickValuesColor={ '#6093a3' }
            tickValuesFontSize={ 11 }
            tickValuesFontFamily={ 'Arial' }
            tickValuesDistance={ 15 }
            tickValuesPrefix={ ' ' }
            tickValuesSuffix={ '°' }

            pointers={ pointers }
            onChange={ setPointers }
        />
    );
};
```