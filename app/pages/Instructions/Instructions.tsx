import React, { useContext } from 'react';
import styles from './Instructions.module.scss';
import { DataContext } from '@/app/contexts/DataContext';

const Instructions = () => {

  const context = useContext(DataContext);
  // Check if context is undefined
  if (!context) {
    throw new Error('Character must be used within a DataProvider');
  }
  const { setPage } = context


  const handlePlay = () => {
    setPage('positionTheCamera')
  }

  return (
    <div className={styles.instructions}>
      <h2>Instructions</h2>
      <button onClick={handlePlay}>Play game</button>
    </div>
  );
};

export default Instructions;
