# curved-polygon: Tiny library for creating polygons with rounded corners in SVG


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

### Usage (circumradius):

```
import { roundedPolygonByCircumRadius } from 'curved-polygon'

const pathStringC = roundedPolygonByCircumRadius({
  circumRadius: 200,
  sideCount: 5,
  borderRadius: 10,
  cx: 150,
  cy: 150
})

// set this to the "d" attribute of a <path> SVG element
```

## `roundedPolygonBySideLength(options)`

`options` properties
- `circumRadius` (number, required) size of the polygon, contained inside a circle of this provided value
- `[borderRadius]` (number, default = 0, optional) radius of the curved polygon corner 
- `[sideCount]` (number, default = 3, optional) number of polygon sides
- `[cx]` (number, default = 0, optional) polygon center x position
- `[cy]` (number, default = 0, optional) polygon center y position

### Usage (side length):

```
import { roundedPolygonBySideLength } from 'curved-polygon'

const pathStringS = roundedPolygonBySideLength({
  sideLength: 200,
  sideCount: 5,
  borderRadius: 10,
  cx: 150,
  cy: 150
})

// set this to the "d" attribute of a <path> SVG element
```


## Demos

- [Codepen (UMD)](https://codepen.io/shreshthmohan/pen/mdpqaPY)
- [Observable - Interactive](https://observablehq.com/@shreshthmohan/curved-polygon)
