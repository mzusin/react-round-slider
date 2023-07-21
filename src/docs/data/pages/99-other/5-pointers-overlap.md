## Pointers Overlap

By default, slider pointers cannot overlap each other. This behaviour can be changed with the **pointersOverlap** setting.

<br/>
<div id="pointers-overlap-slider"></div>
<br/>
<br/>

```ts
export interface ISettings {
    // ... other settings ...

    // A boolean value indicating whether the pointers 
    // on the round slider can overlap each other. 
    // The default value is false.
    pointersOverlap?: boolean;

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
            pointersOverlap={ true }
        />
    );
};
```