'use client'

import { useRef, useState, useEffect, useCallback } from "react";
import { loadMoveNetModel, detectPose } from "@/app/utils/movenet";
import styles from './PoseEstimation.module.scss'
import Webcam from "react-webcam";
// Register one of the TF.js backends.
import '@tensorflow/tfjs-backend-webgl';


const PoseEstimation: React.FC = () => {
  const [poses, setPoses] = useState<any[]>([]);

  const webcamRef = useRef<Webcam>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isModelLoaded, setIsModelLoaded] = useState(false);


  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user", // you can also set it to "environment" for back camera on mobile devices
  };

  const detectWebcamPose = useCallback(async () => {
    if (webcamRef.current && webcamRef.current.video?.readyState === 4 && isModelLoaded) {
      const video = webcamRef.current.video as HTMLVideoElement;
      const detectedPoses = await detectPose(video);
      setPoses(detectedPoses);
    }
  }, [isModelLoaded]);

  useEffect(() => {
    const loadModel = async () => {
      await loadMoveNetModel();
      setIsModelLoaded(true);
    };

    loadModel();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      detectWebcamPose();
    }, 100);  // Detect poses every 100ms
    return () => clearInterval(interval);
  }, [detectWebcamPose]);

  return (
    <div className={styles.poseestimation}>
      <Webcam
        ref={webcamRef}
        className={styles.poseestimation__webcam}
        audio={false}
        height={480}
        width={640}
        videoConstraints={videoConstraints}
        screenshotFormat="image/jpeg"
      />
      <canvas ref={canvasRef} className={styles.poseestimation__canvas} />

      {poses.length > 0 && (
        <pre>{JSON.stringify(poses, null, 2)}</pre>
      )}
    </div>
  )
};

export default PoseEstimation;
