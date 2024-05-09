'use client'

import React from 'react';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Grid, Container, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


const CustomTextField = styled(TextField)({
  '& .MuiFormLabel-asterisk': {
    display: 'none',  // アスタリスクを非表示にする
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'black',  // 枠線の色
      borderWidth: '2px',    // 枠線の太さ
    },
    '&:hover fieldset': {
      borderColor: 'black',  // ホバー時の枠線の色
    },
    '&.Mui-focused fieldset': {
      borderColor: 'black',  // フォーカス時の枠線の色
    },
    'input': {
      backgroundColor: 'white', // 入力エリアの背景色を白に設定
    }
  }
});

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  nickname: z.string().min(2),
})

type InputType = z.infer<typeof schema>

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSignup, setIsSignup] = useState('')

  const form = useForm<InputType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      nickname: '',
    }
  })

  return (
    <div>
      <Container component="main" maxWidth="xs" sx={{
        display: 'flex',        // Flexboxを使う
        flexDirection: 'column', // 子要素を縦に並べる
        minHeight: '100vh',     // 最小の高さをビューポートの100%にする
        justifyContent: 'center' // 子要素を中央に寄せる
      }}>
        <Box sx={{ backgroundColor: '#437b8d', padding: 2, borderRadius: '8px' }}>
          <form style={{ marginTop: '20px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body1" gutterBottom>メールアドレス</Typography>
                <CustomTextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" gutterBottom>パスワード</Typography>
                <CustomTextField
                  required
                  fullWidth
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" gutterBottom>ニックネーム</Typography>
                <CustomTextField
                  required
                  fullWidth
                  id="nickname"
                  name="nickname"
                  autoComplete="nickname"
                  />
              </Grid>
              <Grid item xs={12}>
                <Button
                  sx={{ fontSize: "24px" }}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{ backgroundColor: '#f5e795' }}  // ボタンの背景色を設定
                  >
                  サインイン
                </Button>
              </Grid>

              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Link href="/login" style={{ color: '#1d9bf0'}}>
                  ログインする
                </Link>
              </Grid>
            
            </Grid>
          </form>
        </Box>
      </Container>
    </div>
  );
}

export default Signup;
