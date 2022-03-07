// TODO alt function with input  circumCircleRadius instead of sideLength
var PI = Math.PI;
// returns the d attribute used for SVG <path> element
export function roundedPolygonBySideLength(_a) {
    var sideLength = _a.sideLength, _b = _a.sideCount, sideCount = _b === void 0 ? 3 : _b, _c = _a.borderRadius, borderRadius = _c === void 0 ? 0 : _c, _d = _a.cx, cx = _d === void 0 ? 0 : _d, _e = _a.cy, cy = _e === void 0 ? 0 : _e;
    var _f = polygonSideToCircleRadius({ sideLength: sideLength, sideCount: sideCount }), r = _f.circumcircleRadius, alpha = _f.angleIntendedBySide;
    // polygon on which the centres of border circles lie
    var radiusOfInnerPolygon = r - borderRadius / Math.cos(alpha / 2);
    var allPoints = getAllPointsOnCurvedPolygon({
        sideCount: sideCount,
        radiusOfInnerPolygon: radiusOfInnerPolygon,
        borderRadius: borderRadius,
        alpha: alpha,
        cx: cx,
        cy: cy
    });
    var dForPath = pointsToDForPath({ allPoints: allPoints, borderRadius: borderRadius, alpha: alpha });
    return dForPath;
}
export function roundedPolygonByCircumRadius(_a) {
    var circumRadius = _a.circumRadius, _b = _a.sideCount, sideCount = _b === void 0 ? 3 : _b, _c = _a.borderRadius, borderRadius = _c === void 0 ? 0 : _c, _d = _a.cx, cx = _d === void 0 ? 0 : _d, _e = _a.cy, cy = _e === void 0 ? 0 : _e;
    var alpha = angleIntendedByPolygonSide(sideCount);
    var radiusOfInnerPolygon = circumRadius - borderRadius / Math.cos(alpha / 2);
    var allPoints = getAllPointsOnCurvedPolygon({
        sideCount: sideCount,
        radiusOfInnerPolygon: radiusOfInnerPolygon,
        borderRadius: borderRadius,
        alpha: alpha,
        cx: cx,
        cy: cy
    });
    var dForPath = pointsToDForPath({ allPoints: allPoints, borderRadius: borderRadius, alpha: alpha });
    return dForPath;
}
// returns d attribute used in the SVG <path> element
function pointsToDForPath(_a) {
    var allPoints = _a.allPoints, borderRadius = _a.borderRadius, alpha = _a.alpha;
    // M move to first point
    // A draw elleptical arc to point
    // L draw straight line to point
    if (!allPoints.length)
        return '';
    return "M ".concat(allPoints[0].join(' '), "\n    ").concat(allPoints
        .slice(1)
        .map(function (p, i) {
        return i % 2 === 0
            ? "A ".concat(borderRadius, " ").concat(borderRadius, " ").concat(alpha, " 0 0 ").concat(p.join(' '))
            : "L ".concat(p.join(' '));
    })
        .join(' '), "\n    z\n    ");
}
function getAllPointsOnCurvedPolygon(_a) {
    var sideCount = _a.sideCount, radiusOfInnerPolygon = _a.radiusOfInnerPolygon, borderRadius = _a.borderRadius, alpha = _a.alpha, _b = _a.cx, cx = _b === void 0 ? 0 : _b, _c = _a.cy, cy = _c === void 0 ? 0 : _c;
    var allPoints = [];
    for (var i = 0; i < sideCount; i++) {
        var curveStartPoint = addPolarPointVectorsAndConvertToCartesian([i * alpha + alpha / 2, radiusOfInnerPolygon], [i * alpha, borderRadius]);
        var curveEndPoint = addPolarPointVectorsAndConvertToCartesian([i * alpha + alpha / 2, radiusOfInnerPolygon], [(i + 1) * alpha, borderRadius]);
        allPoints.push(curveStartPoint, curveEndPoint);
    }
    var allShiftedPoints = allPoints.map(function (_a) {
        var x = _a[0], y = _a[1];
        return [
            x + cx,
            y + cy,
        ];
    });
    return allShiftedPoints;
}
function angleIntendedByPolygonSide(sideCount) {
    return (2 * PI) / sideCount;
}
function polygonSideToCircleRadius(_a) {
    var sideLength = _a.sideLength, sideCount = _a.sideCount;
    // angle intended by side of polygon onto the circumscribed circle
    // unit: radians
    // alias: alpha
    var angleIntendedBySide = angleIntendedByPolygonSide(sideCount);
    var circumcircleRadius = sideLength / (2 * Math.sin(angleIntendedBySide / 2));
    return { circumcircleRadius: circumcircleRadius, angleIntendedBySide: angleIntendedBySide };
}
// Did not keep it in polar, because the calculation gets complicated
function addPolarPointVectorsAndConvertToCartesian(p1, p2) {
    // TODO: what does 0 radian correspond to?
    var a1 = p1[0], r1 = p1[1];
    var a2 = p2[0], r2 = p2[1];
    var y1 = r1 * Math.cos(a1);
    var y2 = r2 * Math.cos(a2);
    var x1 = r1 * Math.sin(a1);
    var x2 = r2 * Math.sin(a2);
    return [x1 + x2, y1 + y2];
}
