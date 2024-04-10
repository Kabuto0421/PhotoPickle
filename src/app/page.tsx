'use client'
import React, { useState } from 'react';
import { Button, Container, Typography, Grid, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import HistoryIcon from '@mui/icons-material/History';
import DnsIcon from '@mui/icons-material/Dns';
import MapProvider from "@/providers/map-provider";
import MapComponent from "../libs/components/Map";

export default function Home() {
    const [mapVisible, setMapVisible] = useState(false);

    const handleStartButtonClick = () => {
        setMapVisible(true); // mapVisibleをtrueに更新する
    };

    // アイコンのスタイル
    const iconStyle = {
        fontSize: '64px', // アイコンのサイズを大きくする
    };

    return (
        <Container maxWidth="sm">
            <Grid item xs={12}>
                <Grid container spacing={2} style={{ padding: '20px 0' }}>
                    {/* スコア表示部分 */}
                    <Grid item xs={9}>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            padding={2}
                            bgcolor="#F1D3B1"
                            sx={{ borderRadius: '16px', textAlign: 'center', width: '100%' }}
                        >
                            <Typography
                                variant="h3"
                                component="div"
                                sx={{
                                    fontWeight: 'bold',
                                    color: 'black',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%'
                                }}
                            >
                                Score: <Box component="span" sx={{ marginLeft: 1 }}>10000000</Box>
                            </Typography>
                        </Box>
                    </Grid>
                    {/* Personアイコン表示部分 */}
                    <Grid item xs={2.5}>
                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{
                                backgroundColor: "#F1D3B1",
                                color: "black",
                                fontSize: '20px', // テキストのサイズを大きくする
                                // アイコンのスタイルを直接ここに適用することもできる
                                '& .MuiSvgIcon-root': { fontSize: iconStyle.fontSize },
                            }}
                            centerRipple={true} // リップル効果を中心から
                        >
                            <PersonIcon /> {/* ボタンの子要素としてアイコンを直接配置 */}
                        </Button>
                    </Grid>
                </Grid>
                {/* 3つのボタンを横並び */}
                <Grid item xs={12} container spacing={0} justifyContent="center">
                    { /* ボタンのスタイルを統一して適用 */}
                    <Grid item xs={4} padding={1}>
                        <Button
                            variant="contained"
                            startIcon={<DnsIcon style={iconStyle} />}
                            fullWidth
                            size="large"
                            sx={{
                                backgroundColor: "#F1D3B1",
                                color: "black",
                                fontSize: '20px', // テキストのサイズを大きくする
                            }}
                        >

                        </Button>
                    </Grid>
                    <Grid item xs={4} padding={1}>
                        <Button
                            variant="contained"
                            startIcon={<SportsEsportsIcon style={iconStyle} />}
                            fullWidth
                            size="large"
                            sx={{
                                backgroundColor: "#F1D3B1",
                                color: "black",
                                fontSize: '20px', // テキストのサイズを大きくする
                            }}
                        >

                        </Button>
                    </Grid>
                    <Grid item xs={4} padding={1}>
                        <Button
                            variant="contained"
                            startIcon={<HistoryIcon style={iconStyle} />}
                            fullWidth
                            size="large"
                            sx={{
                                backgroundColor: "#F1D3B1",
                                color: "black",
                                fontSize: '20px', // テキストのサイズを大きくする
                            }}
                        >

                        </Button>
                    </Grid>
                </Grid>
                {/* 条件付きレンダリングでMapProviderとStartボタンの表示を切り替える */}
                {mapVisible ? (
                    <MapProvider>
                        <MapComponent />
                    </MapProvider>
                ) : (
                    <Grid item xs={12}>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            bgcolor="#F1D3B1"
                            style={{ height: '500px' }}
                            sx={{ borderRadius: '16px' }}
                        >
                            <Button
                                variant="contained"
                                startIcon={<PlayArrowIcon style={iconStyle} />}
                                onClick={handleStartButtonClick}
                                sx={{
                                    fontSize: '40px', // テキストのサイズを大きくする
                                    backgroundColor: '#55645D', // ボタンの背景色を設定
                                    color: 'white', // ボタンのテキスト色を白にする
                                    '&:hover': {
                                        backgroundColor: 'rgba(85, 100, 93, 0.8)', // ホバー時の背景色を少し明るくする
                                    },
                                }}
                            >
                                Start
                            </Button>
                        </Box>
                    </Grid>
                )}
            </Grid>
            <Grid item xs={12}>
                <Box style={{ height: '100px' }}></Box>
            </Grid>
        </Container>
    );
}
