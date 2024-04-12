'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Button, IconButton } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

export default function CameraPage() {
    const refVideo = useRef<HTMLVideoElement>(null);
    const [photo, setPhoto] = useState<string | undefined>(undefined);
    const [capturing, setCapturing] = useState(true);

    useEffect(() => {
        const constraints = { video: { facingMode: "user" } };
        navigator.mediaDevices.getUserMedia(constraints)
            .then(stream => {
                if (refVideo.current) {
                    refVideo.current.srcObject = stream;
                    refVideo.current.play().catch(err => console.error("Video play failed: ", err));
                }
            })
            .catch(err => console.error("Error accessing media devices: ", err));
    }, []);

    const takePhoto = () => {
        const video = refVideo.current;
        const canvas = document.createElement('canvas');
        if (video) {
            const context = canvas.getContext('2d');
            const width = video.videoWidth;
            const height = video.videoHeight;

            canvas.width = width;
            canvas.height = height;
            context?.drawImage(video, 0, 0, width, height);

            const image = canvas.toDataURL('image/png');
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
                <video ref={refVideo} autoPlay muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
                <img src={photo} alt="Captured" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                    <Button variant="contained" onClick={() => console.log('次へ進む')} sx={{ margin: 1 }}>次へ進む</Button>
                </div>
            )}
            <canvas style={{ display: 'none' }} />
        </div>
    );
}
