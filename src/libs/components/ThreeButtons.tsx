// ReactとCSSProperties型をインポートする。
import React, { CSSProperties } from 'react';
// MUIから必要なコンポーネントとアイコンをインポートする。
import { Grid, Button } from '@mui/material';
import DnsIcon from '@mui/icons-material/Dns';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import HistoryIcon from '@mui/icons-material/History';

// ThreeButtonsコンポーネントのpropsの型を定義する。
interface ThreeButtonsProps {
    iconStyle: CSSProperties; // アイコンに適用されるスタイルの型。
}

// ThreeButtonsコンポーネント本体。
export default function ThreeButtons({ iconStyle }: ThreeButtonsProps) {
    return (
        // ボタンを水平に並べるためのGridコンテナ。
        <Grid container spacing={0} justifyContent="center">
            {/* DNSアイコンボタン */}
            <Grid item xs={4} padding={1}>
                <Button
                    variant="contained" // ボタンの外観を塗りつぶしに設定。
                    startIcon={<DnsIcon style={iconStyle} />} // アイコンとしてDnsIconを使用し、propsから受け取ったスタイルを適用。
                    fullWidth // ボタンの幅をGridアイテムの幅いっぱいに設定。
                    size="large" // ボタンのサイズを大きく設定。
                    sx={{
                        backgroundColor: "#F1D3B1", // ボタンの背景色を設定。
                        color: "black", // ボタンのテキスト色を設定。
                    }}
                />
            </Grid>
            {/* スポーツエスポーツアイコンボタン */}
            <Grid item xs={4} padding={1}>
                <Button
                    variant="contained"
                    startIcon={<SportsEsportsIcon style={iconStyle} />}
                    fullWidth
                    size="large"
                    sx={{
                        backgroundColor: "#F1D3B1",
                        color: "black",
                    }}
                />
            </Grid>
            {/* 履歴アイコンボタン */}
            <Grid item xs={4} padding={1}>
                <Button
                    variant="contained"
                    startIcon={<HistoryIcon style={iconStyle} />}
                    fullWidth
                    size="large"
                    sx={{
                        backgroundColor: "#F1D3B1",
                        color: "black",
                    }}
                />
            </Grid>
        </Grid>
    );
}
