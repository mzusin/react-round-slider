# Connection Settings

The connection line joins the slider pointer with the start angle. If there are multiple pointers, a connection line is connected between them. 

The following properties represent connection line configuration options.

<br/>
<div id="connection-options-slider"></div>
<br/>
<br/>

```ts
export interface ISettings {
    // ... other settings ...

    // A boolean value indicating whether to hide the connection line. 
    // If set to true, the connection line will not be visible. 
    // The default value is false.
    hideConnection?: boolean;
    
    // A string specifying the background color of the connection line. 
    // The default value is #5daed2.
    connectionBgColor?: string;
    
    // A string specifying the background color of the connection line 
    // when the slider is in a disabled state. 
    // The default value is #97b0bb.
    connectionBgColorDisabled?: string;
    
    // A string specifying the background color of the connection line 
    // when the slider is being hovered over. 
    // The default value is equal to connectionBgColor property.
    connectionBgColorHover?: string;
    
    // A boolean value indicating whether to enable range dragging. 
    // If set to true, the slider connection line can be dragged 
    // in a circular range, allowing for continuous circular movement. 
    // The default value is false.
    rangeDragging?: boolean;

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
            connectionBgColor={ '#e28bff' }
            connectionBgColorHover={ '#b154cc' }
            connectionBgColorDisabled={ '#969696' }

            pathThickness={ 20 }
            pointerRadius={ 25 }
            pointerBgColor={ '#9c2dd7' }
            pointerBgColorSelected={ '#6b1b96' }

            pointers={ pointers }
            onChange={ setPointers }
        />
    );
};
```