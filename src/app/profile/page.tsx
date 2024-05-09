'use client'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSession } from "next-auth/react";
import { Button, Card, CardContent } from "@mui/material";
export default function ProfilePage() {

  const { data: session } = useSession({ required: true });

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card variant="outlined">
        <CardContent>
          <Button href='/' variant="outlined" sx={{ mt: 2 }} startIcon={<ArrowBackIcon />}>
            戻る
          </Button>
        </CardContent>
        <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop:0, paddingBottom:3 }}>
          <h1>プロフィール</h1>
        </CardContent>
        <CardContent sx={{ paddingY: 0  }}>
          <img src={session?.user?.image ?? ''} width={90} height={90} />
        </CardContent>
        <CardContent>
          <p>名前：{session?.user?.name}</p>
          <p>メールアドレス：{session?.user?.email}</p>
        </CardContent>
        <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button href='/logout' variant="outlined" sx={{ mt: 2 }} >
            ログアウト
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
