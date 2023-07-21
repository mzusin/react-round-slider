# Path Settings

The properties below represents the configuration options for the slider path.

<br/>
<div id="path-options-slider" style="margin-top: -130px;"></div>
<br/>
<br/>

```ts
export interface ISettings {
    // ... other settings ...
    
    // A number representing the starting angle of the slider path. 
    // The angle is measured in degrees, and the default value = 0.
    pathStartAngle?: number;
    
    // A number representing the ending angle of the slider path. 
    // The angle is measured in degrees, and the default = 360.
    pathEndAngle?: number;
    
    // A number specifying the radius of the slider path. 
    // This determines the size of the circular track on which the slider moves.
    // The default value = 150.
    pathRadius?: number;
    
    // A number representing the thickness or width of the slider path. 
    // This determines the visual thickness of the circular track. 
    // The default value = 5.
    pathThickness?: number;
    
    // A string specifying the background color of the slider path. 
    // This color is applied to the circular track 
    // that represents the background of the slider. 
    // The default value = #efefef.
    pathBgColor?: string;
    
    // A string specifying the inner background color of the slider path. 
    // This color is applied to the circular track inside the slider path. 
    // The default value = undefined.
    pathInnerBgColor?: string;

    // A boolean specifying the whether the inner background 
    // will be the full circle.
    // The default value = undefine
    pathInnerBgFull?: boolean;
    
    // A number representing the border width of the slider path. 
    // This determines the width of the border around the circular track. 
    // The default value = 0.
    pathBorder?: number;
    
    // A string specifying the border color of the slider path. 
    // This color is applied to the border around the circular track. 
    // The default value = #444444.
    pathBorderColor?: string;

    // A string specifying the backgroun color of the SVG. 
    // The default value is undefined.
    svgBgColor?: string;

    // ... other settings ...
}
```

For example:

```tsx
const Component = () => {

    const [ pointers, setPointers ] = useState<ISettingsPointer[]>([
        {
            value: 50
        }
    ]);

    return (
        <RoundSlider
            pathStartAngle={ 0 }
            pathEndAngle={ 180 }

            pathRadius={ 150 }
            pathThickness={ 15 }

            pathBgColor={ '#efefef' }
            pathInnerBgColor={ '#efefef' }

            pathBorder={ 2 }
            pathBorderColor={ '#28586c' }

            textOffsetY={ 70 }
            textFontSize={ 24 }
            textSuffix={ '°' }
            textPrefix={ ' '}

            pointers={ pointers }
            onChange={ setPointers }
        />
    );
};
```