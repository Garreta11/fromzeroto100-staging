import React , { useState, useEffect, useContext } from 'react'
import styles from './GetReady.module.scss'
import { DataContext } from '@/app/contexts/DataContext';

const GetReady = () => {
  const [count, setCount] = useState<number>(5);

  const context = useContext(DataContext);
  // Check if context is undefined
  if (!context) {
    throw new Error('Character must be used within a DataProvider');
  }
  const { setPage } = context

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
      return () => clearTimeout(timer); // Clean up the timer
    } else {
      setPage('exercise')
    }
  }, [count])
  return (
    <div className={styles.getReady}>
      <h2>Get Ready!</h2>
      <h3>Game Starts<br/>in <span>{count}S</span></h3>
    </div>
    
  )
}

export default GetReady