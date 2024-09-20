import React, { useContext } from 'react';
import styles from './PositionTheCamera.module.scss';
import { DataContext } from '@/app/contexts/DataContext';
import Image from 'next/image';

const PositionTheCamera = () => {

  const context = useContext(DataContext);
  // Check if context is undefined
  if (!context) {
    throw new Error('Character must be used within a DataProvider');
  }
  const { setPage } = context

  const handlePlay = () => {
    setPage('captureBody')
  }

  return (
    <div className={styles.positionTheCamera}>
      <h2>Position the Camera</h2>
      <Image className={styles.positionTheCamera__image} src='/images/position-camera.png' alt='position the camera image' width={307} height={325} />
      <p>Position your device on the ground or a shelf: Make sure your whole body is visible within the frame and that you are against a solid, clear background. </p>
      <button onClick={handlePlay}>Next</button>
    </div>
  );
};

export default PositionTheCamera;
