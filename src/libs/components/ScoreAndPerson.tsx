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
        <Grid container spacing={0} >
            {/* スコア表示部分 */}
            <Grid item xs={8} sx={{ height: '10vh' }}>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bgcolor="#437b8d" // 背景色を設定
                    sx={{ 
                        borderRadius: '3px', 
                        textAlign: 'center', 
                        width: '100%', 
                        height: '10vh' ,
                        color: "white"
                    }} // スタイリングを適用
                >
                        {/* スコア値を表示 */}
                        Score: {score}
                </Box>
            </Grid>
            {/* Personアイコンを表示するボタン */}

            <Grid item xs={4} paddingLeft={1} sx={{ height: '10vh' }}>
             <Link href="/profile">
                <Button
                    variant="contained" // ボタンスタイルを塗りつぶしに
                    sx={{
                        backgroundColor: "#437b8d", // ボタンの背景色
                        color: "white", // ボタン内のテキスト色
                        width: '99%',
                        height: '10vh',
                        '&:hover': {
                            backgroundColor: 'rgba(241, 172, 23, 0.8)', // ホバー時の背景色を少し明るくする
                            color: 'black'
                        },
                    }}
                >
                    <PersonIcon style={iconStyle} />
                </Button>
                    </Link>
            </Grid>
        </Grid>
    );
}
