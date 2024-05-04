'use client'
import React from 'react';
import { Box, Typography } from '@mui/material';
import { context } from '../context';
import Image from 'next/image'
export default function CameraPage() {
    const ctx = context();
    const targetImage = ctx.get().targetImage;
    const takePicture = ctx.get().takePicture;

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            bgcolor: 'background.paper',
            p: 3
        }}>
            <Typography variant="h4" gutterBottom>目的画像</Typography>
            {targetImage ? (
                <img src={targetImage} alt="Target" />
            ) : (
                <Typography>画像がありません</Typography>
            )}
            <Typography variant="h4" gutterBottom>最近撮影された画像</Typography>
            {takePicture ? (
                <Image
                    src={takePicture}
                    alt="Picture of the author"
                    width={400}
                    height={400}
                />
            ) :
                <Typography >
                    画像がありません
                </Typography>
            }
        </Box>
    );
}
