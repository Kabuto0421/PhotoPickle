'use client'
import React from 'react';
import { Grid, Typography, Box, Button } from '@mui/material';
import { useSearchParams } from "next/navigation";

export default function Game() {
    const searchParams = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
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
                        <Typography variant="h6">近いです</Typography>

                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={boxStyle}>
                        <Grid container>
                            <Grid item xs={2}>
                                <Typography variant="caption">現在地</Typography>
                            </Grid>
                            <Grid item xs={10} >
                                <Typography variant="caption">緯度: <br></br></Typography>
                                <Typography variant="caption">経度: </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>


                <Grid container item xs={12} justifyContent="center">
                    <Grid item xs={7} md={6}>
                        <Button variant="outlined" fullWidth sx={{ padding: '6px' }}><Typography variant="h6">現在の位置</Typography></Button>
                    </Grid>
                    <Grid item xs={5} md={6}>
                        <Button variant="outlined" fullWidth sx={{ padding: '6px' }} onClick={handleRouteClick}>
                            <Typography variant="h6">経路</Typography>
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" fullWidth sx={{ padding: '6px' }}><Typography variant="h6">写真を撮る</Typography></Button>
                </Grid>
            </Grid>
        </Box>
    );
}
