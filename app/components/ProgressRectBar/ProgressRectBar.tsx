'use client'
import React, { useContext, useEffect, useState } from 'react';
import styles from './ProgressRectBar.module.scss'
import { DataContext } from '@/app/contexts/DataContext';
import Image from 'next/image';

const ProgressRectBar = () => {

  const [succeedIcon, setSucceedIcon] = useState<boolean>(false)
  
  const context = useContext(DataContext);
  // Check if context is undefined
  if (!context) {
    throw new Error('Character must be used within a DataProvider');
  }
  const { selectedExercise, performancePercentage, page } = context

  /* useEffect(() => {
    const p =  100 - 100 * (repetitions / maxRepetitions)
    setPercent(p)

    if (parseFloat(p.toFixed(0)) <= parseFloat((100 - (100 * selectedExercise.extraRoundStart / selectedExercise.maxRepetitions)).toFixed(0))) {
      setPage('exerciseSucceed')
    }

  }, [repetitions]) */

  useEffect(() => {
    if (page === 'exerciseSucceed') {
      setSucceedIcon(true)
    }
  }, [page])


  return (
    <div className={styles.progressbar}>
      <p>{(performancePercentage).toFixed(0)}%</p>
      <div className={styles.progressbar__outer}>
        <div className={styles.progressbar__inner} style={{transform: 'translateY('+(100 - performancePercentage)+'%)'}}/>
      </div>
      {succeedIcon && (
        <Image
          className={styles.progressbar__logo}
          src='/images/succeed.png'
          alt='RedBull succeed icon'
          width={94}
          height={94}
          style={{top: 100 - (100 * selectedExercise.extraRoundStart / selectedExercise.maxRepetitions) + '%'}}
        />
      )}
      <Image
        className={styles.progressbar__logo}
        src='/images/can.png'
        alt='RedBull can to indicate exercise completed'
        width={94}
        height={94}
        style={{top: 100 - (100 * selectedExercise.extraRoundStart / selectedExercise.maxRepetitions) + '%'}}
      />
    </div>
  )
}

export default ProgressRectBar