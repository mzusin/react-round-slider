import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { RoundSlider } from '../core';
import { useState } from 'react';
import { ISettingsPointer } from '../core/domain/settings-provider';

export const TestCirclePathSegments = () => {
    const [ pointers, setPointers ] = useState<ISettingsPointer[]>([
        { value: 0 },
    ]);

    return (
        <>
            <RoundSlider
                pathStartAngle={ 270 }
                pathEndAngle={ 270 }
                pointers={ pointers }
                onChange={ setPointers }
                textColor={ '#8993B7' }
            />

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

                    <RoundSlider
                        pathStartAngle={ 90 }
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
              enableTicks={ true }
          />

          <RoundSlider
              pointers={[
                  {
                      radius: 3,
                  }
              ]}
              enableTicks={ true }
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
              enableTicks={ true }
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
              enableTicks={ true }
          />

          <RoundSlider
              pathStartAngle={ 0 }
              pathEndAngle={ 45 }
              pointers={[
                  {
                      radius: 3,
                  }
              ]}
              ticksCount={ 5 }
              ticksGroupSize={ 5 }
              longerTickValuesOnly={ false }
              enableTicks={ true }
          />
      </>
  )
};

export const testTextProperties = () => {
  return (
      <>
          <div style={{ background: '#111', display: 'inline-flex' }}>
              <RoundSlider
                  animateOnClick={ true }
                  pathStartAngle={ 150 }
                  pathEndAngle={ 30 }

                  pathBgColor={ '#2C2C2F' }
                  pathThickness={ 15 }
                  connectionBgColor={ 'url(#horseshoe-slider-gradient)' }

                  pointerBgColor={ '#fff' }
                  pointerBgColorSelected={ '#eeeeee' }
                  pointerRadius={ 20 }

                  enableTicks={ true }
                  ticksCount={ 100 }
                  ticksGroupSize={ 10 }
                  ticksWidth={ 1 }
                  ticksDistanceToPanel={ 5 }
                  tickValuesDistance={ 20 }
                  tickValuesColor={ '#e1e1e1' }

                  textColor={ '#fff' }
                  textFontSize={ 24 }
                  textSuffix={ '“' }
                  textPrefix={ ' '}

                  min={ 0 }
                  max={ 100 }

                  pointers={[
                      {
                          value: 0,
                      },
                      {
                          value: 100,
                      }
                  ]}

                  SvgDefs={
                      <>
                          <linearGradient id="horseshoe-slider-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#2d95a8" />
                              <stop offset="50%" stopColor="#67CD67" />
                              <stop offset="100%" stopColor="#cccc68" />
                          </linearGradient>
                      </>
                  }
              />
          </div>

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
                pathStartAngle={ 45 }
                pathEndAngle={ 190 }
                pathRadius={ 150 }
                pathThickness={ 15 }
                pathBgColor={ '#efefef' }
                pathBorder={ 2 }
                pathBorderColor={ '#28586c' }
            />

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
                connectionBgColorHover={ '#163a86' }
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

            <RoundSlider
                SvgDefs={
                    <>
                        <linearGradient id="pointer" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#8e50c4" />
                            <stop offset="100%" stopColor="#422563" />
                        </linearGradient>

                        <linearGradient id="pointer-selected" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#f2c832" />
                            <stop offset="100%" stopColor="#f19305" />
                        </linearGradient>

                        <linearGradient id="connection" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#00bc9b" />
                            <stop offset="100%" stopColor="#5eaefd" />
                        </linearGradient>
                    </>
                }
                pointerBgColor={ 'url(#pointer)' }
                pointerBgColorSelected={ 'url(#pointer-selected)' }
                connectionBgColor={ 'url(#connection)' }
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
                pointerRadius={ 50 }
                pointerSVG={
                    <svg xmlns="http://www.w3.org/2000/svg"
                         width="50" height="50" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                         fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path
                            d="M12 10c-1.32 0 -1.983 .421 -2.931 1.924l-.244 .398l-.395 .688a50.89 50.89 0 0 0 -.141 .254c-.24 .434 -.571 .753 -1.139 1.142l-.55 .365c-.94 .627 -1.432 1.118 -1.707 1.955c-.124 .338 -.196 .853 -.193 1.28c0 1.687 1.198 2.994 2.8 2.994l.242 -.006c.119 -.006 .234 -.017 .354 -.034l.248 -.043l.132 -.028l.291 -.073l.162 -.045l.57 -.17l.763 -.243l.455 -.136c.53 -.15 .94 -.222 1.283 -.222c.344 0 .753 .073 1.283 .222l.455 .136l.764 .242l.569 .171l.312 .084c.097 .024 .187 .045 .273 .062l.248 .043c.12 .017 .235 .028 .354 .034l.242 .006c1.602 0 2.8 -1.307 2.8 -3c0 -.427 -.073 -.939 -.207 -1.306c-.236 -.724 -.677 -1.223 -1.48 -1.83l-.257 -.19l-.528 -.38c-.642 -.47 -1.003 -.826 -1.253 -1.278l-.27 -.485l-.252 -.432c-1.011 -1.696 -1.618 -2.099 -3.053 -2.099z"
                            strokeWidth="0" fill="currentColor"></path>
                        <path
                            d="M19.78 7h-.03c-1.219 .02 -2.35 1.066 -2.908 2.504c-.69 1.775 -.348 3.72 1.075 4.333c.256 .109 .527 .163 .801 .163c1.231 0 2.38 -1.053 2.943 -2.504c.686 -1.774 .34 -3.72 -1.076 -4.332a2.05 2.05 0 0 0 -.804 -.164z"
                            strokeWidth="0" fill="currentColor"></path>
                        <path
                            d="M9.025 3c-.112 0 -.185 .002 -.27 .015l-.093 .016c-1.532 .206 -2.397 1.989 -2.108 3.855c.272 1.725 1.462 3.114 2.92 3.114l.187 -.005a1.26 1.26 0 0 0 .084 -.01l.092 -.016c1.533 -.206 2.397 -1.989 2.108 -3.855c-.27 -1.727 -1.46 -3.114 -2.92 -3.114z"
                            strokeWidth="0" fill="currentColor"></path>
                        <path
                            d="M14.972 3c-1.459 0 -2.647 1.388 -2.916 3.113c-.29 1.867 .574 3.65 2.174 3.867c.103 .013 .2 .02 .296 .02c1.39 0 2.543 -1.265 2.877 -2.883l.041 -.23c.29 -1.867 -.574 -3.65 -2.174 -3.867a2.154 2.154 0 0 0 -.298 -.02z"
                            strokeWidth="0" fill="currentColor"></path>
                        <path
                            d="M4.217 7c-.274 0 -.544 .054 -.797 .161c-1.426 .615 -1.767 2.562 -1.078 4.335c.563 1.451 1.71 2.504 2.941 2.504c.274 0 .544 -.054 .797 -.161c1.426 -.615 1.767 -2.562 1.078 -4.335c-.563 -1.451 -1.71 -2.504 -2.941 -2.504z"
                            strokeWidth="0" fill="currentColor"></path>
                    </svg>
                }
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

          <RoundSlider keyboardDisabled={ true } />

          <RoundSlider mousewheelDisabled={ true } />
      </>
  )
};

export const testEvents = () => {
    return (
        <>
            <RoundSlider
                onChange={ (values) => {
                    console.log(values);
                }}
            />

            <RoundSlider
                round={ 2 }
                step={ 0.1 }
                onChange={ (values) => {
                    console.log(values);
                }}
            />

            <RoundSlider
                min={ -100 }
                max={ 100 }
                onChange={ (values) => {
                    console.log(values);
                }}
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
                ticksGroupSize={ 0 }
                longerTickValuesOnly={ false }
                onChange={ (values) => {
                    console.log(values);
                }}
            />

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
                onChange={ (values) => {
                    console.log(values);
                }}
            />
        </>
    )
};

export const testRangeDragging = () => {
  return (
      <>
          <RoundSlider
              rangeDragging={ true }
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

export const testAnimateOnClick = () => {
    return (
        <>
            <RoundSlider
                animateOnClick={ true }
            />

            <RoundSlider
                animateOnClick={ true }
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
                animateOnClick={ true }
            />

            <RoundSlider
                pathStartAngle={ 0 }
                pathEndAngle={ 180 }
                animateOnClick={ true }
            />

            <RoundSlider
                pathStartAngle={ 90 }
                pathEndAngle={ 180 }
                animateOnClick={ true }
            />

            <RoundSlider
                pathStartAngle={ 180 }
                pathEndAngle={ 270 }
                animateOnClick={ true }
            />

            <RoundSlider
                pathStartAngle={ 180 }
                pathEndAngle={ 360 }
                animateOnClick={ true }
            />

            <RoundSlider
                pathStartAngle={ 270 }
                pathEndAngle={ 360 }
                animateOnClick={ true }
            />

            <RoundSlider
                pathStartAngle={ 270 }
                pathEndAngle={ 90 }
                animateOnClick={ true }
            />

            <RoundSlider
                pathStartAngle={ 270 }
                pathEndAngle={ 180 }
                animateOnClick={ true }
            />

            <RoundSlider
                pathStartAngle={ 90 }
                pathEndAngle={ 270 }
                animateOnClick={ true }
            />



            <RoundSlider
                pointers={[
                    {
                        value: 30
                    },
                    {
                        value: 70
                    }
                ]}
                animateOnClick={ true }
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
                animateOnClick={ true }
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
                animateOnClick={ true }
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
                animateOnClick={ true }
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
                animateOnClick={ true }
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
                animateOnClick={ true }
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
                animateOnClick={ true }
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
                animateOnClick={ true }
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
                animateOnClick={ true }
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
                animateOnClick={ true }
            />

            <RoundSlider
                pathStartAngle={ 90 }
                pathEndAngle={ 90 }
                pointers={[
                    {
                        value: 30
                    },
                    {
                        value: 70
                    }
                ]}
                animateOnClick={ true }
            />

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
                animateOnClick={ true }
            />
        </>
    )
};

export const TestUseState = () => {

    const [pointers, setPointers ] = useState<ISettingsPointer[]>([{ value: 0 }]);

    return (
        <RoundSlider
            pointers={ pointers }
            onChange={ setPointers }

            svgBgColor={ '#232323' }

            pathBgColor={ '#d0d0d0' }
            pathThickness={ 5 }
            pathInnerBgColor={ `hsl(${ pointers[0].value }, 100%, 43%)` }
            connectionBgColor={ '#939191' }

            pointerBgColor={ '#fff' }
            pointerBgColorSelected={ '#eeeeee' }
            pointerRadius={ 20 }

            enableTicks={ true }
            ticksCount={ 36 }
            ticksGroupSize={ 3 }
            ticksDistanceToPanel={ 5 }
            tickValuesSuffix={ '°' }

            textColor={ '#fff' }
            textFontSize={ 24 }
            textSuffix={ '°' }
            textPrefix={ ' '}

            min={ 0 }
            max={ 360 }
        />
    );
};

export const TestUseState2 = () => {

    const [ pointers, setPointers ] = useState<ISettingsPointer[]>([
        { value: 6, bgColor: 'red' },
        { value: 10 }
    ]);

    return (
        <RoundSlider
            pointers={ pointers }
            onChange={ setPointers }
            step={ 1 }
        />
    );
};

export const TestSmallCircle = () => {
    const [ pointers, setPointers ] = useState<ISettingsPointer[]>([
        { value: 0, bgColor: 'red' },
        { value: 90 }
    ]);

    return (
        <RoundSlider
            pathRadius={ 50 }
            pointers={ pointers }
            onChange={ setPointers }
            step={ 1 }
        />
    );
};

export const testInnerCircle = () => {
    return (
        <>
            <RoundSlider pathInnerBgColor={ '#fff7b1' } />

            <RoundSlider
                pathStartAngle={ 0 }
                pathEndAngle={ 90 }
                pathInnerBgColor={ '#fff7b1' }
            />

            <RoundSlider
                pathStartAngle={ 0 }
                pathEndAngle={ 180 }
                pathInnerBgColor={ '#fff7b1' }
            />

            <RoundSlider
                pathStartAngle={ 90 }
                pathEndAngle={ 180 }
                pathInnerBgColor={ '#fff7b1' }
            />

            <RoundSlider
                pathStartAngle={ 180 }
                pathEndAngle={ 270 }
                pathInnerBgColor={ '#fff7b1' }
            />

            <RoundSlider
                pathStartAngle={ 180 }
                pathEndAngle={ 360 }
                pathInnerBgColor={ '#fff7b1' }
            />

            <RoundSlider
                pathStartAngle={ 270 }
                pathEndAngle={ 360 }
                pathInnerBgColor={ '#fff7b1' }
            />

            <RoundSlider
                pathStartAngle={ 270 }
                pathEndAngle={ 90 }
                pathInnerBgColor={ '#fff7b1' }
            />

            <RoundSlider
                pathStartAngle={ 270 }
                pathEndAngle={ 180 }
                pathInnerBgColor={ '#fff7b1' }
            />

            <RoundSlider
                pathStartAngle={ 90 }
                pathEndAngle={ 270 }
                pathInnerBgColor={ '#fff7b1' }
            />

        </>
    )
};

/**
 * https://github.com/mzusin/react-round-slider/issues/3
 */
export const testIssue3 = () => {
    return (
        <RoundSlider
            min={0}
            max={3}
            step={0.1}
            arrowStep={0.1}
            round={20}
            enableTicks={true}
            ticksCount={30}
            ticksColor="#80BA26"
            pathStartAngle={90}
            pathEndAngle={360}
            pathRadius={125}
            hideText={true}
            showTickValues={false}
            ticksWidth={3}
            ticksHeight={13}
            pathBgColor={"#e2e2e2"}
            pointerBgColor={"#80BA26"}
            pointerBgColorSelected={"#80BA26"}
            animateOnClick={true}
            animationDuration={500}
            onChange={(value) => {
                const num = Number(value[0].value);
                console.log(num);
            } }
        />
    )
};

const App = () => {
    return (
        <>
            {/*{ testInnerCircle() }*/}
            {/*{ TestSmallCircle() }*/}
            {/*{ testMultiplePointers() }*/}
            {/*{ test2PointersOnCircle() }*/}
            {/*{ testTicksProperties() }*/}
            {/*{ TestCirclePathSegments() }*/}
            {/*{ testBorder() }*/}
            {/*{ testData() }*/}
            {/*{ testStep() }*/}
            {/*{ testOverlap() }*/}
            {/*{ testDisabled() }*/}
            {/*{ testEvents() }*/}
            {/*{ testStyling() }*/}
            {/*{ testRangeDragging() }*/}
            {/*{ testAnimateOnClick() }*/}
            {/*{ <TestUseState /> }*/}
            {/*{ <TestUseState2 /> }*/}
            {/*{ testTextProperties() }*/}
            { testIssue3() }
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

