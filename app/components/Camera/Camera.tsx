
'use client'
import styles from './Camera.module.scss'
import Webcam from "react-webcam";
import Stats from 'stats.js';
import { DataContext } from '../../contexts/DataContext';
import { useRef, useState, useEffect, useCallback, useContext } from "react";
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

// Define the skeleton pairs
const skeleton = [
  ["right_ear", "right_eye"],
  ["right_eye", "nose"],
  ["nose", "left_eye"],
  ["left_eye", "left_ear"],
  ["left_shoulder", "right_shoulder"],
  ["left_shoulder", "left_elbow"],
  ["left_elbow", "left_wrist"],
  ["right_shoulder", "right_elbow"],
  ["right_elbow", "right_wrist"],
  ["left_hip", "right_hip"],
  ["left_shoulder", "left_hip"],
  ["right_shoulder", "right_hip"],
  ["left_hip", "left_knee"],
  ["left_knee", "left_ankle"],
  ["right_hip", "right_knee"],
  ["right_knee", "right_ankle"]
];

const Camera: React.FC = () => {
  const webcamRef = useRef<Webcam>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const statsRef = useRef<Stats | null>(null);

  const [poses, setPoses] = useState<Pose[]>([]);
  const [isModelLoaded, setIsModelLoaded] = useState<boolean>(false);

  const context = useContext(DataContext);
  // Check if context is undefined
  if (!context) {
    throw new Error('Character must be used within a DataProvider');
  }
  const { page, setPerformancePercentage, setRepetitions } = context

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user", // you can also set it to "environment" for back camera on mobile devices
  };

  const detectWebcamPose = useCallback(async () => {
    if (webcamRef.current && webcamRef.current.video?.readyState === 4 && isModelLoaded) {

      if (statsRef.current) statsRef.current.begin()

      const video = webcamRef.current.video as HTMLVideoElement;
      // const detectedPoses = await detectPose(video) as Pose[];
      const { poses: detectedPoses, counter: r, percentage: p } = await detectPose(video);
      setPoses(detectedPoses as Pose[]);
      setRepetitions(r);
      setPerformancePercentage(p)

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

      // Draw lines between the skeleton keypoints
      skeleton.forEach(([partA, partB]) => {
        const kpA = keypoints.find(kp => kp.name === partA);
        const kpB = keypoints.find(kp => kp.name === partB);

        if (kpA && kpB && kpA.score > 0.5 && kpB.score > 0.5) {
          ctx.beginPath();
          ctx.moveTo(kpA.x, kpA.y);
          ctx.lineTo(kpB.x, kpB.y);
          ctx.strokeStyle = "green";
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });

      // Draw circles on each keypoint
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
    <div className={`${styles.camera} ${page === 'captureBody' ? styles.camera__fullscreen : ''}`}>
      <Webcam
        ref={webcamRef}
        className={styles.camera__webcam}
        audio={false}
        height={videoConstraints.height}
        width={videoConstraints.width}
        videoConstraints={videoConstraints}
      />
      <canvas ref={canvasRef} className={styles.camera__canvas} />
    </div>
  )
}

export default Camera;