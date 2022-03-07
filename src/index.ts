// TODO alt function with input  circumCircleRadius instead of sideLength

// It's weird to create two types that are identical but have different names
type PolarPoint = [number, number]
type CartesianPoint = [number, number]

const PI = Math.PI

// returns the d attribute used for SVG <path> element
export function roundedPolygonBySideLength({
  sideLength,
  sideCount = 3,
  borderRadius = 0,
  cx = 0,
  cy = 0,
}: {
  sideLength: number
  sideCount: number
  borderRadius?: number
  cx?: number
  cy?: number
}): string {
  const { circumcircleRadius: r, angleIntendedBySide: alpha } =
    polygonSideToCircleRadius({ sideLength, sideCount })

  // polygon on which the centres of border circles lie
  const radiusOfInnerPolygon = r - borderRadius / Math.cos(alpha / 2)

  const allPoints = getAllPointsOnCurvedPolygon({
    sideCount,
    radiusOfInnerPolygon,
    borderRadius,
    alpha,
    cx,
    cy,
  })

  const dForPath: string = pointsToDForPath({ allPoints, borderRadius, alpha })
  return dForPath
}

export function roundedPolygonByCircumRadius({
  circumRadius,
  sideCount = 3,
  borderRadius = 0,
  cx = 0,
  cy = 0,
}: {
  circumRadius: number
  sideCount: number
  borderRadius?: number
  cx?: number
  cy?: number
}) {
  const alpha = angleIntendedByPolygonSide(sideCount)

  const radiusOfInnerPolygon = circumRadius - borderRadius / Math.cos(alpha / 2)

  const allPoints = getAllPointsOnCurvedPolygon({
    sideCount,
    radiusOfInnerPolygon,
    borderRadius,
    alpha,
    cx,
    cy,
  })

  const dForPath: string = pointsToDForPath({ allPoints, borderRadius, alpha })
  return dForPath
}

// returns d attribute used in the SVG <path> element
function pointsToDForPath({
  allPoints,
  borderRadius,
  alpha,
}: {
  allPoints: CartesianPoint[]
  borderRadius: number
  alpha: number
}): string {
  // M move to first point
  // A draw elleptical arc to point
  // L draw straight line to point
  if (!allPoints.length) return ''
  return `M ${allPoints[0].join(' ')}
    ${allPoints
      .slice(1)
      .map((p, i) =>
        i % 2 === 0
          ? `A ${borderRadius} ${borderRadius} ${alpha} 0 0 ${p.join(' ')}`
          : `L ${p.join(' ')}`,
      )
      .join(' ')}
    z
    `
}

function getAllPointsOnCurvedPolygon({
  sideCount,
  radiusOfInnerPolygon,
  borderRadius,
  alpha,
  cx = 0,
  cy = 0,
}: {
  sideCount: number
  radiusOfInnerPolygon: number
  borderRadius: number
  alpha: number
  cx?: number
  cy?: number
}): CartesianPoint[] {
  const allPoints = []

  for (let i = 0; i < sideCount; i++) {
    const curveStartPoint = addPolarPointVectorsAndConvertToCartesian(
      [i * alpha + alpha / 2, radiusOfInnerPolygon],
      [i * alpha, borderRadius],
    )
    const curveEndPoint = addPolarPointVectorsAndConvertToCartesian(
      [i * alpha + alpha / 2, radiusOfInnerPolygon],
      [(i + 1) * alpha, borderRadius],
    )
    allPoints.push(curveStartPoint, curveEndPoint)
  }

  const allShiftedPoints: CartesianPoint[] = allPoints.map(([x, y]) => [
    x + cx,
    y + cy,
  ])
  return allShiftedPoints
}

function angleIntendedByPolygonSide(sideCount: number): number {
  return (2 * PI) / sideCount
}

function polygonSideToCircleRadius({
  sideLength,
  sideCount,
}: {
  sideLength: number
  sideCount: number
}): { circumcircleRadius: number; angleIntendedBySide: number } {
  // angle intended by side of polygon onto the circumscribed circle
  // unit: radians
  // alias: alpha
  const angleIntendedBySide = angleIntendedByPolygonSide(sideCount)

  const circumcircleRadius =
    sideLength / (2 * Math.sin(angleIntendedBySide / 2))

  return { circumcircleRadius, angleIntendedBySide }
}

// Did not keep it in polar, because the calculation gets complicated
function addPolarPointVectorsAndConvertToCartesian(
  p1: PolarPoint,
  p2: PolarPoint,
): CartesianPoint {
  // TODO: what does 0 radian correspond to?
  const [a1, r1] = p1
  const [a2, r2] = p2

  const y1 = r1 * Math.cos(a1)
  const y2 = r2 * Math.cos(a2)

  const x1 = r1 * Math.sin(a1)
  const x2 = r2 * Math.sin(a2)

  return [x1 + x2, y1 + y2]
}
