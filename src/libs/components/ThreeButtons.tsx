'use client'
// ReactとCSSProperties型をインポートする。
import React, { CSSProperties } from 'react';
// MUIから必要なコンポーネントとアイコンをインポートする。
import { Grid, Button } from '@mui/material';
import DnsIcon from '@mui/icons-material/Dns';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import HistoryIcon from '@mui/icons-material/History';
import Link from 'next/link';
// ThreeButtonsコンポーネントのpropsの型を定義する。
interface ThreeButtonsProps {
    iconStyle: CSSProperties; // アイコンに適用されるスタイルの型。
}
import { usePathname } from 'next/navigation';


// ThreeButtonsコンポーネント本体。
export default function ThreeButtons({ iconStyle }: ThreeButtonsProps) {
    const pathname = usePathname();

    return (
        // ボタンを水平に並べるためのGridコンテナ。
        <Grid container spacing={0} justifyContent="center" alignItems="center" paddingTop={1}>
            {/* DNSアイコンボタン */}
            <Grid item xs={4} paddingRight={1} sx={{ height: '100%' }}>
                <Link href="create">
                    <Button
                        variant="contained" // ボタンの外観を塗りつぶしに設定。
                        startIcon={<DnsIcon style={iconStyle} />} // アイコンとしてDnsIconを使用し、propsから受け取ったスタイルを適用。
                        fullWidth // ボタンの幅をGridアイテムの幅いっぱいに設定。
                        sx={{
                            backgroundColor: pathname === '/create' ? '#f4bd45' : '#437b8d', // ボタンの背景色を設定。
                            color: pathname === '/create' ? 'black' : 'white', // ボタンのテキスト色を設定。
                            '&:hover': {
                                backgroundColor: 'rgba(241, 172, 23, 0.8)', // ホバー時の背景色を少し明るくする 
                                color: 'black'
                            },
                        }}
                    />
                </Link>
            </Grid>
            {/* スポーツエスポーツアイコンボタン */}

            <Grid item xs={4} padding={0} sx={{ height: '100%' }}>
                <Link href="/">
                    <Button
                        variant="contained"
                        startIcon={<SportsEsportsIcon style={iconStyle} />}
                        fullWidth
                        sx={{
                            backgroundColor: pathname === '/' ? '#f4bd45' : '#437b8d', // ボタンの背景色を設定。
                            color: pathname === '/' ? 'black' : 'white', // ボタンのテキスト色を設定。
                            '&:hover': {
                                backgroundColor: 'rgba(241, 172, 23, 0.8)', // ホバー時の背景色を少し明るくする
                                color: 'black'
                            },
                        }}
                    />
                </Link>
            </Grid>
            {/* 履歴アイコンボタン */}
            <Grid item xs={4} paddingLeft={1} sx={{ height: '100%' }}>
                <Button
                    variant="contained"
                    startIcon={<HistoryIcon style={iconStyle} />}
                    fullWidth
                    sx={{
                        backgroundColor: '#437b8d', // ボタンの背景色を設定。
                        color: 'white', // ボタンのテキスト色を設定。
                        '&:hover': {
                            backgroundColor: 'rgba(241, 172, 23, 0.8)', // ホバー時の背景色を少し明るくする
                            color: 'black'
                        },
                    }}
                />
            </Grid>
        </Grid>
    );
}
