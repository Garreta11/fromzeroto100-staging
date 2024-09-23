import React, { useContext } from 'react';
import { DataContext } from '@/app/contexts/DataContext';
import styles from './ExtraRound.module.scss'
import Character from "@/app/components/Character/Character"
import ProgressRectBar from '@/app/components/ProgressRectBar/ProgressRectBar';

const ExtraRound = () => {
  const context = useContext(DataContext);
  // Check if context is undefined
  if (!context) {
    throw new Error('Character must be used within a DataProvider');
  }
  const { selectedExercise } = context
  
  return (
    <div className={styles.extraround}>
      <h2>Extra Round</h2>
      <Character
        imageUrl={selectedExercise.spriteUrl}
        frameWidth={selectedExercise.frameWidth} // Width of each frame
        frameHeight={selectedExercise.frameHeight} // Height of each frame
        frameCount={selectedExercise.frameCount} // Total number of frames in the sprite sheet
        frameDuration={selectedExercise.frameDuration} // Duration of each frame in milliseconds
      />
      <ProgressRectBar />
    </div>
  )
}

export default ExtraRound