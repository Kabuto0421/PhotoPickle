'use client'
import React, { useState, useEffect, useRef } from 'react';
import NextLink from 'next/link';
import { Container, Box, Button, IconButton, Grid, Modal, Checkbox, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ScoreAndPersonIcon from '@/libs/components/ScoreAndPerson';
import ThreeButtons from '@/libs/components/ThreeButtons';

interface PhotoData {
    image: string;
    latitude?: number;
    longitude?: number;
}

const mockPhotos = [
    'https://via.placeholder.com/400x400/FF0000',
    'https://via.placeholder.com/400x400/00FF00',
    'https://via.placeholder.com/400x400/0000FF',
    'https://via.placeholder.com/400x400/FFFF00',
    'https://via.placeholder.com/400x400/FF00FF',
    'https://via.placeholder.com/400x400/00FFFF',
    'https://via.placeholder.com/400x400/FFFFFF',
    'https://via.placeholder.com/400x400/000000',
    'https://via.placeholder.com/400x400/123456',
    'https://via.placeholder.com/400x400/654321',
    'https://via.placeholder.com/400x400/ABCDEF',
    'https://via.placeholder.com/400x400/13579B',

];

export default function CameraPage() {
    const refVideo = useRef<HTMLVideoElement>(null);
    const [photo, setPhoto] = useState<string | undefined>(undefined);
    const [capturing, setCapturing] = useState(true);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [latitude, setLatitude] = useState<number | undefined>(undefined);
    const [longitude, setLongitude] = useState<number | undefined>(undefined);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

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

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                err => {
                    console.error("位置情報の取得に失敗しました: ", err);
                }
            );
        } else {
            console.error("このデバイスでは位置情報がサポートされていません。");
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
            refVideo.current.load();

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

    const handlePhotoChoice = () => {
        setModalOpen(true);
    };

    const handlePhotoSelect = (photoUrl: string) => {
        setSelectedPhotos(prevSelected => {
            if (prevSelected.includes(photoUrl)) {
                return prevSelected.filter(p => p !== photoUrl);
            } else {
                return [...prevSelected, photoUrl];
            }
        });
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleSubmit = () => {
        if (photo !== undefined) {
            const photoData: PhotoData = {
                image: photo,
                latitude: latitude,
                longitude: longitude,
            };
            localStorage.setItem('takePicture', JSON.stringify(photoData));
        }
    };

    // アイコンのスタイル
    const iconStyle = {
        fontSize: '64px'
    };
    const photoIconStyle = {
        fontSize: '32px'
    };

    return (
        <Container maxWidth="sm">
            {/* スコアとPersonアイコンを表示するコンポーネント */}
            <ScoreAndPersonIcon score="10000000" iconStyle={iconStyle} />

            {/* 3つのボタンを横並びに表示するコンポーネント */}
            <ThreeButtons iconStyle={iconStyle} />

            {/* カメラ映像と撮影アイコン */}
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                bgcolor="#437b8d"
                style={{ height: '70vh' }}
                sx={{ borderRadius: '3px' }}
                marginTop={1}
            >
                {/* 「写真を選ぶ」ボタン */}
                <Box display="flex" justifyContent="center" width="100%" marginY={2}>
                    <Button
                        variant="contained"
                        startIcon={<PlayArrowIcon sx={iconStyle} />}
                        sx={{
                            fontSize: '20px',
                            backgroundColor: '#f5e795',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'rgba(241, 172, 23, 0.8)',
                                color: 'black'
                            },
                            width: '90%'
                        }}
                        onClick={handlePhotoChoice}
                    >
                        <Typography color="black">写真を選ぶ</Typography>

                    </Button>
                </Box>

                <div style={{ position: 'relative', width: '400px', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <video ref={refVideo} autoPlay playsInline width="400" height="400" style={{ display: capturing ? 'block' : 'none' }} />
                    {capturing ? null : (
                        <img src={photo} alt="Captured" style={{ width: "400px", height: "400px", objectFit: 'cover' }} />
                    )}
                    {capturing ? (
                        <IconButton
                            onClick={takePhoto}
                            sx={{
                                position: 'absolute',
                                bottom: 10,
                                backgroundColor: 'white',
                                '&:hover': { backgroundColor: '#e0e0e0' },
                                padding: 2
                            }}
                        >
                            <CameraAltIcon sx={{ photoIconStyle }} />
                        </IconButton>
                    ) : (
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 10,
                                display: 'flex',
                                gap: 2
                            }}
                        >
                            <Button variant="contained" onClick={resetCamera} sx={{ margin: 1 }}>撮り直す</Button>
                            <NextLink href="/compare">
                                <Button variant="contained" onClick={handleSubmit} sx={{ margin: 1 }}>保存する</Button>
                            </NextLink>
                        </Box>
                    )}
                    <canvas style={{ display: 'none' }} />
                </div>
            </Box>

            {/* モーダルで写真一覧表示 */}
            <Modal open={modalOpen} onClose={handleModalClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80%',
                        maxHeight: '80vh', // モーダルの最大高さをビューポートの80%に設定
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: '8px',
                        overflowY: 'auto' // コンテンツがこの高さを超えたらスクロール可能
                    }}
                >
                    <h2>写真を選ぶ</h2>
                    <Grid container spacing={2}>
                        {mockPhotos.map((photoUrl, index) => (
                            <Grid item xs={4} key={index}>
                                <Box
                                    position="relative"
                                    border={selectedPhotos.includes(photoUrl) ? '2px solid #FF0000' : 'none'}
                                    borderRadius="8px"
                                    overflow="hidden"
                                    onClick={() => handlePhotoSelect(photoUrl)}
                                >
                                    <img
                                        src={photoUrl}
                                        alt={`Mock Photo ${index}`}
                                        style={{ width: '100%', cursor: 'pointer' }}
                                    />
                                    <Checkbox
                                        checked={selectedPhotos.includes(photoUrl)}
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            right: 0,
                                            color: 'white',
                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                            borderRadius: '50%'
                                        }}
                                    />
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        marginTop={2}
                    >
                        <Button variant="contained" color="primary" onClick={handleModalClose}>
                            完了
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Container>
    );
}