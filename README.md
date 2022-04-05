# curved-polygon: A tiny library for creating regular polygons with rounded corners in SVG

[![curved-poly-demo](https://user-images.githubusercontent.com/5955802/161431592-26629d30-1332-406d-9aa9-86f8614e3be7.gif)](https://observablehq.com/@shreshthmohan/curved-polygon)

## Installation

For legacy environments (UMD bundle), direct usage in the browser

```
<script src="https://unpkg.com/curved-polygon@latest"></script>
```

As an npm package

```
npm install curved-polygon
```

## `roundedPolygonByCircumRadius(options)`

`options` properties

- `circumRadius` (number, required) size of the polygon, contained inside a circle of this provided value
- `[borderRadius]` (number, default = 0, optional) radius of the curved polygon corner
- `[sideCount]` (number, default = 3, optional) number of polygon sides
- `[cx]` (number, default = 0, optional) polygon center x position
- `[cy]` (number, default = 0, optional) polygon center y position
- `[rotate]` (number, default = 0, optional) rotation angle in degrees

### Usage (circumradius):

```
import { roundedPolygonByCircumRadius } from 'curved-polygon'

const pathStringC = roundedPolygonByCircumRadius({
  circumRadius: 200,
  sideCount: 5,
  borderRadius: 10,
  cx: 150,
  cy: 150,
  rotate: 15,
})
// "M 260.291625178441 311.8033988749895 A 10 10 1.2566370614359172 0 0 269.8021903413926 304.89356881873897 L 337.96616337613284 95.10643118126106 A 10 10 1.2566370614359172 0 0 334.333450736106 83.92609129376211 L 155.87785252292477 -45.72949016875157 A 10 10 1.2566370614359172 0 0 144.1221474770753 -45.729490168751596 L -34.33345073610599 83.92609129376206 A 10 10 1.2566370614359172 0 0 -37.96616337613278 95.106431181261 L 30.197809658607397 304.8935688187389 A 10 10 1.2566370614359172 0 0 39.708374821558934 311.8033988749895 z"
// set this to the "d" attribute of a <path> SVG element
```

## `roundedPolygonBySideLength(options)`

`options` properties

- `circumRadius` (number, required) size of the polygon, contained inside a circle of this provided value
- `[borderRadius]` (number, default = 0, optional) radius of the curved polygon corner
- `[sideCount]` (number, default = 3, optional) number of polygon sides
- `[cx]` (number, default = 0, optional) polygon center x position
- `[cy]` (number, default = 0, optional) polygon center y position
- `[rotate]` (number, default = 0, optional) rotation angle in degrees

### Usage (side length):

```
import { roundedPolygonBySideLength } from 'curved-polygon'

const pathStringS = roundedPolygonBySideLength({
  sideLength: 200,
  sideCount: 5,
  borderRadius: 10,
  cx: 150,
  cy: 150,
  rotate: 90,
})
// "M 242.7345747199464 287.63819204711734 A 10 10 1.2566370614359172 0 0 252.24513988289794 280.7283619908668 L 309.55825899209157 104.33671884433718 A 10 10 1.2566370614359172 0 0 305.92554635206477 93.15637895683824 L 155.87785252292474 -15.85965183915954 A 10 10 1.2566370614359172 0 0 144.1221474770753 -15.859651839159568 L -5.9255463520647425 93.1563789568382 A 10 10 1.2566370614359172 0 0 -9.558258992091538 104.33671884433714 L 47.75486011710204 280.7283619908668 A 10 10 1.2566370614359172 0 0 57.26542528005358 287.63819204711734 z"
// set this to the "d" attribute of a <path> SVG element
```

## Demos

- [Codepen (UMD)](https://codepen.io/shreshthmohan/pen/mdpqaPY)
- [Observable - Interactive](https://observablehq.com/@shreshthmohan/curved-polygon)
