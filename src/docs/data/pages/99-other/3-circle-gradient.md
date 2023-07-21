## Circle Gradient

It is possible to make the background color of the circle gradient using the SVG [&lt;defs>](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/defs).

<br/>
<div id="circle-gradient-slider"></div>
<br/>
<br/>

```ts
export interface ISettings {
    // ... other settings ...

    SvgDefs?: ReactNode;

    // ... other settings ...
}
```

For example:

```tsx
const Component = () => {

    const [ pointers, setPointers ] = useState<ISettingsPointer[]>([{ value: 0 }]);

    return (
        <RoundSlider
            pointers={ pointers }
            onChange={ setPointers }

            SvgDefs={
                <>
                    <linearGradient 
                        id="color-slider-gradient" 
                        x1="0%" 
                        y1="0%" 
                        x2="0%" 
                        y2="100%">
                        <stop 
                            offset="0%" 
                            stopColor={ `hsl(${ pointers[0].value }, 100%, 40%)` } />
                        <stop 
                            offset="100%" 
                            stopColor={ `hsl(${ pointers[0].value }, 50%, 20%)` } />
                    </linearGradient>
                </>
            }

            animateOnClick={ true }
            pathStartAngle={ 150 }
            pathEndAngle={ 30 }

            pathBgColor={ '#d0d0d0' }
            pathThickness={ 5 }
            pathInnerBgColor={ 'url(#color-slider-gradient)' }
            pathInnerBgFull={ true }
            connectionBgColor={ '#939191' }

            pointerBgColor={ '#cbcbcb' }
            pointerBgColorSelected={ '#d7d7d7' }
            pointerRadius={ 20 }

            enableTicks={ true }
            ticksCount={ 36 }
            ticksGroupSize={ 3 }
            ticksDistanceToPanel={ 5 }
            tickValuesPrefix={ ' ' }
            tickValuesSuffix={ '°' }
            tickValuesDistance={ 20 }
            tickValuesColor={ '#e1e1e1' }

            textColor={ '#fff' }
            textFontSize={ 24 }
            textSuffix={ '°' }
            textPrefix={ ' '}

            min={ 0 }
            max={ 360 }
        />
    );
};
```

> Please note that &lt;defs> linear gradient id **(color-slider-gradient)** should be unique and correspond to the pathInnerBgColor=**{ 'url(#color-slider-gradient)' }**.
