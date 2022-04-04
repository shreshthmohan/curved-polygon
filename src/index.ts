// It's weird to create two types that are identical but have different names
type PolarPoint = [number, number] // angle in radians, radius / length of vector
type CartesianPoint = [number, number] // x, y

const PI = Math.PI

function sideLengthFromInRadius({
  inRadius,
  anglePerSide,
}: {
  inRadius: number
  anglePerSide: number
}) {
  const sideLength = inRadius * 2 * Math.tan(anglePerSide / 2)
  return sideLength
}

// returns the d attribute used for SVG <path> element
export function roundedPolygonBySideLength({
  sideLength,
  sideCount = 3,
  borderRadius = 0,
  cx = 0,
  cy = 0,
  rotate = 0, // angle in degrees
}: {
  sideLength: number
  sideCount: number
  borderRadius?: number
  cx?: number
  cy?: number
  rotate?: number
}): {
  d: string
  errors?: string[]
  meta?: {
    inRadius: number
    sideLength: number
    circumRadius: number
    borderRadius: number
    minSideLength: number
  }
  warnings?: string[]
} {
  const errors = []
  const warnings = []

  if (sideCount < 3) {
    errors.push(
      'sideCount cannot be smaller than 3. There is no polygon with fewer sides than a triangle. No fun shapes here. :) Sorry!',
    )
  }
  if (errors.length) {
    return { d: '', errors }
  }

  const {
    circumRadius: r,
    angleIntendedBySide: alpha,
    inRadius,
  } = polygonSideToCircleRadius({ sideLength, sideCount })

  const minSideLength = sideLengthFromInRadius({
    inRadius: borderRadius,
    anglePerSide: alpha,
  })

  if (borderRadius > inRadius) {
    warnings.push(
      `borderRadius(${borderRadius}) is larger than inradius(${inRadius}) of the polygon. The resulting shape won't really be a polygon.
      To get a proper curved polygon, either make the border radius smaller than ${inRadius} or make the sideLength larger than ${minSideLength}.
      Ignore this warning if you intentionally want this curious pattern.
      `,
    )
  }

  if (borderRadius < 0) {
    warnings.push(
      'You provided a negative borderRadius. Might produce an unexpected shape that is not a polygon. Ignore this warning if this was intentional.',
    )
  }

  // polygon on which the centres of border circles lie
  const radiusOfInnerPolygon = r - borderRadius / Math.cos(alpha / 2)

  // convert to radians
  rotate = (rotate * PI) / 180

  const allPoints = getAllPointsOnCurvedPolygon({
    sideCount,
    radiusOfInnerPolygon,
    borderRadius,
    alpha,
    rotate,
    cx,
    cy,
  })

  const dForPath: string = pointsToDForPath({ allPoints, borderRadius, alpha })
  return {
    d: dForPath,
    meta: {
      circumRadius: r,
      inRadius,
      sideLength,
      borderRadius,
      minSideLength,
    },
    warnings,
  }
}

export function roundedPolygonByCircumRadius({
  circumRadius,
  sideCount = 3,
  borderRadius = 0,
  cx = 0,
  cy = 0,
  rotate = 0,
}: {
  circumRadius: number
  sideCount: number
  borderRadius?: number
  cx?: number
  cy?: number
  rotate?: number
}) {
  const alpha = angleIntendedByPolygonSide(sideCount) // in radians

  const radiusOfInnerPolygon = circumRadius - borderRadius / Math.cos(alpha / 2)

  // convert to radians
  rotate = (rotate * PI) / 180

  const allPoints = getAllPointsOnCurvedPolygon({
    sideCount,
    radiusOfInnerPolygon,
    borderRadius,
    alpha,
    rotate,
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
  return `M ${allPoints[0].join(' ')} ${allPoints
    .slice(1)
    .map((p, i) =>
      i % 2 === 0
        ? `A ${borderRadius} ${borderRadius} ${alpha} 0 0 ${p.join(' ')}`
        : `L ${p.join(' ')}`,
    )
    .join(' ')} z`
}

function getAllPointsOnCurvedPolygon({
  sideCount,
  radiusOfInnerPolygon,
  borderRadius,
  alpha, // in radians
  cx = 0,
  cy = 0,
  rotate,
}: {
  sideCount: number
  radiusOfInnerPolygon: number
  borderRadius: number
  alpha: number
  rotate: number
  cx?: number
  cy?: number
}): CartesianPoint[] {
  const allPoints = []

  for (let i = 0; i < sideCount; i++) {
    const curveStartPoint = addPolarPointVectorsAndConvertToCartesian(
      // rotation is anti-clockwise, so reversing sign
      [i * alpha + alpha / 2 - rotate, radiusOfInnerPolygon],
      [i * alpha - rotate, borderRadius],
    )
    const curveEndPoint = addPolarPointVectorsAndConvertToCartesian(
      // rotation is anti-clockwise, so reversing sign
      [i * alpha + alpha / 2 - rotate, radiusOfInnerPolygon],
      [(i + 1) * alpha - rotate, borderRadius],
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
}): { circumRadius: number; angleIntendedBySide: number; inRadius: number } {
  // angle intended by side of polygon onto the circumscribed circle
  // unit: radians
  // alias: alpha
  const angleIntendedBySide = angleIntendedByPolygonSide(sideCount)

  const circumRadius = sideLength / (2 * Math.sin(angleIntendedBySide / 2))

  const inRadius = sideLength / (2 * Math.tan(angleIntendedBySide / 2))

  return { circumRadius, angleIntendedBySide, inRadius }
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
