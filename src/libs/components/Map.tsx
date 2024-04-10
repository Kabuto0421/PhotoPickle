/*Since the map was loaded on client side, 
we need to make this component client rendered as well*/
'use client'
import React, { useEffect, useState, useCallback } from 'react';
//Map component Component from library
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { Box, Button, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import NextLink from 'next/link'
// Googleマップのスタイルを定義
const defaultMapContainerStyle = {
    width: '95vw', // ビューポート幅の80%に
    height: '95vh', // ビューポート高さの50%に
    borderRadius: '15px',
};

// マップのデフォルトの中心位置を定義（ここでは金沢の座標を使用）
const defaultMapCenter = {
    lat: 36.561325,
    lng: 136.656205
}

// 位置とマーカーデータのためのTypeScriptインターフェース
interface Location {
    lat: number;
    lng: number;
}

interface MarkerData {
    id: number;
    position: Location;
}

// 与えられた中心位置からランダムな位置を生成する関数
function getRandomLocation(center: Location, radius: number): Location {
    const y0 = center.lat;
    const x0 = center.lng;
    // 約111300メートルで1度
    const rd = radius / 111300;
    const u = Math.random();
    const v = Math.random();
    const w = rd * Math.sqrt(u);
    const t = 2 * Math.PI * v;
    const x = w * Math.cos(t);
    const y1 = w * Math.sin(t);
    const x1 = x / Math.cos(y0);

    return { lat: y0 + y1, lng: x0 + x1 };
}

// マップのデフォルトのズームレベルとオプション
const defaultMapZoom = 12
const defaultMapOptions = {
    zoomControl: true,
    tilt: 0,
    gestureHandling: 'auto',
    mapTypeId: 'roadmap',
};

// Google Street Viewの画像を取得する関数
function getStreetViewImage(location: Location, size: string = "400x400"): string {
    return `https://maps.googleapis.com/maps/api/streetview?size=${size}&location=${location.lat},${location.lng}&key=AIzaSyBiHBkYrPgCds4ZjiNOJKYjxl90VzJvVns`;
}

// MapComponentの定義
export default function MapComponent() {
    // マーカーと選択された位置の状態
    const [markers, setMarkers] = useState<MarkerData[]>([]);
    const [selectedPosition, setSelectedPosition] = useState<Location | null>(null);
    const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);

    // コンポーネントのマウント時にマーカーを追加する
    useEffect(() => {
        const service = new google.maps.StreetViewService();

        // 与えられた位置にStreet Viewが存在するかを確認する関数
        const checkStreetViewAvailability = (location: Location, radius: number): Promise<google.maps.LatLng | null> => {
            return new Promise(resolve => {
                service.getPanorama({ location, radius }, (data, status) => {
                    if (status === google.maps.StreetViewStatus.OK) {
                        // data.location.latLng が undefined ではないことを確認
                        if (data != null && data.location !== undefined && data.location.latLng !== undefined) {
                            resolve(data.location.latLng);
                        } else {
                            // data.location.latLng が undefined の場合、null を resolve する
                            console.log("data.location.latLng is undefined");
                            resolve(null);
                        }
                    } else {
                        resolve(null);
                    }
                });
            });
        };

        // ランダムな位置にStreet Viewが存在するマーカーを10個追加する関数
        const addMarkers = async () => {
            const newMarkers: MarkerData[] = [];
            while (newMarkers.length < 10) {
                const randomLocation = getRandomLocation(defaultMapCenter, 5000);
                const result = await checkStreetViewAvailability(randomLocation, 50);
                if (result) {
                    newMarkers.push({
                        id: newMarkers.length,
                        position: result.toJSON()
                    });
                }
            }
            setMarkers(newMarkers);
        };

        addMarkers();
    }, []);

    // マーカーをクリックした時に実行される関数
    function handleMarkerClick(markerId: number, position: Location) {
        // 選択された位置に基づいてStreet View画像のURLを取得
        const imageUrl = getStreetViewImage(position);
        // コンソールに画像のURLを表示
        console.log(imageUrl);

        const adjustedPosition = {
            lat: position.lat + 0.005, // 緯度を少し増やす
            lng: position.lng
        };
        /*選択された位置を保存(緯度経度)*/
        setSelectedMarkerId(markerId);
        setSelectedPosition(adjustedPosition); // 調整された位置を設定
    }

    return (
        <div>
            <GoogleMap
                mapContainerStyle={defaultMapContainerStyle}
                center={defaultMapCenter}
                zoom={defaultMapZoom}
                options={defaultMapOptions}
            >
                {markers.map((marker: MarkerData) => (
                    <Marker
                        key={marker.id}
                        position={marker.position}
                        onClick={() => handleMarkerClick(marker.id, marker.position)}
                    />
                ))}

                {selectedMarkerId !== null && selectedPosition && (
                    <InfoWindow
                        position={{ lat: selectedPosition.lat, lng: selectedPosition.lng }}
                        onCloseClick={() => setSelectedMarkerId(null)}
                    >
                        <div>このピンをクリックしてるよ!
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 120,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1000, // Mapの上に表示
                    ...(selectedMarkerId === null && {
                        bgcolor: blue[500], // 背景色を青に設定
                        color: 'white', // テキスト色を白に設定
                        padding: 1, // パディングを追加
                        borderRadius: '4px', // 角の丸みを追加
                    }),
                }}
            >
                {selectedMarkerId === null ? (
                    <Typography variant="h6">ピンを選択してください。</Typography>
                ) : (
                    <NextLink href="/game">
                        <Button variant="contained" color="primary" onClick={() => {
                            console.log("このピンを選択する！", selectedPosition);
                            // ここにピンを選択したときの処理を追加
                        }}>
                            <Typography variant="h6">このピンを選択する！</Typography>
                        </Button>
                    </NextLink>
                )}
            </Box>

        </div>
    );

};
