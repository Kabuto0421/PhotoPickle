"use client"
import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import Image from 'next/image';
import { truncate } from 'fs';
import Link from 'next/link';
export default function ComparePage() {
    const [targetImage, setTargetImage] = useState<string>("");
    const [takePicture, setTakePicture] = useState<string>("");

    const [matchRate, setMatchRate] = useState<number>(Math.random() * 100);
    const [highScoreAchieved, setHighScoreAchieved] = useState<boolean>(false);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | number | undefined>(undefined);

    useEffect(() => {
        const storedTargetImage = localStorage.getItem('targetImage');
        if (storedTargetImage) {
            setTargetImage(storedTargetImage);
        }
        const storedTakePicture = localStorage.getItem('takePicture');
        if (storedTakePicture) {
            setTakePicture(storedTakePicture);
        }
        const id = setInterval(() => {
            setMatchRate(Math.random() * 100);
        }, 100);
        setIntervalId(id);
        return () => clearInterval(id);
    }, []);
    async function compareImages(image_url1: string, image_url2: string): Promise<void> {
        try {
            const response = await fetch('https://v118-27-6-221.3eg2.static.cnode.io/compare-images', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image_url1,
                    image_url2,
                }),
            });
            const data = await response.json();
            const similarityScore = parseFloat(data.similarity_score);

            if (isNaN(similarityScore)) {
                console.error("Received an invalid similarity score:", data.similarity_score);
                setMatchRate(0.00);
            } else {
                const baseScore = 19;
                const maxScore = 29;
                const matchScore = Math.max(0, 100 * (1 - (similarityScore - baseScore) / (maxScore - baseScore)));
                if (matchScore >= 90) {
                    setHighScoreAchieved(true);
                }
                if (matchScore >= 100) {
                    setMatchRate(100.00);
                } else {
                    setMatchRate(parseFloat(matchScore.toFixed(2)));
                }
            }
        } catch (error) {
            console.error('Error:', error);
            setMatchRate(0.00);
        }
    }

    const handleSubmit = async () => {
        if (highScoreAchieved) {
            // スコアが90以上で「次に進む」の処理
            // ここに次のステップに進むためのコードを書く
            localStorage.removeItem('targetImage');
            localStorage.removeItem('takePicture');
            console.log("ローカルストレージから画像データが削除されました。");
            console.log("次に進む処理を実行");
        } else {
            // 通常の「ぴっくるん！」の処理
            await compareImages(targetImage, takePicture);
        }
    };


    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            bgcolor: 'background.default',
            p: 3,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
        }}>
            {highScoreAchieved && (
                <Box sx={{
                    mb: 3,
                    p: 1,
                    bgcolor: 'lightgreen',
                    borderRadius: '5px',
                    boxShadow: '0px 2px 5px rgba(0,0,0,0.3)'
                }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'darkgreen' }}>
                        スコア獲得！
                    </Typography>
                </Box>
            )}
            <Box sx={{
                mb: 3,
                mt: highScoreAchieved ? 1 : 5,
                p: 1,
                bgcolor: 'rgba(173, 216, 230, 0.4)',
                borderRadius: '5px',
                boxShadow: '0px 2px 5px rgba(0,0,0,0.3)'
            }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'black' }}>
                    一致率：<span style={{ color: '#00008B' }}>{matchRate.toFixed(2)}%</span>
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
                {targetImage ? (
                    <img src={targetImage} alt="Target Image" style={{ width: '45%', height: 'auto', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)' }} />
                ) : (
                    <Typography sx={{ width: '45%' }}>画像がありません</Typography>
                )}
                {takePicture ? (
                    <img src={takePicture} alt="Recent Picture" style={{ width: '45%', height: 'auto', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)' }} />
                ) : (
                    <Typography sx={{ width: '45%' }}>画像がありません</Typography>
                )}
            </Box>
            {highScoreAchieved ? (<Link href="mapShow">
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    startIcon={<CompareArrowsIcon />}
                    sx={{ mt: 3, bgcolor: highScoreAchieved ? 'secondary.light' : 'primary.light', '&:hover': { bgcolor: highScoreAchieved ? 'secondary.main' : 'primary.main' } }}
                >
                    <Typography variant="h4" component="span">{highScoreAchieved ? '次に進む' : 'ぴっくるん！'}</Typography>
                </Button>
            </Link>
            ) : <Button
                onClick={handleSubmit}
                variant="contained"
                startIcon={<CompareArrowsIcon />}
                sx={{ mt: 3, bgcolor: highScoreAchieved ? 'secondary.light' : 'primary.light', '&:hover': { bgcolor: highScoreAchieved ? 'secondary.main' : 'primary.main' } }}
            >
                <Typography variant="h4" component="span">{highScoreAchieved ? '次に進む' : 'ぴっくるん！'}</Typography>
            </Button>}
        </Box>
    );
}
