'use client'
import React, { useContext, useEffect } from 'react';
import styles from './Exercise.module.scss'
import { DataContext } from '@/app/contexts/DataContext';
import Character from "@/app/components/Character/Character"
import ProgressRectBar from '@/app/components/ProgressRectBar/ProgressRectBar';

const Exercise = () => {
  
  const context = useContext(DataContext);
  // Check if context is undefined
  if (!context) {
    throw new Error('Character must be used within a DataProvider');
  }
  const { selectedExercise, repetitions, setPage, setPerformancePercentage } = context

  useEffect(() => {
    const p =  100 * (repetitions / selectedExercise.maxRepetitions)

    setPerformancePercentage(p)

    if (parseFloat((100 - p).toFixed(0)) <= parseFloat((100 - (100 * selectedExercise.extraRoundStart / selectedExercise.maxRepetitions)).toFixed(0))) {
      setPage('exerciseSucceed')
    }
  }, [repetitions])

  return (
    <div className={styles.exercise}>
      <h2 className={styles.exercise__title}>{selectedExercise.name}</h2>
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

export default Exercise