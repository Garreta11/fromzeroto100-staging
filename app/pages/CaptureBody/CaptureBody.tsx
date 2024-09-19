import React, {useEffect, useState, useContext} from 'react'
import styles from './CaptureBody.module.scss'
import { DataContext } from '@/app/contexts/DataContext';

const CaptureBody = () => {
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
      setPage('getReady')
    }
  }, [count])

  return (
    <div className={styles.captureBody}>
      <h2 className={styles.captureBody__title}>Capture your body</h2>
    </div>
  )
}

export default CaptureBody