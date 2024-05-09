'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Button, IconButton } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Link from 'next/link';

interface PhotoData {
    image: string;
    latitude?: number;
    longitude?: number;
    timestamp?: number;
}

export default function CameraPage() {
    const refVideo = useRef<HTMLVideoElement>(null);
    const [photoData, setPhotoData] = useState<PhotoData | undefined>(undefined);
    const [capturing, setCapturing] = useState(true);
    const [position, setPosition] = useState<{ latitude: number; longitude: number } | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);

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

        // 現在の位置情報を取得
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setPosition({
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    });
                },
                (err) => {
                    setError(`位置情報の取得に失敗しました: ${err.message}`);
                }
            );
        } else {
            setError("位置情報がこのデバイスでサポートされていません。");
        }
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
            const timestamp = Date.now();
            const newPhotoData: PhotoData = {
                image,
                latitude: position?.latitude,
                longitude: position?.longitude,
                timestamp
            };

            localStorage.setItem("targetImage", JSON.stringify(newPhotoData));
            setPhotoData(newPhotoData);
            video.pause();
            setCapturing(false);
        }
    };

    const resetCamera = () => {
        if (refVideo.current) {
            refVideo.current.play().catch(err => console.error("Video play failed on reset: ", err));
        }
        setPhotoData(undefined);
        setCapturing(true);
    };

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            {capturing ? (
                <video ref={refVideo} autoPlay playsInline width="400" height="400" />
            ) : (
                <img src={photoData?.image} alt="Captured" style={{ width: "400", height: "400", objectFit: 'cover' }} />
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
                    <Link href="/compare">
                        <Button variant="contained" onClick={() => console.log('次へ進む')} sx={{ margin: 1 }}>次へ進む</Button>
                    </Link>
                </div>
            )}
            {error && (
                <div style={{ position: 'absolute', top: 10, left: 10, backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', padding: '10px', borderRadius: '5px' }}>
                    {error}
                </div>
            )}
            <canvas style={{ display: 'none' }} />
        </div>
    );
}