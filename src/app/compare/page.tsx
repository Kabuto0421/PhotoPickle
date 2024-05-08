'use client'
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { context } from '../context';
import Image from 'next/image'
export default function CameraPage() {
    const ctx = context();
    const targetImage = ctx.get().targetImage;
    const takePicture = ctx.get().takePicture;

    interface ImageCompareResponse {
        similarity_score: number;
    }

    async function compareImages(image_url1: string, image_url2: string): Promise<void> {
        console.log(image_url1)
        console.log(image_url2)
        try {
            const response = await fetch('https://compare-images.onrender.com/compare-images', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image_url1,
                    image_url2,
                }),
            });
            const data: ImageCompareResponse = await response.json();

            console.log("類似度スコア:", data.similarity_score);
            let similarity_scoreText: string = "";
            if (data.similarity_score < 18) {
                console.log("類似度スコアが18より低かったのでスコアに100点を追加します。");
            } else if (data.similarity_score < 30) {
                console.log("撮り直しまっしー");
            } else {
                console.log("だら！全然違うがいね！撮り直しまっし！");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    const handleSubmit = async () => {
        // const base64Data = takePicture.split(',')[1]; // プレフィックスを除去して、Base64エンコードされたデータのみを取得
        await compareImages(targetImage, takePicture)
    };
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
            <Button onClick={handleSubmit}>ああああ</Button>
        </Box>

    );
}
