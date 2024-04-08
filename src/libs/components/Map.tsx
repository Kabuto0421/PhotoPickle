/*Since the map was loaded on client side, 
we need to make this component client rendered as well*/
'use client'
import React, { useEffect, useState } from 'react';
//Map component Component from library
import { GoogleMap, Marker } from "@react-google-maps/api";

//Map's styling
const defaultMapContainerStyle = {
    width: '570px',
    height: '500px',
    borderRadius: '15px 15px 15px 15px',
};

//K2's coordinates
const defaultMapCenter = {
    lat: 36.561325,
    lng: 136.656205
}
interface Location {
    lat: number;
    lng: number;
}

interface MarkerData {
    id: number;
    position: Location;
}

// ランダムな位置を生成する関数
function getRandomLocation(center: Location, radius: number): Location {
    const y0 = center.lat;
    const x0 = center.lng;
    const rd = radius / 111300; // 約111300メートルで1度
    const u = Math.random();
    const v = Math.random();
    const w = rd * Math.sqrt(u);
    const t = 2 * Math.PI * v;
    const x = w * Math.cos(t);
    const y1 = w * Math.sin(t);
    const x1 = x / Math.cos(y0);

    return { lat: y0 + y1, lng: x0 + x1 };
}
//Default zoom level, can be adjusted
const defaultMapZoom = 12

//Map options
const defaultMapOptions = {
    zoomControl: true,
    tilt: 0,
    gestureHandling: 'auto',
    mapTypeId: 'roadmap',
};

export default function MapComponent() {
    const [markers, setMarkers] = useState<MarkerData[]>([]);

    useEffect(() => {
        // ランダムな位置に10個のマーカーを生成する
        const randomMarkers: MarkerData[] = Array.from({ length: 10 }, (_, index) => ({
            id: index,
            position: getRandomLocation(defaultMapCenter, 5000),
        }));

        setMarkers(randomMarkers);
    }, []);

    return (
        <div>
            <GoogleMap
                mapContainerStyle={defaultMapContainerStyle}
                center={defaultMapCenter}
                zoom={defaultMapZoom}
                options={defaultMapOptions}
            >
                {markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        position={marker.position}
                    />
                ))}
            </GoogleMap>
        </div>
    );
};
