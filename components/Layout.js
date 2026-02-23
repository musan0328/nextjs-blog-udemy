import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

const name = "Musan Code"

export const siteTitle = "Next.js Blog";

// コンポーネントの引数(props) {props}
function Layout( {children, home} ) {
    return (
    <div className={styles.container}>
        <Head>
            <link rel="icon" href="/favicon.ico"></link>
        </Head>
        <header className={styles.container}>
            {home ? (
                <>
                    <img src="/images/profile.png" className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`} alt="" />
                    <h1 className={utilStyles.heading2Xl}>{name}</h1>
                </>
            ) : (
                <>
                    <img src="/images/profile.png" className={`${utilStyles.borderCircle}`} alt="" />
                    <h1 className={utilStyles.heading2Xl}>{name}</h1>
                </>
            )}
        </header>

        <main>
            {children}
        </main>
        {!home && (
            <div>
                <Link href="/">← ホームへ戻る</Link>
            </div>
        )}
    </div>
    );
};

export default Layout;