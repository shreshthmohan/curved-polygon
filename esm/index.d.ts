interface PolygonData {
    d: string;
    errors?: string[];
    meta?: {
        inRadius: number;
        sideLength: number;
        circumRadius: number;
        borderRadius: number;
        minSideLength: number;
    };
    warnings?: string[];
}
export declare function roundedPolygonBySideLength({ sideLength, sideCount, borderRadius, cx, cy, rotate, }: {
    sideLength: number;
    sideCount: number;
    borderRadius?: number;
    cx?: number;
    cy?: number;
    rotate?: number;
}): PolygonData;
export declare function roundedPolygonByCircumRadius({ circumRadius, sideCount, borderRadius, cx, cy, rotate, }: {
    circumRadius: number;
    sideCount: number;
    borderRadius?: number;
    cx?: number;
    cy?: number;
    rotate?: number;
}): {
    d: string;
    errors: string[];
    meta?: undefined;
    warnings?: undefined;
} | {
    d: string;
    meta: {
        circumRadius: number;
        inRadius: number;
        sideLength: number;
        borderRadius: number;
        minSideLength: number;
    };
    warnings: string[];
    errors?: undefined;
};
export {};
