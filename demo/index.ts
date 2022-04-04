import { roundedPolygonByCircumRadius } from 'curved-polygon'

const d1 = roundedPolygonByCircumRadius({
  circumRadius: 80,
  sideCount: 3,
  rotate: 0,
  cx: 120,
  cy: 150,
  borderRadius: 10,
})
const d2 = roundedPolygonByCircumRadius({
  circumRadius: 80,
  sideCount: 3,
  rotate: 90,
  cx: 300,
  cy: 150,
  borderRadius: 10,
})

document.getElementById('polygon1').setAttribute('d', d1)
document.getElementById('polygon2').setAttribute('d', d2)
