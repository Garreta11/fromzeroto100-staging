import React, { useContext } from 'react';
import styles from './PositionTheCamera.module.scss';
import { DataContext } from '@/app/contexts/DataContext';

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
      <p>Make sure your whole body is visible within the frame and that you are against a solid, clear background. </p>
      <button onClick={handlePlay}>Next</button>
    </div>
  );
};

export default PositionTheCamera;
