'use client'

import Camera from "../Camera/Camera";

import styles from './PageWrapper.module.scss'
import Character from "../Character/Character";


const PageWrapper: React.FC = () => {

  return (
    <div className={styles.container}>
      <Character
        imageUrl="./ZERO_Sprite_Squat.png"
        frameWidth={375} // Width of each frame
        frameHeight={633} // Height of each frame
        frameCount={10} // Total number of frames in the sprite sheet
        frameDuration={100} // Duration of each frame in milliseconds
      />
      <Camera />
    </div>
  )
};

export default PageWrapper;
