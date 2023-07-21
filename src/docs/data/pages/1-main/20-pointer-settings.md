# Pointer Settings

ISettingsPointer interface represents the configuration options for the slider pointers:

<br/>
<div id="general-pointer-options-slider"></div>
<br/>
<br/>

```ts
export interface ISettingsPointer {

    // ... other settings ...
    
    // A string specifying the background color of the pointer. 
    // The default value is #163a86.
    pointerBgColor?: string;
    
    // A string specifying the background color of the pointer 
    // when it is selected. 
    // The default value is #000.
    pointerBgColorSelected?: string;
    
    // A string specifying the background color of the pointer 
    // when it is in a disabled state. 
    // The default value is #a8a8a8.
    pointerBgColorDisabled?: string;
    
    // A string specifying the background color of the pointer 
    // when the user hovers the mouse cursor over it. 
    // The default value is the same as pointerBgColorSelected.
    pointerBgColorHover?: string;
    
    // A number representing the border width of the pointer. 
    // The default value is 0.
    pointerBorder?: number;
    
    // A string specifying the border color of the pointer. 
    // The default value is #000.
    pointerBorderColor?: string;
    
    // A boolean value indicating whether the pointers 
    // on the round slider can overlap each other. 
    // The default value is false.
    pointersOverlap?: boolean;
    
    // A ReactNode representing a custom SVG element 
    // to be used as the pointer. This allows for 
    // using a custom graphic or icon as the pointer,
    // instead of the default circular shape. 
    // The default value is undefined.
    pointerSVG?: ReactNode;
    
    // A number specifying the radius of the pointer. 
    // This determines the size of the circular shape r
    // epresenting the pointer. 
    // The default value is 10.
    pointerRadius?: number;

    // ... other settings ...
}
```

For example:

```tsx
const Component = () => {

    const [ pointers, setPointers ] = useState<ISettingsPointer[]>([
        {
            value: 0,
        },
        {
            value: 25,
        },
        {
            value: 50,
        },
        {
            value: 75,
        }
    ]);

    return (
        <RoundSlider
            pointers={ pointers }
            onChange={ setPointers }
            textColor={ '#8993B7' }

            pointerBgColor={ '#d3bbdc' }
            pointerBgColorSelected={ '#45c479' }
            pointerBgColorDisabled={ '#cecece' }
            pointerBgColorHover={ '#56dc8b' }
            pointerBorder={ 2 }
            pointerBorderColor={ '#8e3da4' }
            pointerRadius={ 20 }
        />
    );
};
```