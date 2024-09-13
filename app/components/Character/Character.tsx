import React, { useEffect, useRef, useState, useContext } from 'react';
import styles from './Character.module.scss'
import { PerformanceContext } from '../../contexts/PerformanceContext';


interface SpriteAnimationProps {
  imageUrl: string;
  frameWidth: number;
  frameHeight: number;
  frameCount: number;
  frameDuration: number;
}

const Character: React.FC<SpriteAnimationProps> = ({imageUrl, frameWidth, frameHeight, frameCount, frameDuration}) => {

  const context = useContext(PerformanceContext);
  // Check if context is undefined
  if (!context) {
    throw new Error('Character must be used within a PerformanceProvider');
  }
  const { performancePercentage } = context;


  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /* const startAnimation = () => {
    if (!isPlaying && frameCount > 1) {
      setIsPlaying(true);
    }
  };

  const stopAnimation = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const nextFrame = () => {
    setCurrentFrame((prevFrame) => (prevFrame + 1) % frameCount);
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setCurrentFrame(value);
  }; */

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentFrame((prevFrame) => (prevFrame + 1) % frameCount);
      }, frameDuration);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, frameCount, frameDuration]);

  useEffect(() => {
    const cf = Math.round((performancePercentage * (frameCount - 1)) / 100);
    setCurrentFrame(cf)
  }, [performancePercentage])

  return (
    <div className={styles.character}>
      <div
        className={styles.character__sprite}
        style={{
          width: `${frameWidth}px`,
          height: `${frameHeight}px`,
          backgroundImage: `url(${imageUrl})`,
          backgroundPosition: `-${currentFrame * frameWidth}px 0px`,
        }}
      />

      {/* <div className={styles.character__controllers}>
        <div className={styles.character__controllers__buttons}>
          <button onClick={startAnimation} disabled={isPlaying}>Play</button>
          <button onClick={stopAnimation} disabled={!isPlaying}>Pause</button>
          <button onClick={nextFrame}  disabled={isPlaying}>Next Frame</button>
        </div>
        <div>
          <input
            type="range"
            min="0"
            max={frameCount - 1}
            step="0.1"
            value={currentFrame}
            onChange={handleSliderChange}
            className={styles.slider}
          />
        </div>
      </div> */}
    </div>
  )
}

export default Character