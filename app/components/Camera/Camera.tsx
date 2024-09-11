'use client'
import styles from './Camera.module.scss'
import Webcam from "react-webcam";
import Stats from 'stats.js';
import { useRef, useState, useEffect, useCallback } from "react";
import { loadMoveNetModel, detectPose } from "@/app/utils/movenet";

// Interface declarations
interface Keypoint {
  x: number;
  y: number;
  score: number;
  name: string;
}
interface Pose {
  keypoints: Keypoint[];
  score: number;
}

const Camera: React.FC = () => {
  const webcamRef = useRef<Webcam>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const statsRef = useRef<Stats | null>(null);

  const [poses, setPoses] = useState<Pose[]>([]);
  const [isModelLoaded, setIsModelLoaded] = useState<boolean>(false);

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user", // you can also set it to "environment" for back camera on mobile devices
  };

  const detectWebcamPose = useCallback(async () => {
    if (webcamRef.current && webcamRef.current.video?.readyState === 4 && isModelLoaded) {

      if (statsRef.current) statsRef.current.begin()

      const video = webcamRef.current.video as HTMLVideoElement;
      const detectedPoses = await detectPose(video) as Pose[];
      setPoses(detectedPoses);

      if (statsRef.current) statsRef.current.end()
    }
  }, [isModelLoaded]);

  useEffect(() => {
    // Initialize stats.js
    const stats = new Stats();
    stats.showPanel(0); // 0 = FPS panel
    statsRef.current = stats;
    document.body.appendChild(stats.dom); // Append stats.js panel to the document body

    return () => {
      if (statsRef.current) {
        document.body.removeChild(statsRef.current.dom); // Clean up the panel on component unmount
      }
    };
  }, []);

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
    }, 10);  // Detect poses every 100ms
    return () => clearInterval(interval);
  }, [detectWebcamPose]);

  useEffect(() => {
    drawCanvas(poses, webcamRef.current!, canvasRef.current);
  }, [poses])

  const drawCanvas = (poses: Pose[], webcam: Webcam, canvas: HTMLCanvasElement | null) => {
    if (!canvas) return

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!webcam.video) return;
    canvas.width = webcam.video.width;
    canvas.height = webcam.video.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(webcam.video, 0, 0, canvas.width, canvas.height);

    if (poses.length > 0) {
      const keypoints = poses[0].keypoints;
      keypoints.forEach((kp: Keypoint) => {
        if (kp.score > 0.5) {
          const { x, y } = kp;
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, 2 * Math.PI);
          ctx.fillStyle = "red";
          ctx.fill();
        }
      });
    }

  }

  return (
    <div className={styles.camera}>
      <Webcam
        ref={webcamRef}
        className={styles.camera__webcam}
        audio={false}
        height={480}
        width={640}
        videoConstraints={videoConstraints}
      />
      <canvas ref={canvasRef} className={styles.camera__canvas} />
    </div>
  )
}

export default Camera;