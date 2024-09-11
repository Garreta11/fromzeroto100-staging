import * as tf from '@tensorflow/tfjs-core';
import * as poseDetection from '@tensorflow-models/pose-detection';
// Register one of the TF.js backends.
import '@tensorflow/tfjs-backend-webgl';

let detector: poseDetection.PoseDetector | null = null;

/**
 * Loads the MoveNet model if it hasn't been loaded already.
 */
export const loadMoveNetModel = async () => {
  if (!detector) {
    await tf.setBackend('webgl'); // Use the WebGL backend in the worker
    await tf.ready();


    detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, {
      modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING
    });
  }
  return detector;
};

/**
 * Detects poses in an image, video, or canvas element using MoveNet.
 * 
 * @param image - The HTMLImageElement, HTMLVideoElement, or HTMLCanvasElement to perform pose detection on.
 * @returns A Promise that resolves to an array of detected poses.
 */
export const detectPose = async (image: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement): Promise<poseDetection.Pose[]> => {
  if (!detector) {
    await loadMoveNetModel();
  }

  if (detector) {
    const poses = await detector.estimatePoses(image, {
      maxPoses: 1,   // Single pose detection
      flipHorizontal: false,  // No flipping needed for normal camera usage
    });

    return poses;
  }

  return [];
};
