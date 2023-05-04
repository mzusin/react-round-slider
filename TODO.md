# TODO

## Pointer
- any number of pointers
- any SVG shape, not only circle or ellipse
- any styling, including gradients etc.
- probably, option to pass any SVG
- also option to path basic shape / fill / stroke
- option to disable any pointer
- pointersOverlap: boolean;
- pointersMinDistance: number;
- pointersMaxDistance: number;
- rangeDragging: boolean;

- provide initial pointers position (values) - optional

## Bug
- start angle, 0, end angle 360 ---> slider is wrong

## Data
- min
- max
- step
- data

## Accessibility:
- Arrow left, arrow right, arrow up, arrow down
- disabled: boolean;
  keyboardDisabled: boolean;
  mousewheelDisabled: boolean;
  round: number;
  animateOnClick: string | undefined | boolean;
- AriaLabel

## Callbacks & events
- change event
- onKeyDown
- onPointerClicked
- onMouseDown
- onMouseUp
- mouse wheel event
- touch events

## Slider
- Click on any place on slider path ---> jump there

## Panel Fill
- any styling
- also possibility to provide simple fill
- hover style

## Styles
- predefined themes
- svg bg color?

## Docs
- Slider rx / ry in pixels

## Naming
- better name for "strokeWidth" - stripwidth, barwidth, linewidth, bandwidth, etc.?
- better name for bgColor?

## Performance
- svgWidth, svgHeight ---> should be in setState to avoid rerendering?
- the same for 'sliderState'?

## Plugins?

## settings
- all settings should be optional

## APIs
- addPointer
- removePointer
- can settings be changed from outside after initialization?