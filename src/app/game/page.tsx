'use client'
import React, { useState } from 'react';
import { Grid, Typography, Box, Button, } from '@mui/material';
import { useSearchParams } from "next/navigation";
import Link from 'next/link';
const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371; // 地球の半径(km)
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // 距離(km)
};
export default function Game() {
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [distanceMessage, setDistanceMessage] = useState<string | null>(null);

    const searchParams = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const targetLat = lat ? parseFloat(lat) : 0;
    const targetLng = lng ? parseFloat(lng) : 0;
    const pictureURL = searchParams.get("pictureURL");
    const place = "金沢";
    const score = 10000;

    // スタイルを調整する
    const boxStyle = {
        bgcolor: '#f1d3b1',
        padding: 1,
        borderRadius: 2,
        mb: 1,
    };

    const handleCurrentPositionCheck = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                setError(null);
                // 距離を計算
                const distance = calculateDistance(position.coords.latitude, position.coords.longitude, targetLat, targetLng);
                setDistanceMessage(distance <= 1 ? "近いです" : "遠いです"); // 1km未満を「近い」と定義
            },
            (err) => {
                setError(`位置情報の取得に失敗しました: ${err.message}`);
                setLatitude(null);
                setLongitude(null);
            }
        );
    };
    const handleRouteClick = () => {
        if (lat && lng) {
            // Google Mapsへの経路検索のURLを構築
            const url = `https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${lat},${lng}&travelmode=driving`;
            // リンクに飛ばす
            window.open(url, '_blank');
        } else {
            console.error('緯度または経度の情報が不足しています');
        }
    };
    return (
        <Box sx={{
            width: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        }}
            alignItems="center"
        >
            <Grid container sx={{ maxWidth: 450 }} justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                    <Box sx={{ ...boxStyle, height: '7vh', fontSize: '1.5rem' }} display="flex" alignItems="center" justifyContent="center">
                        {place} スコア: {score}
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ ...boxStyle, height: '9vh', paddingX: 2.5 }} display="flex" alignItems="center" justifyContent="center">
                        <Grid container alignItems="center" sx={{ height: '100%' }}>
                            <Grid item xs={2.5}>
                                目的地
                            </Grid>
                            <Grid item xs={9.5} >
                                <Typography>緯度: {lat}<br></br></Typography>
                                <Typography>経度: {lng}</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>

                <Grid item xs={12} justifyContent="center">
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center', // This centers the content horizontally
                        width: '100%', // Ensures the Box takes full width
                        mb: 1,
                    }}>
                        <img
                            src={typeof pictureURL === 'string' ? pictureURL : '/default-image.jpg'}
                            alt="picture"
                            style={{
                                width: '50%', // Sets width to 50% of its parent
                                height: 'auto', // Keeps the aspect ratio
                                maxWidth: '100%' // Ensures the image does not exceed the width of the container
                            }}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Box sx={{ ...boxStyle, height: '5vh', paddingX: 3 }} display="flex" alignItems="center" justifyContent="center">
                        {/* <Typography variant="h6">{distanceMessage}</Typography> */}
                        <Typography variant="h6">近いです</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ ...boxStyle, height: '9vh' }} display="flex" alignItems="center" justifyContent="center">
                        <Grid container alignItems="center" sx={{ height: '100%', paddingX: 1.5 }}>
                            <Grid item xs={2.5}>
                                現在地
                            </Grid>
                            <Grid item xs={9.5} >
                                <Typography>緯度: {latitude}<br></br></Typography>
                                <Typography>経度: {longitude}</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>

                <Grid container item xs={12} spacing={1} justifyContent="center" sx={{ mb: 1 }}>
                    <Grid item xs={7} md={6}>
                        <Button variant="contained" fullWidth onClick={handleCurrentPositionCheck}
                            sx={{
                                padding: '6px',
                                backgroundColor: "#55645d", // ボタンの背景色を設定。
                                color: "white", // ボタンのテキスト色を設定。
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 161, 161, 0.8)', // ホバー時の背景色を少し明るくする
                                    color: 'black'
                                },
                            }}
                        >
                            <Typography variant="h6">現在の位置</Typography>
                        </Button>
                    </Grid>
                    <Grid item xs={5} md={6}>
                        <Button variant="contained" fullWidth onClick={handleRouteClick}
                            sx={{
                                padding: '6px',
                                backgroundColor: "#55645d", // ボタンの背景色を設定。
                                color: "white", // ボタンのテキスト色を設定。
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 161, 161, 0.8)', // ホバー時の背景色を少し明るくする
                                    color: 'black'
                                },
                            }}
                        >
                            <Typography variant="h6">経路</Typography>
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" fullWidth href='cameraPage'
                        sx={{
                            padding: '6px',
                            backgroundColor: "#55645d", // ボタンの背景色を設定。
                            color: "white", // ボタンのテキスト色を設定。
                            '&:hover': {
                                backgroundColor: 'rgba(255, 161, 161, 0.8)', // ホバー時の背景色を少し明るくする
                                color: 'black'
                            },
                        }}>
                        <Typography variant="h6">写真を撮る</Typography>
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
