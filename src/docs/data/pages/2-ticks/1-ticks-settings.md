## Ticks Settings

The below interface represents the configuration options for ticks (marks) in a round slider component.

<br/>
<div id="ticks-settings-slider"></div>
<br/>
<br/>

```ts
export interface ISettings {
    // ... other settings ...

    // A boolean value indicating whether to enable 
    // the display of ticks (marks) on the slider. 
    // If set to true, the ticks will be visible. 
    // The default value is false.
    enableTicks?: boolean;
    
    // A number specifying the width of the ticks. 
    // The default value is 3.
    ticksWidth?: number;
    
    // A number specifying the height of the regular ticks. 
    // The default value is 10.
    ticksHeight?: number;
    
    // A number specifying the height of the longer ticks. 
    // This determines the vertical size of the longer tick marks, 
    // which are typically used to highlight specific values. 
    // The default value is ticksHeight * 2.
    longerTicksHeight?: number;
    
    // A number specifying the total count of ticks 
    // to be displayed on the slider. 
    // This determines the number of evenly spaced ticks 
    // along the slider's circumference.
    ticksCount?: number;
    
    // A number specifying the number of ticks to group together. 
    // This can be used to create intervals 
    // or larger divisions between ticks. 
    // For example, if set to 2, every second tick will be a larger tick. 
    // The default value is 10.
    ticksGroupSize?: number;
    
    // A number specifying the distance 
    // between the ticks and the slider panel. 
    // This determines the gap or margin between the ticks 
    // and the circular slider track. 
    // The default value is 0.
    ticksDistanceToPanel?: number;
    
    // A string specifying the color of the ticks. 
    // This color is applied to the tick marks. 
    // The default value is #efefef.
    ticksColor?: string;

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
            pathStartAngle={ 0 }
            pathEndAngle={ 270 }

            enableTicks={ true }
            ticksWidth={ 3 }
            ticksHeight={ 10 }
            longerTicksHeight={ 25 }
            ticksCount={ 100 }
            ticksGroupSize={ 5 }
            longerTickValuesOnly={ true }
            ticksDistanceToPanel={ 3 }
            ticksColor={ '#efefef' }

            pointers={ pointers }
            onChange={ setPointers }
        />
    );
};
```