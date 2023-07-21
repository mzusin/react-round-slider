## Animation

The options below allows to enable and customize the click animation of the slider.

<br/>
<div id="animation-settings-slider"></div>
<br/>
<br/>

```ts
export interface ISettings {
    // ... other settings ...

    // A boolean value indicating 
    // whether to enable animation 
    // when clicking on the slider. 
    // If set to true, clicking on the slider 
    // will trigger an animation effect. 
    // The default value is false.
    animateOnClick?: boolean;
    
    // A number specifying the duration 
    // of the animation in milliseconds. 
    // This determines the speed at which the animation is performed. 
    // The default value is 200 ms.
    animationDuration?: number;

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
            animateOnClick={ true }
            animationDuration={ 200 }
        />
    );
};
```