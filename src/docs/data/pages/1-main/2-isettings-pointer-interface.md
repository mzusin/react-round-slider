# ISettingsPointer Interface  

This interface represents the configuration options for the slider pointers:

```ts
export interface ISettingsPointer {
    
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
}
```