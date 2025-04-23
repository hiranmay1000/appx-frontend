import React, { useRef, useState, useEffect } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import style from './Coco.module.css';
import { Button, Spinner } from '../../ui';
import errorImg from '../../../images/error-page2.jpg';

const Coco: React.FC = () => {
    const imageRef = useRef<HTMLImageElement | null>(null); // For the image tag (for object detection)
    const inputRef = useRef<HTMLInputElement | null>(null); // For the file input (to upload an image)
    const [predictions, setPredictions] = useState<any[]>([]);
    const [showPreview, setShowPreview] = useState<boolean>(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [detectionDone, setDetectionDone] = useState<boolean>(false);

    // Load the coco-ssd model
    const loadModel = async () => {
        setLoading(true);
        try {
            const model = await cocoSsd.load();
            return model;
        } catch (err) {
            console.error('Error loading the model', err);
        } finally {
            setLoading(false);
        }
    };

    // Run inference and set predictions
    const detectObjects = async (model: cocoSsd.ObjectDetection) => {
        if (imageRef.current) {
            const predictions = await model.detect(imageRef.current);
            console.log('Predictions: ', predictions.length);
            setPredictions(predictions);
            setDetectionDone(true); // Mark detection as complete
        }
    };

    useEffect(() => {
        if (imageSrc && imageRef.current) {
            const runDetection = async () => {
                const model = await loadModel();
                if (model) {
                    detectObjects(model);
                }
            };
            runDetection();
        }
    }, [imageSrc]);

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageSrc(URL.createObjectURL(file));
            setShowPreview(true);
            setDetectionDone(false);
        }
    };

    const handleResetClick = () => {
        setShowPreview(false);
        setImageSrc(null);
        setPredictions([]);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }


    return (
        <div className={style.coco}>
            <h1 className={style.title}>Smart detection app</h1>
            <p className={style.title}>Powerd by <strong>COCO-SSD</strong> Model</p>
            <br />
            <div className={style.uploadImageSection}>
                {showPreview ? (
                    <>
                        <div className={style.previewContainer}>
                            <div>
                                <img
                                    ref={imageRef}
                                    src={imageSrc ?? errorImg}
                                    alt="preview"
                                    className={style.previewImage}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {predictions.length > 0 && (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <div className={style.predictions}>
                                            <h2>Predictions:</h2>
                                            <ul>
                                                {predictions.map((pred, i) => (
                                                    <li key={i}>
                                                        {i + 1}. {pred.class} - {Math.round(pred.score * 100)}%
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <br />
                                        <Button background='red' onClick={handleResetClick}>Reset</Button>
                                    </div>
                                )}
                                {detectionDone && predictions.length === 0 && (
                                    <>
                                        <p>No predictions found!</p>
                                        <Button background='red' onClick={handleResetClick}>Reset</Button>
                                    </>
                                )}
                                {loading && <Spinner />}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={style.uploadImage} onClick={handleClick}>
                            <p>Upload an image ╋</p>
                            <input
                                type="file"
                                accept="image/*"
                                ref={inputRef}
                                className={style.fileInput}
                                onChange={handleImageUpload}
                            />
                        </div>
                        <br />
                        <br />
                        <p style={{ fontWeight: "500", textAlign: "center", padding: "0 150px" }}>
                            Upload any image and watch <u>AI</u> in action! This smart detection app, powered by the <strong>COCO-SSD model</strong>, quickly identifies and labels objects—like <strong>people, pets, and vehicles</strong>—with <em>precision</em>. Perfect for developers, students, or curious minds exploring the power of real-time machine learning. Try it now!
                        </p>
                    </>
                )}
            </div>
            <br />
            <br />

        </div>
    );
};

export default Coco;
