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
const markers = [
    { id: 1, position: { lat: 35.6585805, lng: 139.7454329 } }, // 東京タワー
    { id: 2, position: { lat: 35.710063, lng: 139.8107 } }, // 東京スカイツリー
    // その他のマーカー
];
interface Location {
    lat: number;
    lng: number;
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
    const [randomLocation, setRandomLocation] = useState<Location>({ lat: 0, lng: 0 });

    useEffect(() => {
        const newLocation = getRandomLocation(defaultMapCenter, 5000); // 5000メートルの範囲でランダムな位置を生成
        setRandomLocation(newLocation);
    }, []);
    return (
        <div>
            <GoogleMap
                mapContainerStyle={defaultMapContainerStyle}
                center={defaultMapCenter}
                zoom={defaultMapZoom}
                options={defaultMapOptions}
            >
                {markers.map(marker => (
                    <Marker
                        key={marker.id}
                        position={marker.position}
                    />
                ))}
            </GoogleMap>
        </div>
    )
};
