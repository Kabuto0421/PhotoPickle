
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
                bgcolor="#437b8d"
                style={{ height: '60vh'}} // 余白を追加して見た目を整える
                sx={{ borderRadius: '3px' }}
                marginTop={1}
            >
                {/* NextLinkでボタンを押した時にmapフォルダのページに遷移する */}
                <NextLink href="/mapShow">
                    <Button
                        variant="contained"
                        startIcon={<PlayArrowIcon sx={iconStyle} />}
                        sx={{
                            fontSize: '30px', // テキストのサイズを大きくする
                            backgroundColor: '#f5e795', // ボタンの背景色を設定
                            color: 'black', // ボタンのテキスト色を白にする
                            '&:hover': {
                                backgroundColor: 'rgba(241, 172, 23, 0.8)', // ホバー時の背景色を少し明るくする
                                color: 'black'
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
