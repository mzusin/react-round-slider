# Individual Pointer Settings

You can specify different settings for each pointer.
ISettingsPointer interface represents the configuration options for the slider pointers:

<br/>
<div id="pointer-options-slider"></div>
<br/>
<br/>

```ts
export interface ISettingsPointer {

    // ... other settings ...
    
    // The radius of the pointer in SVG units. 
    // Default value = 10.
    radius?: number;
    
    // The value associated with the pointer. 
    // This value determines the position of the pointer on the slider.
    // Default value = 0.
    value?: string | number;
    
    // The background color of the pointer. 
    // Default value = #163a86.
    bgColor?: string;

    // The background color of the pointer when it is selected or active.
    // Default value = #000.
    bgColorSelected?: string;

    // The background color of the pointer when it is disabled.
    // Default value = #a8a8a8.
    bgColorDisabled?: string;

    // The background color of the pointer when it is hovered.
    // Default value is the same as bgColor.
    bgColorHover?: string;

    // The width of the border around the pointer in SVG units.
    // Default value = 0.
    border?: number;

    // The color of the border around the pointer.
    // Default value = #000.
    borderColor?: string;

    // Specifies whether the pointer is disabled or not. 
    // If set to true, the pointer will be inactive and non-interactive.
    // Default value = false.
    disabled?: boolean;

    // A string that describes the purpose or function of the pointer for accessibility purposes. 
    // This label will be used as the aria-label attribute for the pointer element.
    // Default value = undefined.
    ariaLabel?: string;

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