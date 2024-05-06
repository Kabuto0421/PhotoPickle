'use client'

import { signOut, useSession } from "next-auth/react";
import { Button, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";

const LogoutPage = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session && (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
          <Card sx={{ maxWidth: 300 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" fontWeight="fontWeightBold">
                ログアウトしますか？
              </Typography>
              <Button variant="contained" sx={{ mt: 2, mr:2 }} onClick={() => signOut()}>
                はい
              </Button>
              <Button variant="outlined" sx={{ mt: 2 }} >
                <Link href='/profile'>
                  キャンセル
                </Link>
              </Button>
            </CardContent>
          </Card>
        </Grid>
      )}
    </div>
  );
}

export default LogoutPage;