## Range Dragging

The slider has range drag capability where the slider's connection line can be dragged in a circular range, providing continuous circular movement.

<br/>
<div id="range-dragging-slider"></div>
<br/>
<br/>

```ts
export interface ISettings {
    // ... other settings ...

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
        { value: 0 },
        { value: 25 }
    ]);

    return (
        <RoundSlider
            pointers={ pointers }
            onChange={ setPointers }
            textColor={ '#8993B7' }
            rangeDragging={ true }
        />
    );
};
```