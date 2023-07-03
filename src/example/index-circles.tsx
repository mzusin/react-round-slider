import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { RoundSlider } from '../core';

const App = () => {
    return (
        <>
            <RoundSlider
                rx={ 150 }
                ry={ 150 }

                startAngleDegrees={ 0 }
                endAngleDegrees={ 180 }

                panelStrokeWidth={ 15 }
                panelBgColor="#285f68"

                pointers={[
                    {
                        rx: 25,
                        ry: 15,
                    }
                ]}
            />

            <RoundSlider
                rx={ 150 }
                ry={ 150 }

                startAngleDegrees={ 180 }
                endAngleDegrees={ 0 }

                panelStrokeWidth={ 15 }
                panelBgColor="#285f68"

                pointers={[
                    {
                        rx: 20,
                        ry: 10,
                    }
                ]}
            />

            <RoundSlider
                rx={ 150 }
                ry={ 150 }

                startAngleDegrees={ 180 }
                endAngleDegrees={ 360 }

                panelStrokeWidth={ 15 }
                panelBgColor="#285f68"

                pointers={[
                    {
                        rx: 20,
                        ry: 10,
                    }
                ]}
            />

            <RoundSlider
                rx={ 150 }
                ry={ 150 }

                startAngleDegrees={ 0 }
                endAngleDegrees={ 90 }

                panelStrokeWidth={ 15 }
                panelBgColor="#285f68"

                pointers={[
                    {
                        rx: 20,
                        ry: 10,
                    }
                ]}
            />

            <RoundSlider
                rx={ 150 }
                ry={ 150 }

                startAngleDegrees={ 90 }
                endAngleDegrees={ 270 }

                panelStrokeWidth={ 15 }
                panelBgColor="#285f68"

                pointers={[
                    {
                        rx: 20,
                        ry: 10,
                    }
                ]}
            />

            <RoundSlider
                rx={ 150 }
                ry={ 150 }

                startAngleDegrees={ 180 }
                endAngleDegrees={ 270 }

                panelStrokeWidth={ 15 }
                panelBgColor="#285f68"

                pointers={[
                    {
                        rx: 20,
                        ry: 10,
                    }
                ]}
            />

            <RoundSlider
                rx={ 150 }
                ry={ 150 }

                startAngleDegrees={ 270 }
                endAngleDegrees={ 0 }

                panelStrokeWidth={ 15 }
                panelBgColor="#285f68"

                pointers={[
                    {
                        rx: 20,
                        ry: 10,
                    }
                ]}
            />

            <RoundSlider
                rx={ 150 }
                ry={ 150 }

                startAngleDegrees={ 180 }
                endAngleDegrees={ 360 }

                panelStrokeWidth={ 15 }
                panelBgColor="#285f68"

                pointers={[
                    {
                        rx: 20,
                        ry: 10,
                    }
                ]}
            />

            <RoundSlider
                rx={ 150 }
                ry={ 150 }

                startAngleDegrees={ 0 }
                endAngleDegrees={ 360 }

                panelStrokeWidth={ 15 }
                panelBgColor="#285f68"

                pointers={[
                    {
                        rx: 20,
                        ry: 10,
                    }
                ]}
            />

            <RoundSlider
                rx={ 150 }
                ry={ 150 }

                startAngleDegrees={ 200 }
                endAngleDegrees={ 40 }

                panelStrokeWidth={ 15 }
                panelBgColor="#285f68"

                pointers={[
                    {
                        rx: 20,
                        ry: 10,
                    }
                ]}
            />

            <RoundSlider
                rx={ 150 }
                ry={ 150 }

                startAngleDegrees={ -80 }
                endAngleDegrees={ 0 }

                panelStrokeWidth={ 15 }
                panelBgColor="#285f68"

                pointers={[
                    {
                        rx: 20,
                        ry: 10,
                    }
                ]}
            />

            <RoundSlider
                rx={ 150 }
                ry={ 150 }

                startAngleDegrees={ 270 }
                endAngleDegrees={ 360 }

                panelStrokeWidth={ 15 }
                panelBgColor="#285f68"

                pointers={[
                    {
                        rx: 20,
                        ry: 10,
                    }
                ]}
            />

            <RoundSlider
                rx={ 150 }
                ry={ 150 }

                startAngleDegrees={ 270 }
                endAngleDegrees={ 270 }

                panelStrokeWidth={ 15 }
                panelBgColor="#285f68"

                pointers={[
                    {
                        rx: 20,
                        ry: 10,
                    }
                ]}
            />

            <RoundSlider
                rx={ 150 }
                ry={ 150 }

                startAngleDegrees={ 270 }
                endAngleDegrees={ 200 }

                panelStrokeWidth={ 15 }
                panelBgColor="#285f68"

                pointers={[
                    {
                        rx: 20,
                        ry: 10,
                    }
                ]}
            />

            <RoundSlider
                rx={ 150 }
                ry={ 150 }

                startAngleDegrees={ 630 }
                endAngleDegrees={ 560 }

                panelStrokeWidth={ 15 }
                panelBgColor="#285f68"

                pointers={[
                    {
                        rx: 20,
                        ry: 10,
                    }
                ]}
            />
        </>
    );
};

const init = () => {
    const $root =  document.getElementById('root') as HTMLElement;
    if(!$root) return;

    const root = ReactDOM.createRoot($root);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
};

init();

