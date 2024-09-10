import PoseEstimation from "./components/PoseEstimation/PoseEstimation";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
        <h1>From Zero to 100</h1>

        <PoseEstimation />
    </div>
  );
}
