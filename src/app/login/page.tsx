'use client'

import { signIn, useSession } from "next-auth/react";
import { Button, Container, Grid, Typography } from "@mui/material";

const LoginPage = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {!session && (
        <Grid  container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
          <Button onClick={() => signIn()} sx={{ mt: 2, mb: 2, width: 100 }} variant="contained" >
            <Typography>
              はじめる
            </Typography>
          </Button>
        </Grid>
      )}
    </div>
  );
}

export default LoginPage;
