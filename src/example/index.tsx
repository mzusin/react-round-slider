import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { RoundSlider } from '../core/ui/RoundSlider';

const App = () => {
    return (
        <>
            <RoundSlider
                rx={ 150 }
                ry={ 150 }

                startAngle={ 0 }
                endAngle={ 180 }

                strokeWidth={ 15 }
                stroke="#285f68"

                rxHandle={ 20 }
                ryHandle={ 10 }
            />

            <RoundSlider
                rx={ 150 }
                ry={ 150 }

                startAngle={ 0 }
                endAngle={ 90 }

                strokeWidth={ 15 }
                stroke="#285f68"

                rxHandle={ 20 }
                ryHandle={ 10 }
            />

            <RoundSlider
                rx={ 150 }
                ry={ 150 }

                startAngle={ 90 }
                endAngle={ 270 }

                strokeWidth={ 15 }
                stroke="#285f68"

                rxHandle={ 20 }
                ryHandle={ 10 }
            />

            <RoundSlider
                rx={ 150 }
                ry={ 150 }

                startAngle={ 180 }
                endAngle={ 270 }

                strokeWidth={ 15 }
                stroke="#285f68"

                rxHandle={ 20 }
                ryHandle={ 10 }
            />

            <RoundSlider
                rx={ 150 }
                ry={ 150 }

                startAngle={ 270 }
                endAngle={ 0 }

                strokeWidth={ 15 }
                stroke="#285f68"

                rxHandle={ 20 }
                ryHandle={ 10 }
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

