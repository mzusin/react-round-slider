## Basic Usage ✍️

To start using the slider, first install the npm package **mz-react-round-slider**.

```html
npm i mz-react-round-slider
```

<br/>
<div id="getting-started-slider"></div>
<br/>

You can then import it like this:

```tsx
import { RoundSlider } from 'mz-react-round-slider';

export const MyComponent = () => {
    const [ pointers, setPointers ] = useState([
        { value: 0 },
        { value: 25 }
    ]);

    return (
        <RoundSlider
            pointers={ pointers }
            onChange={ setPointers }
        />
    );
};
```

Or in TypeScript:

```tsx
import { RoundSlider, ISettingsPointer } from 'mz-react-round-slider';

export const MyComponent = () => {
    const [ pointers, setPointers ] = useState<ISettingsPointer[]>([
        { value: 0 },
        { value: 25 }
    ]);

    return (
        <RoundSlider
            pointers={ pointers }
            onChange={ setPointers }
        />
    );
};
```

> Read more about **ISettingsPointer** interface [here](isettings-pointer-interface.html).

> The slider has a large set of options, which are described later in this documentation.

To place the starting point at the top, you can use the [pathStartAngle](/pages/path-settings.html) and [pathEndAngle](/pages/path-settings.html) properties like this:

<br/>
<div id="getting-started-slider-top-point"></div>
<br/>

```tsx
import { RoundSlider, ISettingsPointer } from 'mz-react-round-slider';

export const MyComponent = () => {
    const [ pointers, setPointers ] = useState<ISettingsPointer[]>([
        { value: 0 },
    ]);

    return (
        <RoundSlider
            pathStartAngle={ 270 }
            pathEndAngle={ 269.999 }
            pointers={ pointers }
            onChange={ setPointers }
            textColor={ '#8993B7' }
        />
    );
};
```