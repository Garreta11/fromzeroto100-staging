import React, { useContext, useEffect } from 'react';
import { DataContext } from '@/app/contexts/DataContext';
import styles from './ExerciseSuccess.module.scss'
import Character from "@/app/components/Character/Character"
import ProgressRectBar from '@/app/components/ProgressRectBar/ProgressRectBar';

const ExerciseSuccess = () => {
  const context = useContext(DataContext);
  // Check if context is undefined
  if (!context) {
    throw new Error('Character must be used within a DataProvider');
  }
  const { selectedExercise, repetitions, setPage } = context

  useEffect(() => {
    if (repetitions > selectedExercise.extraRoundStart) {
      setPage('extraRound')
    }
  }, [repetitions])

  return (
    <div className={styles.succeed}>
      <h2>You did it</h2>
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

export default ExerciseSuccess