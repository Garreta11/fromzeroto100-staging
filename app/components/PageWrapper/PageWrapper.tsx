'use client'
import styles from './PageWrapper.module.scss'
import React, { useContext, useEffect } from 'react';

import { DataContext } from '@/app/contexts/DataContext';

import { useSearchParams } from 'next/navigation';


import Camera from "../Camera/Camera";
import Character from "../Character/Character";
import ProgressBar from "../ProgressBar/ProgressBar";

// pages
import Welcome from '@/app/pages/Welcome/Welcome';
import Instructions from '@/app/pages/Instructions/Instructions';
import PositionTheCamera from '@/app/pages/PositionTheCamera/PositionTheCamera';
import CaptureBody from '@/app/pages/CaptureBody/CaptureBody';
import GetReady from '@/app/pages/GetReady/GetReady';

interface ExerciseType {
  name: string,
  spriteUrl: string,
  frameWidth: number,
  frameHeight: number,
  frameCount: number,
  frameDuration: number
}

const exercises: ExerciseType[] = [
  {
    name: 'squat',
    spriteUrl: './ZERO_Sprite_Squat.png',
    frameWidth: 375,
    frameHeight: 633,
    frameCount: 10,
    frameDuration: 100
  },
  {
    name: 'launges',
    spriteUrl: './ZERO_Sprite_Squat.png',
    frameWidth: 375,
    frameHeight: 633,
    frameCount: 10,
    frameDuration: 100
  }
]


const PageWrapper: React.FC = () => {

  const searchParams = useSearchParams();
  const exerciseName = searchParams.get('exercise'); // Get the 'exercise' query param

  const context = useContext(DataContext);
  // Check if context is undefined
  if (!context) {
    throw new Error('Character must be used within a DataProvider');
  }
  const { page, setSelectedExercise, selectedExercise, performancePercentage } = context

  useEffect(() => {
    const foundExercise: ExerciseType | undefined = exercises.find(exercise => exercise.name === exerciseName);
    setSelectedExercise(foundExercise || exercises[0]);
  }, [exerciseName, setSelectedExercise])


  return (
    <div className={styles.container}>

      {page === 'welcome' && (
        <Welcome />
      )}

      {page === 'instructions' && (
        <Instructions />
      )}

      {page === 'positionTheCamera' && (
        <PositionTheCamera />
      )}

      {page === 'captureBody' && (
        <CaptureBody />
      )}

      {page === 'getReady' && (
        <GetReady />
      )}

      

      {page === 'exercise' && (
        <div className={styles.exercise}>
          <h2 className={styles.exercise__title}>{selectedExercise.name}</h2>
          <Character
            imageUrl={selectedExercise.spriteUrl}
            frameWidth={selectedExercise.frameWidth} // Width of each frame
            frameHeight={selectedExercise.frameHeight} // Height of each frame
            frameCount={selectedExercise.frameCount} // Total number of frames in the sprite sheet
            frameDuration={selectedExercise.frameDuration} // Duration of each frame in milliseconds
          />
          <ProgressBar percentage={performancePercentage} />
        </div>
      )}


      {/* CAMERA FEEDBACK */}
      {(page === 'captureBody' || page === 'getReady' || page === 'exercise') && (
        <Camera />
      )}
    </div>
  )
};

export default PageWrapper;
