import PageWrapper from "./components/PageWrapper/PageWrapper";
import styles from "./page.module.scss";

import { DataProvider } from './contexts/DataContext';

export default function Home() {
  return (
    <div className={styles.page}>
      <DataProvider>
        <PageWrapper />
      </DataProvider>
    </div>
  );
}
