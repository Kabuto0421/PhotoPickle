'use client'
import React, { useState } from 'react';
import { Button, Container, Typography, Grid, TextField, InputAdornment, Box } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DnsIcon from '@mui/icons-material/Dns';
import MapProvider from "@/providers/map-provider";
import MapComponent from "../libs/components/Map";
export default function Home() {

    const [mapVisible, setMapVisible] = useState(false);

    const handleStartButtonClick = () => {
        setMapVisible(true); // mapVisibleをtrueに更新する
    };
    return (

        <Container maxWidth="sm">
            <Grid container spacing={2} style={{ padding: '20px 0' }}>
                {/* スコア表示のBox */}
                <Grid item xs={12}>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        padding={2}
                        bgcolor="#424242"
                    >
                        <Typography variant="h6" color="common.white">
                            Score:
                        </Typography>
                        <TextField
                            InputProps={{
                                startAdornment: <InputAdornment position="start" />,
                                style: { color: '#fff' },
                            }}
                            variant="standard"
                            value="10000000"
                            disabled
                        />
                    </Box>

                </Grid>
                {/* 3つのボタンを横並び */}
                <Grid item xs={12} container spacing={0} justifyContent="center">
                    <Grid item xs={4} padding={1}>
                        <Button variant="contained" startIcon={<DnsIcon />} fullWidth size="large">
                            RANKING
                        </Button>
                    </Grid>
                    <Grid item xs={4} padding={1}>
                        <Button variant="contained" startIcon={<SportsEsportsIcon />} fullWidth size="large">
                            GAME
                        </Button>
                    </Grid>
                    <Grid item xs={4} padding={1}>
                        <Button variant="contained" startIcon={<AddPhotoAlternateIcon />} fullWidth size="large">
                            PICTURE
                        </Button>
                    </Grid>
                </Grid>
                {/* 条件付きレンダリングでMapProviderとStartボタンの表示を切り替える */}
                {mapVisible ? (
                    //map表示用のコンポーネント
                    <MapProvider>
                        <MapComponent />
                    </MapProvider>
                ) : (
                    <Grid item xs={12}>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            bgcolor="#eee"
                            style={{ height: '500px' }}
                        >
                            {/* StartボタンにonClickイベントハンドラを追加 */}
                            <Button variant="contained" color="primary" startIcon={<PlayArrowIcon />} onClick={handleStartButtonClick}>
                                Start
                            </Button>
                        </Box>
                    </Grid>
                )}
                {/* 下部ボタン二つ */}
                <Grid item xs={6}>
                    <Button variant="contained" fullWidth size="large">
                        Button 1
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" fullWidth size="large">
                        Button 2
                    </Button>
                </Grid>
            </Grid>

        </Container>

    );
}
