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
    
    // A number representing the border width of the slider path. 
    // This determines the width of the border around the circular track. 
    // The default value = 0.
    pathBorder?: number;
    
    // A string specifying the border color of the slider path. 
    // This color is applied to the border around the circular track. 
    // The default value = #444444.
    pathBorderColor?: string;

    // ... other settings ...
}
```

For example:

```tsx
const Component = () => {

    const [ pointers, setPointers ] = useState<ISettingsPointer[]>([
        {
            value: 0,
            radius: 25,
            bgColor: '#c20cff',
            bgColorSelected: '#8e3da4',
            border: 1,
            borderColor: '#501062',
        },
        {
            value: 25,
            radius: 20,
            bgColor: '#4be28c',
            bgColorSelected: '#368c75',
            border: 1,
            borderColor: '#226452',
        },
        {
            value: 50,
            radius: 15,
            bgColor: '#5691d5',
            bgColorSelected: '#3173b4',
            border: 1,
            borderColor: '#18388a',
        },
        {
            value: 75,
            radius: 10,
            bgColor: '#ffb800',
            bgColorSelected: '#bd8802',
            border: 1,
            borderColor: '#775403',
        }
    ]);

    return (
        <RoundSlider
            pointers={ pointers }
            onChange={ setPointers }
        />
    );
};
```