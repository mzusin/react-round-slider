import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { RoundSlider } from '../core';

export const testCirclePathSegments = () => {
    return (
        <>
            <RoundSlider />

            <RoundSlider
                pathStartAngle={ 0 }
                pathEndAngle={ 90 }
            />

            <RoundSlider
                pathStartAngle={ 0 }
                pathEndAngle={ 180 }
            />

            <RoundSlider
                pathStartAngle={ 90 }
                pathEndAngle={ 180 }
            />

            <RoundSlider
                pathStartAngle={ 180 }
                pathEndAngle={ 270 }
            />

            <RoundSlider
                pathStartAngle={ 180 }
                pathEndAngle={ 360 }
            />

            <RoundSlider
                pathStartAngle={ 270 }
                pathEndAngle={ 360 }
            />

            <RoundSlider
                pathStartAngle={ 270 }
                pathEndAngle={ 90 }
            />

            <RoundSlider
                pathStartAngle={ 270 }
                pathEndAngle={ 180 }
            />

            <RoundSlider
                pathStartAngle={ 90 }
                pathEndAngle={ 270 }
            />

        </>
    )
};

export const testBorder = () => {
    return (
        <>
            <RoundSlider
                pathRadius={ 150 }
                pathBorder={ 10 }
                pathBorderColor={ '#68da1c' }
            />

            <RoundSlider
                pathStartAngle={ 0 }
                pathEndAngle={ 90 }
                pathRadius={ 150 }
                pathBorder={ 10 }
                pathBorderColor={ '#8e3da4' }
            />

            <RoundSlider
                pathStartAngle={ 0 }
                pathEndAngle={ 180 }
                pathRadius={ 150 }
                pathBorder={ 1 }
                pathBorderColor={ '#68da1c' }
            />

            <RoundSlider
                pathStartAngle={ 90 }
                pathEndAngle={ 180 }
                pathRadius={ 150 }
                pathBorder={ 2 }
                pathBorderColor={ '#8e3da4' }
            />

            <RoundSlider
                pathStartAngle={ 180 }
                pathEndAngle={ 270 }
                pathRadius={ 150 }
                pathBorder={ 3 }
                pathBorderColor={ '#4bace2' }
            />

            <RoundSlider
                pathStartAngle={ 180 }
                pathEndAngle={ 360 }
                pathRadius={ 150 }
                pathBorder={ 3 }
                pathBorderColor={ '#4bace2' }
            />

            <RoundSlider
                pathStartAngle={ 180 }
                pathEndAngle={ 380 }
                pathRadius={ 150 }
                pathBorder={ 3 }
                pathBorderColor={ '#4bace2' }
            />

            <RoundSlider
                pathStartAngle={ 180 }
                pathEndAngle={ 90 }
                pathRadius={ 150 }
                pathBorder={ 3 }
                pathBorderColor={ '#4bace2' }
            />

            <RoundSlider
                pathStartAngle={ 270 }
                pathEndAngle={ 90 }
                pathRadius={ 150 }
                pathBorder={ 3 }
                pathBorderColor={ '#4bace2' }
            />

            <RoundSlider
                pathStartAngle={ 270 }
                pathEndAngle={ 180 }
                pathRadius={ 150 }
                pathBorder={ 3 }
                pathBorderColor={ '#4bace2' }
            />

            <RoundSlider
                pathRadius={ 100 }
                pathBorder={ 3 }
                pathBorderColor={ '#4bace2' }
            />

            <RoundSlider
                pathStartAngle={ 0 }
                pathEndAngle={ 90 }
                pathRadius={ 100 }
                pathBorder={ 3 }
                pathBorderColor={ '#4bace2' }
            />

            <RoundSlider
                pathStartAngle={ 0 }
                pathEndAngle={ 180 }
                pathRadius={ 100 }
                pathBorder={ 3 }
                pathBorderColor={ '#4bace2' }
            />

            <RoundSlider
                pathStartAngle={ 90 }
                pathEndAngle={ 180 }
                pathRadius={ 100 }
                pathBorder={ 3 }
                pathBorderColor={ '#4bace2' }
            />

            <RoundSlider
                pathStartAngle={ 180 }
                pathEndAngle={ 270 }
                pathRadius={ 100 }
                pathBorder={ 3 }
                pathBorderColor={ '#4bace2' }
            />

            <RoundSlider
                pathStartAngle={ 180 }
                pathEndAngle={ 360 }
                pathRadius={ 100 }
                pathBorder={ 3 }
                pathBorderColor={ '#4bace2' }
            />

            <RoundSlider
                pathStartAngle={ 180 }
                pathEndAngle={ 380 }
                pathRadius={ 100 }
                pathBorder={ 3 }
                pathBorderColor={ '#4bace2' }
            />

            <RoundSlider
                pathStartAngle={ 180 }
                pathEndAngle={ 90 }
                pathRadius={ 100 }
                pathBorder={ 3 }
                pathBorderColor={ '#4bace2' }
            />

            <RoundSlider
                pathStartAngle={ 270 }
                pathEndAngle={ 90 }
                pathRadius={ 100 }
                pathBorder={ 3 }
                pathBorderColor={ '#4bace2' }
            />

            <RoundSlider
                pathStartAngle={ 270 }
                pathEndAngle={ 180 }
                pathRadius={ 100 }
                pathBorder={ 3 }
                pathBorderColor={ '#4bace2' }
            />
        </>
    )
};

export const test2PointersOnCircle = () => {
        return (
            <>
                    <RoundSlider
                        pointers={[
                                {
                                        value: 30
                                },
                                {
                                        value: 70
                                }
                        ]}
                    />

                    <RoundSlider
                        pathStartAngle={ 0 }
                        pathEndAngle={ 90 }
                        pointers={[
                                {
                                        value: 30
                                },
                                {
                                        value: 70
                                }
                        ]}
                    />

                    <RoundSlider
                        pathStartAngle={ 0 }
                        pathEndAngle={ 180 }
                        pointers={[
                                {
                                        value: 30
                                },
                                {
                                        value: 70
                                }
                        ]}
                    />

                    <RoundSlider
                        pathStartAngle={ 90 }
                        pathEndAngle={ 180 }
                        pointers={[
                                {
                                        value: 30
                                },
                                {
                                        value: 70
                                }
                        ]}
                    />

                    <RoundSlider
                        pathStartAngle={ 180 }
                        pathEndAngle={ 270 }
                        pointers={[
                                {
                                        value: 30
                                },
                                {
                                        value: 70
                                }
                        ]}
                    />

                    <RoundSlider
                        pathStartAngle={ 180 }
                        pathEndAngle={ 360 }
                        pointers={[
                                {
                                        value: 30
                                },
                                {
                                        value: 70
                                }
                        ]}
                    />

                    <RoundSlider
                        pathStartAngle={ 270 }
                        pathEndAngle={ 360 }
                        pointers={[
                                {
                                        value: 30
                                },
                                {
                                        value: 70
                                }
                        ]}
                    />

                    <RoundSlider
                        pathStartAngle={ 270 }
                        pathEndAngle={ 90 }
                        pointers={[
                                {
                                        value: 30
                                },
                                {
                                        value: 70
                                }
                        ]}
                    />

                    <RoundSlider
                        pathStartAngle={ 270 }
                        pathEndAngle={ 180 }
                        pointers={[
                                {
                                        value: 30
                                },
                                {
                                        value: 70
                                }
                        ]}
                    />

                    <RoundSlider
                        pathStartAngle={ 90 }
                        pathEndAngle={ 270 }
                        pointers={[
                                {
                                        value: 30
                                },
                                {
                                        value: 70
                                }
                        ]}
                    />
            </>
        )
};

export const testMultiplePointers = () => {
    return (
        <>
            <RoundSlider
                pathRadius={ 150 }
                pathStartAngle={ 0 }
                pathEndAngle={ 180 }
                pointers={[
                    {
                        value: 0,
                        bgColor: '#8e3da4'
                    },
                    {
                        value: 25,
                        bgColor: '#fffc00'
                    },
                    {
                        value: 50,
                        bgColor: '#b0fc7e'
                    },
                    {
                        value: 75,
                        bgColor: '#ff0000'
                    },
                    {
                        value: 100,
                        bgColor: '#ffb800'
                    }
                ]}
            />

            <RoundSlider
                pathRadius={ 150 }
                pathStartAngle={ 0 }
                pathEndAngle={ 180 }
                pointers={[
                    {
                        value: 30,
                    },
                    {
                        value: 60,
                    },
                    {
                        value: 90,
                    }
                ]}
            />

            <RoundSlider
                pathRadius={ 150 }
                pathStartAngle={ 0 }
                pathEndAngle={ 360 }
                pointers={[
                    {
                        value: 30,
                    },
                    {
                        value: 60,
                    },
                    {
                        value: 90,
                    }
                ]}
            />

            <RoundSlider
                pathRadius={ 150 }
                pathStartAngle={ 0 }
                pathEndAngle={ 360 }
                pointers={[
                    {
                        value: 0,
                    },
                    {
                        value: 25,
                    },
                    {
                        value: 50,
                    },
                    {
                        value: 75,
                    }
                ]}
            />

            <RoundSlider
                pathRadius={ 150 }
                pathStartAngle={ 270 }
                pathEndAngle={ 90 }
                pointers={[
                    {
                        value: 30,
                    },
                    {
                        value: 60,
                    },
                    {
                        value: 90,
                    }
                ]}
            />

            <RoundSlider
                pathRadius={ 150 }
                pathStartAngle={ 270 }
                pathEndAngle={ 180 }
                pointers={[
                    {
                        value: 30,
                    },
                    {
                        value: 60,
                    },
                    {
                        value: 90,
                    }
                ]}
            />

            <RoundSlider
                pathRadius={ 150 }
                pathStartAngle={ 270 }
                pathEndAngle={ 0 }
                pointers={[
                    {
                        value: 30,
                    },
                    {
                        value: 60,
                    },
                    {
                        value: 90,
                    }
                ]}
            />

            <RoundSlider
                pathRadius={ 150 }
                pathStartAngle={ 0 }
                pathEndAngle={ 90 }
                pointers={[
                    {
                        value: 30,
                    },
                    {
                        value: 60,
                    },
                    {
                        value: 90,
                    }
                ]}
            />
        </>
    )
};

export const testMinMax = () => {
  return (
      <>
          <RoundSlider
              min={ -100 }
              max={ 100 }
              pointerBorder={ 15 }
          />

          <RoundSlider
              min={ 100 }
              max={ 200 }
          />
      </>
  )
};

export const testTicksProperties = () => {
  return (
      <>
          <RoundSlider
              pathStartAngle={ 90 }
              pointerBgColor={ '#d3bbdc' }
              pointerBorder={ 2 }
              pointerBorderColor={ '#8e3da4' }
              showTickValues={ true }
              ticksGroupSize={ 10 }
          />

          <RoundSlider
              pointers={[
                  {
                      radius: 3,
                  }
              ]}
          />

          <RoundSlider
              pathThickness={ 10 }
              pathBorder={ 2 }
              pathBorderColor={ '#5daed2' }
              pointers={[
                  {
                      radius: 3,
                  }
              ]}
          />

          <RoundSlider
              pathStartAngle={ 0 }
              pathEndAngle={ 90 }
              pathBgColor={ '#163a86' }
              pathThickness={ 15 }
              pointers={[
                  {
                      radius: 3,
                  }
              ]}
          />

          <RoundSlider
              pathStartAngle={ 0 }
              pathEndAngle={ 45 }
              pointers={[
                  {
                      radius: 3,
                  }
              ]}
              ticsCount={ 5 }
              ticksGroupSize={ 5 }
              longerTickValuesOnly={ false }
          />
      </>
  )
};

export const testTextProperties = () => {
  return (
      <>
          <RoundSlider
              pathRadius={ 150 }
              pathStartAngle={ 270 }
              pathEndAngle={ 45 }
              pointers={[
                  {
                      value: 100,
                  }
              ]}
              textColor={ '#366d8c' }
              textFontSize={ 24 }
              textPrefix={ 'Value: ' }
              textSuffix={ '%' }
          />

          <RoundSlider
              pathStartAngle={ 180 }
              pathEndAngle={ 90 }
              pathRadius={ 150 }
              pointers={[
                  {
                      value: 10,
                  },
                  {
                      value: 90,
                  }
              ]}
              connectionBgColor={ '#bb9d9d' }
              textSuffix={ 'px' }
              textFontFamily={ 'Arial' }
          />

          <RoundSlider
              pathStartAngle={ 180 }
              pathEndAngle={ 90 }
              pathRadius={ 150 }
              pointers={[
                  {
                      value: 10.1234,
                  },
                  {
                      value: 90.5678,
                  }
              ]}
              connectionBgColor={ '#bb9d9d' }
              textSuffix={ 'px' }
              textFontFamily={ 'Arial' }
              round={ 2 }
          />
      </>
  )
};

export const testData = () => {
  return (
      <>
          <RoundSlider
              data={[
                  'a', 'b', 'c', 'd', 'e', 'f',
                  'g', 'h', 'i', 'j', 'k', 'l',
                  'm', 'n', 'o', 'p', 'q', 'r',
                  's', 't', 'u', 'v', 'w', 'x',
                  'y', 'z',
              ]}
              textColor={ '#5DAED2' }
              textFontSize={ 24 }
              textFontFamily={ 'Helvetica,Arial,sans-serif' }
              ticksGroupSize={ 0 }
              longerTickValuesOnly={ false }
          />

          <RoundSlider
              data={[
                  'a', 'b', 'c', 'd', 'e', 'f',
                  'g', 'h', 'i', 'j', 'k', 'l',
                  'm', 'n', 'o', 'p', 'q', 'r',
                  's', 't', 'u', 'v', 'w', 'x',
                  'y', 'z',
              ]}
              textColor={ '#5DAED2' }
              textFontSize={ 24 }
              textFontFamily={ 'Helvetica,Arial,sans-serif' }
              pointers={[
                  {
                      value: 'b'
                  }
              ]}
              ticksGroupSize={ 0 }
              longerTickValuesOnly={ false }
          />

          <RoundSlider
              data={[
                  'a', 'b', 'c', 'd', 'e', 'f',
                  'g', 'h', 'i', 'j', 'k', 'l',
                  'm', 'n', 'o', 'p', 'q', 'r',
                  's', 't', 'u', 'v', 'w', 'x',
                  'y', 'z',
              ]}
              textColor={ '#5DAED2' }
              textFontSize={ 24 }
              textFontFamily={ 'Helvetica,Arial,sans-serif' }
              pointers={[
                  {
                      value: 't'
                  }
              ]}
              ticksGroupSize={ 0 }
              longerTickValuesOnly={ false }
          />

          <RoundSlider
              data={[
                  'a', 'b', 'c', 'd', 'e', 'f',
                  'g', 'h', 'i', 'j', 'k', 'l',
                  'm', 'n', 'o', 'p', 'q', 'r',
                  's', 't', 'u', 'v', 'w', 'x',
                  'y', 'z',
              ]}
              textColor={ '#5DAED2' }
              textFontSize={ 24 }
              textFontFamily={ 'Helvetica,Arial,sans-serif' }
              pointers={[
                  {
                      value: 'y'
                  }
              ]}
              ticksGroupSize={ 0 }
              longerTickValuesOnly={ false }
          />

          <RoundSlider
              data={[
                  'a', 'b', 'c', 'd', 'e', 'f',
                  'g', 'h', 'i', 'j', 'k', 'l',
                  'm', 'n', 'o', 'p', 'q', 'r',
                  's', 't', 'u', 'v', 'w', 'x',
                  'y', 'z',
              ]}
              textColor={ '#5DAED2' }
              textFontSize={ 24 }
              textFontFamily={ 'Helvetica,Arial,sans-serif' }
              pointers={[
                  {
                      value: 'z'
                  }
              ]}
              ticksGroupSize={ 0 }
              longerTickValuesOnly={ false }
          />

          <RoundSlider
              data={[
                  'a', 'b', 'c', 'd', 'e', 'f',
                  'g', 'h', 'i', 'j', 'k', 'l',
                  'm', 'n', 'o', 'p', 'q', 'r',
                  's', 't', 'u', 'v', 'w', 'x',
                  'y', 'z',
              ]}
              textColor={ '#5DAED2' }
              textFontSize={ 24 }
              textFontFamily={ 'Helvetica,Arial,sans-serif' }
              pointers={[
                  {
                      value: 'a'
                  }
              ]}
              ticksGroupSize={ 0 }
              longerTickValuesOnly={ false }
          />
      </>
  )
};

export const testStep = () => {
    return (
        <>
            <RoundSlider
                step={ 1 }
            />

            <RoundSlider
                step={ 0.1 }
                round={ 2 }
            />

            <RoundSlider
                step={ 10 }
            />
        </>
    )
};

export const testOverlap = () => {
    return (
        <>
            <RoundSlider pointersOverlap={ true } />

            <RoundSlider
                pathStartAngle={ 0 }
                pathEndAngle={ 90 }
                pointersOverlap={ true }
                pointers={[
                    {
                        value: 30
                    },
                    {
                        value: 70
                    }
                ]}
            />

            <RoundSlider
                pathStartAngle={ 0 }
                pathEndAngle={ 180 }
                pointersOverlap={ true }
                pointers={[
                    {
                        value: 30
                    },
                    {
                        value: 70
                    }
                ]}
            />

            <RoundSlider
                pathStartAngle={ 90 }
                pathEndAngle={ 180 }
                pointersOverlap={ true }
                pointers={[
                    {
                        value: 30
                    },
                    {
                        value: 70
                    }
                ]}
            />

            <RoundSlider
                pathStartAngle={ 180 }
                pathEndAngle={ 270 }
                pointersOverlap={ true }
                pointers={[
                    {
                        value: 30
                    },
                    {
                        value: 70
                    }
                ]}
            />

            <RoundSlider
                pathStartAngle={ 180 }
                pathEndAngle={ 360 }
                pointersOverlap={ true }
                pointers={[
                    {
                        value: 30
                    },
                    {
                        value: 70
                    }
                ]}
            />

            <RoundSlider
                pathStartAngle={ 270 }
                pathEndAngle={ 360 }
                pointersOverlap={ true }
                pointers={[
                    {
                        value: 30
                    },
                    {
                        value: 70
                    }
                ]}
            />

            <RoundSlider
                pathStartAngle={ 270 }
                pathEndAngle={ 90 }
                pointersOverlap={ true }
                pointers={[
                    {
                        value: 30
                    },
                    {
                        value: 70
                    }
                ]}
            />

            <RoundSlider
                pathStartAngle={ 270 }
                pathEndAngle={ 180 }
                pointersOverlap={ true }
                pointers={[
                    {
                        value: 30
                    },
                    {
                        value: 70
                    }
                ]}
            />

            <RoundSlider
                pathStartAngle={ 90 }
                pathEndAngle={ 270 }
                pointersOverlap={ true }
                pointers={[
                    {
                        value: 30
                    },
                    {
                        value: 70
                    }
                ]}
            />

        </>
    )
};

export const testStyling = () => {
    return (
        <>
            <RoundSlider
                pathRadius={ 150 }
                pathStartAngle={ 0 }
                pathEndAngle={ 180 }
                pointers={[
                    {
                        value: 0,
                    },
                    {
                        value: 25,
                    },
                    {
                        value: 50,
                    },
                    {
                        value: 75,
                    },
                    {
                        value: 100,
                    }
                ]}
            />

            <RoundSlider
                pathRadius={ 150 }
                pathStartAngle={ 0 }
                pathEndAngle={ 180 }
                pointerBgColorSelected={ '#ff0000' }
                pointers={[
                    {
                        value: 0,
                    },
                    {
                        value: 25,
                    },
                    {
                        value: 50,
                    },
                    {
                        value: 75,
                    },
                    {
                        value: 100,
                    }
                ]}
            />

            <RoundSlider
                pathRadius={ 150 }
                pathStartAngle={ 0 }
                pathEndAngle={ 180 }
                pointers={[
                    {
                        value: 0,
                        bgColor: '#8e3da4',
                        bgColorSelected: '#702b80',
                    },
                    {
                        value: 25,
                        bgColor: '#fffc00',
                        bgColorSelected: '#b9b822'
                    },
                    {
                        value: 50,
                        bgColor: '#b0fc7e',
                        bgColorSelected: '#86c959'
                    },
                    {
                        value: 75,
                        bgColor: '#ff0000',
                        bgColorSelected: '#b42929'
                    },
                    {
                        value: 100,
                        bgColor: '#ffb800',
                        bgColorSelected: '#c48f08'
                    }
                ]}
            />
        </>
    )
};

export const testDisabled = () => {
  return (
      <>
          <RoundSlider />

          <RoundSlider disabled={ true } />

          <RoundSlider
              disabled={ true }
              pathStartAngle={ 0 }
              pathEndAngle={ 90 }
              pointers={[
                  {
                      value: 30
                  },
                  {
                      value: 70
                  }
              ]}
          />

          <RoundSlider
              pathStartAngle={ 0 }
              pathEndAngle={ 90 }
              pointers={[
                  {
                      value: 30
                  },
                  {
                      value: 70,
                      disabled: true,
                  }
              ]}
          />
      </>
  )
};

const App = () => {
    return (
        <>
            {/*{ testCirclePathSegments() }*/}
            {/*{ testBorder() }*/}
            {/*{ test2PointersOnCircle() }*/}
            {/*{ testMultiplePointers() }*/}
            {/*{ testData() }*/}
            {/*{ testStep() }*/}
            {/*{ testOverlap() }*/}
            {/*{ testStyling() }*/}
            { testDisabled() }
        </>
    );
};

const init = () => {
    const $root = document.getElementById('root') as HTMLElement;
    if (!$root) return;

    const root = ReactDOM.createRoot($root);
    root.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    );
};

init();

