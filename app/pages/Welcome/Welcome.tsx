import React, { useContext } from 'react';
import styles from './Welcome.module.scss';
import { DataContext } from '@/app/contexts/DataContext';

const Welcome = () => {

  const context = useContext(DataContext);
  // Check if context is undefined
  if (!context) {
    throw new Error('Character must be used within a DataProvider');
  }
  const { setPage } = context


  const handlePlay = () => {
    console.log("play")
    setPage('instructions')
  }

  return (
    <div className={styles.welcome}>
      <h2>Welcome!</h2>
      <button onClick={handlePlay}>Play game</button>
    </div>
  );
};

export default Welcome;
