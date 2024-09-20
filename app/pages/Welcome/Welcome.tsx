import React, { useContext } from 'react';
import styles from './Welcome.module.scss';
import { DataContext } from '@/app/contexts/DataContext';
import Image from 'next/image';

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
      <h2 className={styles.welcome__title}>Welcome!</h2>
      <Image src='/images/welcome.png' alt='redbull welcome image' width={318} height={229} />
      <p className={styles.welcome__text}>Accelerate your your fitness game and train with Red Bull! Enter the 30 day challenge for great results and unique prizes.</p>
      <button onClick={handlePlay}>Play Game</button>
    </div>
  );
};

export default Welcome;
