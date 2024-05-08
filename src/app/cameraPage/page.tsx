'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Button, IconButton } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useMixContext } from "next-approuter-context";
import { context } from "../context";
import Link from 'next/link';
export default function CameraPage() {
    const refVideo = useRef<HTMLVideoElement>(null);
    const [photo, setPhoto] = useState<string | undefined>(undefined);
    const [capturing, setCapturing] = useState(true);
    const photoContext = context();

    useEffect(() => {
        const constraints = {
            video: {
                width: 400,
                height: 400,
                facingMode: "environment"
            }
        };

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            console.error("このデバイスではメディアデバイスがサポートされていません。");
            return;
        }

        navigator.mediaDevices.getUserMedia(constraints)
            .then(stream => {
                if (refVideo.current) {
                    refVideo.current.srcObject = stream;
                }
            })
            .catch(err => {
                console.error("メディアデバイスのアクセスにエラーが発生しました: ", err);
                alert("カメラへのアクセスを許可してください。");
            });
    }, []);


    const takePhoto = () => {
        const video = refVideo.current;
        const canvas = document.createElement('canvas');
        const targetWidth = 400;
        const targetHeight = 400;

        if (video) {
            const context = canvas.getContext('2d');
            const aspectRatio = video.videoWidth / video.videoHeight;
            let sourceWidth = video.videoWidth;
            let sourceHeight = video.videoHeight;

            // アスペクト比を維持しつつ、目標サイズに最適化
            if (aspectRatio > 1) {
                // 横長の場合
                sourceHeight = video.videoHeight;
                sourceWidth = sourceHeight * aspectRatio;
            } else {
                // 縦長の場合
                sourceWidth = video.videoWidth;
                sourceHeight = sourceWidth / aspectRatio;
            }

            // canvas のサイズを目標サイズに設定
            canvas.width = targetWidth;
            canvas.height = targetHeight;

            // ビデオから取得した画像を canvas に描画し、リサイズ
            context?.drawImage(video, 0, 0, sourceWidth, sourceHeight, 0, 0, targetWidth, targetHeight);

            // canvas を画像データURLとしてエクスポート
            const image = canvas.toDataURL('image/png');
            photoContext.set({ takePicture: image });
            setPhoto(image);
            video.pause();
            setCapturing(false);
        }
    };

    const resetCamera = () => {
        if (refVideo.current) {
            refVideo.current.play().catch(err => console.error("Video play failed on reset: ", err));
        }
        setPhoto(undefined);
        setCapturing(true);
    };

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            {capturing ? (
                <video ref={refVideo} autoPlay playsInline width="400" height="400" />
            ) : (
                <img src={photo} alt="Captured" style={{ width: "400", height: "400", objectFit: 'cover' }} />
            )}
            {capturing ? (
                <IconButton
                    onClick={takePhoto}
                    sx={{
                        position: 'absolute',
                        bottom: 2,
                        right: 'calc(50% - 40px)',
                        backgroundColor: 'white',
                        '&:hover': { backgroundColor: '#e0e0e0' },
                        padding: 2,
                        fontSize: 'large'
                    }}
                >
                    <CameraAltIcon sx={{ fontSize: 48 }} />
                </IconButton>
            ) : (
                <div style={{ position: 'absolute', bottom: 20, right: 'calc(50% - 140px)' }}>
                    <Button variant="contained" onClick={resetCamera} sx={{ margin: 1 }}>撮り直す</Button>
                    <Link href="/compare" >
                        <Button variant="contained" onClick={() => console.log('次へ進む')} sx={{ margin: 1 }}>次へ進む</Button>
                    </Link>
                </div>
            )}
            <canvas style={{ display: 'none' }} />
        </div>
    );
}
