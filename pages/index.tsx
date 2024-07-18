import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>CRUD Web</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.center}>
        <Link href="/students">
          <div className={styles['article-card']}>
            <div className={styles.content}>
              <p className={styles.subtitle}>Click here to see</p>
              <p className={styles.title}>Student List</p>
            </div>
            <img src="https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="article-cover" />
          </div>
        </Link>
    </div>
    </>
  );
}
