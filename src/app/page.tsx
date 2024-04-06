import * as React from 'react';
import { Button, Container, Typography, Grid, TextField, InputAdornment, Box } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import HomeIcon from '@mui/icons-material/Home';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PeopleIcon from '@mui/icons-material/People';

export default function Home() {
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
                <Grid item xs={4}>
                    <Button variant="contained" startIcon={<MapIcon />}>
                        Map
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" startIcon={<HomeIcon />}>
                        Home
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" startIcon={<PeopleIcon />}>
                        Profile
                    </Button>
                </Grid>
                {/* Map表示用の余白 */}
                <Grid item xs={12}>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bgcolor="#eee"
                        style={{ height: '500px' }}
                    >
                        {/* Startボタン */}
                        <Button variant="contained" color="primary" startIcon={<PlayArrowIcon />}>
                            Start
                        </Button>
                    </Box>
                </Grid>
                {/* 下部ボタン二つ */}
                <Grid item xs={6}>
                    <Button variant="contained" fullWidth>
                        Button 1
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" fullWidth>
                        Button 2
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}
