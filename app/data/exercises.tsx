// app/data/exercises.ts

export interface ExerciseType {
  name: string;
  spriteUrl: string;
  frameWidth: number;
  frameHeight: number;
  frameCount: number;
  frameDuration: number;
  maxRepetitions: number;
  extraRoundStart: number;
}

export const exercises: ExerciseType[] = [
  {
    name: 'squat',
    spriteUrl: './ZERO_Sprite_Squat.png',
    frameWidth: 375,
    frameHeight: 633,
    frameCount: 10,
    frameDuration: 100,
    maxRepetitions: 3,
    extraRoundStart: 2
  },
  {
    name: 'lunges',
    spriteUrl: './ZERO_Sprite_Squat.png',
    frameWidth: 375,
    frameHeight: 633,
    frameCount: 10,
    frameDuration: 100,
    maxRepetitions: 10,
    extraRoundStart: 8
  }
];
