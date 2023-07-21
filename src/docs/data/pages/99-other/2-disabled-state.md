## Disabled State

The interface below represents the configuration options for the disabled state of a round slider component.

<br/>
<div id="disabled-state-slider"></div>
<br/>
<br/>

```ts
export interface ISettings {
    // ... other settings ...

    // A boolean value indicating whether the round slider 
    // is in a disabled state. If set to true, 
    // the slider becomes non-interactive 
    // and cannot be modified by the user. 
    // The default value is false.
    disabled?: boolean;
    
    // A boolean value indicating whether keyboard interactions 
    // are disabled for the round slider. If set to true, 
    // the slider will not respond to keyboard inputs 
    // (e.g., arrow keys) for moving the slider handle. 
    // The default value is false.
    keyboardDisabled?: boolean;
    
    // A boolean value indicating whether the round slider 
    // should ignore mousewheel events. If set to true, 
    // scrolling the mousewheel will not trigger any changes 
    // in the slider's position or value. 
    // The default value is false.
    mousewheelDisabled?: boolean;

    // ... other settings ...
}
```

For example:

```tsx
const Component = () => {

    const [ pointers, setPointers ] = useState<ISettingsPointer[]>([
        { value: 0 },
        { value: 25 }
    ]);

    return (
        <RoundSlider
            pointers={ pointers }
            onChange={ setPointers }
            textColor={ '#8993B7' }
            
            disabled={ true }
            keyboardDisabled={ true }
            mousewheelDisabled={ true }
        />
    );
};
```