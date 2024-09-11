import PageWrapper from "./components/PageWrapper/PageWrapper";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
        <PageWrapper />
    </div>
  );
}
