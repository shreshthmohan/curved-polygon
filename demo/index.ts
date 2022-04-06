import {
  roundedPolygonByCircumRadius,
  roundedPolygonBySideLength,
} from '../src/index'

const d1 = roundedPolygonByCircumRadius({
  circumRadius: 80,
  sideCount: 3,
  rotate: 0,
  cx: 120,
  cy: 150,
  borderRadius: 15,
})
const d2 = roundedPolygonBySideLength({
  sideLength: 130,
  sideCount: 3,
  rotate: 30,
  cx: 300,
  cy: 150,
  borderRadius: -17.5,
})

console.log({ d1 })
console.log({ d2 })

document.getElementById('polygon1').setAttribute('d', d1.d)
document.getElementById('polygon2').setAttribute('d', d2.d)
