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
      <div>
        <h2 className={styles.instructions__title}>How to win</h2>
        <div className={styles.instructions__text}>
          <p className={styles.instructions__text__headline}>When you log in every day:</p>
          <ul className={styles.instructions__text__list}>
            <li><p>Scan your body using our motion capture feature</p></li>
            <li><p>Work out with us and complete the daily set!</p></li>
            <li><p>Earn more points with an extra round ... or not!</p></li>
            <li><p>Share your skills with us and unique prizes!</p></li>
          </ul>
        </div>
        <button onClick={handlePlay}>Play game</button>
      </div>
    </div>
  );
};

export default Instructions;
