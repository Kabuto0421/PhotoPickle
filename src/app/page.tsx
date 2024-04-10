'use client'
import React from 'react';
import NextLink from 'next/link'
import { Container, Box, Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ScoreAndPersonIcon from '@/libs/components/ScoreAndPerson';
import ThreeButtons from '@/libs/components/ThreeButtons';

export default function Home() {
    // アイコンのスタイル
    const iconStyle = {
        fontSize: '64px', // アイコンのサイズを大きくする
    };

    return (
        <Container maxWidth="sm">
            {/* スコアとPersonアイコンを表示するコンポーネント */}
            <ScoreAndPersonIcon score="10000000" iconStyle={iconStyle} />

            {/* 3つのボタンを横並びに表示するコンポーネント */}
            <ThreeButtons iconStyle={iconStyle} />


            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                bgcolor="#F1D3B1"
                style={{ height: '500px', marginTop: '20px' }} // 余白を追加して見た目を整える
                sx={{ borderRadius: '16px' }}
            >
                {/* NextLinkでボタンを押した時にmapフォルダのページに遷移する */}
                <NextLink href="/map">
                    <Button
                        variant="contained"
                        startIcon={<PlayArrowIcon sx={iconStyle} />}
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
                </NextLink>
            </Box>

        </Container>
    );
}
