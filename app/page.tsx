import PageWrapper from "./components/PageWrapper/PageWrapper";
import styles from "./page.module.scss";

import { PerformanceProvider } from './contexts/PerformanceContext';

export default function Home() {
  return (
    <div className={styles.page}>
      <PerformanceProvider>
        <PageWrapper />
      </PerformanceProvider>
    </div>
  );
}
