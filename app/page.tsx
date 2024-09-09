import PoseEstimation from "./components/PoseEstimation/PoseEstimation";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>From Zero to 100</h1>

        <PoseEstimation />
      </main>
    </div>
  );
}
