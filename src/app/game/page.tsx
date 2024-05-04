'use client'
import React, { useState } from 'react';
import { Grid, Typography, Box, Button } from '@mui/material';
import { useSearchParams } from "next/navigation";
import { useMixContext } from "next-approuter-context";
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
        bgcolor: '#e0e0e0',
        padding: 1,
        my: 1,
        borderRadius: 2,
        textAlign: 'center',
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
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'auto',
        }}>
            <Grid container spacing={0.5} sx={{ maxWidth: 450, mx: 'auto' }}>
                <Grid item xs={12}>
                    <Box sx={{ ...boxStyle, my: 1 }}>
                        <Typography variant="h4" align="center">{place} スコア: {score}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={boxStyle}>
                        <Grid container>
                            <Grid item xs={2}>
                                <Typography variant="caption">目的地:</Typography>
                            </Grid>
                            <Grid item xs={10} >
                                <Typography variant="caption">緯度: {lat}<br></br></Typography>
                                <Typography variant="caption">経度: {lng}</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>


                <Grid item xs={12} justifyContent="center">
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center', // This centers the content horizontally
                        width: '100%' // Ensures the Box takes full width
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
                    <Box sx={boxStyle}>
                        <Typography variant="h6">{distanceMessage}</Typography>

                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={boxStyle}>
                        <Grid container>
                            <Grid item xs={2}>
                                <Typography variant="caption">現在地</Typography>
                            </Grid>
                            <Grid item xs={10} >
                                <Typography variant="caption">緯度: {latitude}<br></br></Typography>
                                <Typography variant="caption">経度:{longitude} </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>


                <Grid container item xs={12} justifyContent="center">
                    <Grid item xs={7} md={6}>
                        <Button variant="outlined" fullWidth sx={{ padding: '6px' }} onClick={handleCurrentPositionCheck}><Typography variant="h6">現在の位置</Typography></Button>
                    </Grid>
                    <Grid item xs={5} md={6}>
                        <Button variant="outlined" fullWidth sx={{ padding: '6px' }} onClick={handleRouteClick}>
                            <Typography variant="h6">経路</Typography>
                        </Button>
                    </Grid>
                </Grid>
                <Link href="cameraPage">
                    <Grid item xs={12}>
                        <Button variant="contained" fullWidth sx={{ padding: '6px' }}><Typography variant="h6">写真を撮る</Typography></Button>
                    </Grid>
                </Link>
            </Grid>
        </Box>
    );
}
