import React, { useEffect, useRef, useState, useContext } from 'react';
import styles from './Character.module.scss'
import { DataContext } from '../../contexts/DataContext';


interface SpriteAnimationProps {
  imageUrl: string;
  frameWidth: number;
  frameHeight: number;
  frameCount: number;
  frameDuration: number;
}

const Character: React.FC<SpriteAnimationProps> = ({imageUrl, frameWidth, frameHeight, frameCount, frameDuration}) => {

  const context = useContext(DataContext);
  // Check if context is undefined
  if (!context) {
    throw new Error('Character must be used within a DataProvider');
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
    </div>
  )
}

export default Character