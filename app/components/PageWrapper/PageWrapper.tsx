'use client'
import styles from './PageWrapper.module.scss'
import React, { useContext } from 'react';

import { PerformanceContext } from '../../contexts/PerformanceContext';

import Camera from "../Camera/Camera";
import Character from "../Character/Character";
import ProgressBar from "../ProgressBar/ProgressBar";


const PageWrapper: React.FC = () => {

  const context = useContext(PerformanceContext);
  // Check if context is undefined
  if (!context) {
    throw new Error('Character must be used within a PerformanceProvider');
  }
  const { performancePercentage } = context
  return (
    <div className={styles.container}>
      <Character
        imageUrl="./ZERO_Sprite_Squat.png"
        frameWidth={375} // Width of each frame
        frameHeight={633} // Height of each frame
        frameCount={10} // Total number of frames in the sprite sheet
        frameDuration={100} // Duration of each frame in milliseconds
      />
      <Camera />
      <ProgressBar percentage={performancePercentage} />
    </div>
  )
};

export default PageWrapper;
