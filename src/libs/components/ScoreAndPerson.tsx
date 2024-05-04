// ReactとそのCSSProperties型、そして必要なMUIコンポーネントをインポートする。
import React, { CSSProperties } from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Link from 'next/link';

// ScoreAndPersonIconコンポーネントのpropsの型を定義する。
interface ScoreAndPersonIconProps {
    score: string; // scoreは文字列で、表示するスコアを指す。
    iconStyle: CSSProperties; // iconStyleはCSSプロパティのオブジェクトで、アイコンに適用されるスタイルを定義する。
}

// ScoreAndPersonIconコンポーネント本体。propsとしてscoreとiconStyleを受け取る。
export default function ScoreAndPersonIcon({ score, iconStyle }: ScoreAndPersonIconProps) {
    return (
        // Gridコンテナを使って、子要素をレスポンシブに配置する。
        <Grid container spacing={2} style={{ padding: '20px 0' }}>
            {/* スコア表示部分 */}
            <Grid item xs={9}>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    padding={2}
                    bgcolor="#F1D3B1" // 背景色を設定
                    sx={{ borderRadius: '16px', textAlign: 'center', width: '100%' }} // スタイリングを適用
                >
                    <Typography
                        variant="h3" // 文字サイズを大きくする
                        component="div"
                        sx={{
                            fontWeight: 'bold', // 文字を太くする
                            color: 'black', // 文字色を黒にする
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%'
                        }}
                    >
                        {/* スコア値を表示 */}
                        Score: <Box component="span" sx={{ marginLeft: 1 }}>{score}</Box>
                    </Typography>
                </Box>
            </Grid>
            {/* Personアイコンを表示するボタン */}
            <Grid item xs={2.5}>
                <Link href="/profile">
                    <Button
                        variant="contained" // ボタンスタイルを塗りつぶしに
                        fullWidth // 幅いっぱいに展開
                        size="large" // ボタンのサイズを大きくする
                        sx={{
                            backgroundColor: "#F1D3B1", // ボタンの背景色
                            color: "black", // ボタン内のテキスト色
                        }}
                        >
                        {/* iconStyleを適用したPersonアイコン */}
                        <PersonIcon style={iconStyle} />
                    </Button>
                </Link>
            </Grid>
        </Grid>
    );
}
