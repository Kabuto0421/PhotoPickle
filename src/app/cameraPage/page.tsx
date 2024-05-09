'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Button, IconButton, Box } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Link from 'next/link';

export default function CameraPage() {
    const refVideo = useRef<HTMLVideoElement>(null);
    const [photo, setPhoto] = useState<string | undefined>(undefined);
    const [capturing, setCapturing] = useState(true);
    const [stream, setStream] = useState<MediaStream | null>(null); // ストリームを状態として保持

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
                setStream(stream);
                if (refVideo.current) {
                    refVideo.current.srcObject = stream;
                }
            })
            .catch(err => {
                console.error("メディアデバイスのアクセスにエラーが発生しました: ", err);
                alert("カメラへのアクセスを許可してください。");
            });

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
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

            if (aspectRatio > 1) {
                sourceHeight = video.videoHeight;
                sourceWidth = sourceHeight * aspectRatio;
            } else {
                sourceWidth = video.videoWidth;
                sourceHeight = sourceWidth / aspectRatio;
            }

            canvas.width = targetWidth;
            canvas.height = targetHeight;

            context?.drawImage(video, 0, 0, sourceWidth, sourceHeight, 0, 0, targetWidth, targetHeight);

            const image = canvas.toDataURL('image/png');
            setPhoto(image);
            video.pause();
            setCapturing(false);
        }
    };

    const resetCamera = () => {
        console.log('resetCamera called');
        console.log('refVideo.current:', refVideo.current);
        console.log('stream:', stream);

        if (refVideo.current && stream) {
            refVideo.current.srcObject = stream;
            refVideo.current.load();  // Ensure the media reloads

            refVideo.current.play().then(() => {
                console.log('Video playing after reset');
            }).catch(err => {
                console.error("Video play failed on reset: ", err);
            });

            setPhoto(undefined);
            setCapturing(true);
        } else {
            console.error('Video ref or stream is not available');
        }
    };

    const handleSubmit = () => {
        if (photo !== undefined) {
            localStorage.setItem('takePicture', photo);
        }
    };

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <video ref={refVideo} autoPlay playsInline width="400" height="400" style={{ display: capturing ? 'block' : 'none' }} />
            {capturing ? null : (
                <img src={photo} alt="Captured" style={{ width: "400px", height: "400px", objectFit: 'cover' }} />
            )}
            {capturing ? (
                <IconButton
                    onClick={takePhoto}
                    sx={{
                        position: 'absolute',
                        bottom: 80,
                        right: 'calc(50% - 24px)',
                        backgroundColor: 'white',
                        '&:hover': { backgroundColor: '#e0e0e0' },
                        padding: 2
                    }}
                >
                    <CameraAltIcon sx={{ fontSize: 48 }} />
                </IconButton>
            ) : (
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 80,
                        display: 'flex',
                        gap: 2
                    }}
                >
                    <Button variant="contained" onClick={resetCamera} sx={{ margin: 1 }}>撮り直す</Button>
                    <Link href="/compare">
                        <Button variant="contained" onClick={handleSubmit} sx={{ margin: 1 }}>次へ進む</Button>
                    </Link>
                </Box>
            )}
            <canvas style={{ display: 'none' }} />
        </div>
    );
}