/*Since the map was loaded on client side, 
we need to make this component client rendered as well*/
'use client'
import React, { useEffect, useState, useCallback } from 'react';
//Map component Component from library
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { Box, Button, Typography, TextField } from '@mui/material';
import { blue } from '@mui/material/colors';
import { context } from '@/app/context';
import Link from "next/link";
// Googleマップのスタイルを定義
const defaultMapContainerStyle = {
    width: '95vw', // ビューポート幅の80%に
    height: '95vh', // ビューポート高さの50%に
    borderRadius: '15px',
};

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
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
    if (!apiKey) {
        throw new Error('Google Maps APIキーが設定されていません');
    }
    return `https://maps.googleapis.com/maps/api/streetview?size=${size}&location=${location.lat},${location.lng}&key=${apiKey}`;
}

// MapComponentの定義
export default function MapComponent() {
    // マーカーと選択された位置の状態
    const [markers, setMarkers] = useState<MarkerData[]>([]);
    const [selectedPosition, setSelectedPosition] = useState<Location | null>(null);
    const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);
    const [selectedMarkerPicture, setSelectedMarkerPicture] = useState<string | null>(null);
    const [seed, setSeed] = useState('');

    const [mapCenter, setMapCenter] = useState({
        lat: 0,
        lng: 0
    });
    const photoContext = context();
    // コンポーネントのマウント時にマーカーを追加する
    const handleSeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSeed(event.target.value);
    };

    // Seed値を使用してマーカーを生成するハンドラ
    const handleSubmitSeed = () => {
        // Seed値を使用して何か処理を行う
        console.log("Submitted Seed:", seed);
        // ここでマーカーの位置を計算して更新するなどの処理を追加
    };
    useEffect(() => {
        // 初期マウント時にランダムなseed値を生成
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        setSeed(array[0].toString());
    }, []);
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                setMapCenter({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            }, () => {
                console.error("位置情報の取得に失敗しました。");
            });
        }
    }, []);

    useEffect(() => {
        const service = new google.maps.StreetViewService();

        const checkStreetViewAvailability = (location: Location, radius: number): Promise<google.maps.LatLng | null> => {
            return new Promise(resolve => {
                service.getPanorama({ location, radius }, (data, status) => {
                    if (status === google.maps.StreetViewStatus.OK) {
                        if (data != null && data.location !== undefined && data.location.latLng !== undefined) {
                            resolve(data.location.latLng);
                        } else {
                            console.log("data.location.latLng is undefined");
                            resolve(null);
                        }
                    } else {
                        resolve(null);
                    }
                });
            });
        };
        const addMarkers = async () => {
            const newMarkers: MarkerData[] = [];

            if (mapCenter.lat !== 0 || mapCenter.lng !== 0) {
                while (newMarkers.length < 10) {
                    const randomLocation = getRandomLocation(mapCenter, 5000);
                    const result = await checkStreetViewAvailability(randomLocation, 50);
                    if (result) {
                        newMarkers.push({
                            id: newMarkers.length,
                            position: result.toJSON()
                        });
                    }
                }
                setMarkers(newMarkers);
            }
        };

        addMarkers();
    }, [mapCenter]);



    // マーカーをクリックした時に実行される関数
    function handleMarkerClick(markerId: number, position: Location) {
        // 選択された位置に基づいてStreet View画像のURLを取得
        const imageUrl = getStreetViewImage(position);
        photoContext.set({ targetImage: imageUrl })
        // コンソールに画像のURLを表示


        const adjustedPosition = {
            lat: position.lat + 0.005, // 緯度を少し増やす
            lng: position.lng
        };
        /*選択された位置を保存(緯度経度)*/
        setSelectedMarkerId(markerId);
        setSelectedPosition(adjustedPosition); // 調整された位置を設定
        /*選択されたマーカー付近の写真*/
        setSelectedMarkerPicture(imageUrl);
    }
    /*ピンを選択した時に動く関数*/
    function handleChoice() {
        console.log("このピンを選択する！", selectedPosition);
        console.log(markers);
        console.log(seed);
        // ここにピンを選択したときの処理を追加
        // markers...
    }

    return (
        <div>
            <GoogleMap
                mapContainerStyle={defaultMapContainerStyle}
                center={mapCenter}
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
                <Box
                    sx={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        zIndex: 1000, // Make sure it's above the map
                        backgroundColor: 'white', // 背景色を白に設定
                        padding: 1, // 内部のパディングを設定
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // 影を付ける
                        borderRadius: '4px', // 角を丸くする
                    }}
                >
                    <TextField
                        label="Seed値"
                        variant="outlined"
                        value={seed}
                        onChange={handleSeedChange}
                        size="small"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmitSeed}
                        sx={{ ml: 1 }}
                    >
                        更新
                    </Button>
                </Box>
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
                    <Link href={{
                        pathname: "/game", query: {
                            lat: selectedPosition?.lat,
                            lng: selectedPosition?.lng,
                            pictureURL: selectedMarkerPicture,
                        }
                    }}>
                        <Button variant="contained" color="primary" onClick={() => { handleChoice }}>
                            <Typography variant="h6">このピンを選択する！</Typography>
                        </Button>
                    </Link>
                )}
            </Box>

        </div>
    );

};
