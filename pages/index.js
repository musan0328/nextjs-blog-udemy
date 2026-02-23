import Head from "next/head";
import Layout, { siteTitle } from "@/components/Layout";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import utilStyle from "../styles/utils.module.css";

// 修正ポイント：{ } を使って名前付きエクスポートをインポートする
import { getPostsData } from "../lib/post"; 

// SSGの場合：ビルド時にサーバー側で実行される
export async function getStaticProps() {
  const allPostsData = getPostsData(); // 関数名を修正
  
  // 修正ポイント：必ず props オブジェクトとして return する
  return {
    props: {
      allPostsData,
    },
  };
}

// 引数で allPostsData を受け取る
export default function Home({ allPostsData }) {
  return (
  <Layout home>
    <Head>
        <title>{siteTitle}</title>
    </Head>
    <section className={utilStyle.headingMd}>
      <p>僕はアラサー独身のシステムエンジニアです。フロントエンド開発が好きです。<br />よろしくお願いします。</p>
    </section>

    <section className={utilStyle.headingMd}>
      <h2>📝 エンジニアのブログ</h2>
      <div className={styles.grid}>
        {/* allPostsData.map を使ってループさせますが、表示確認用 */}
        {allPostsData.map(({ id, title, date, thumbnail }) => (
          <article key={id}>
            <Link href={`/posts/${id}`}>
              <img 
                src={`${thumbnail}`}
                className={styles.thumbnailImage}
                alt={title}
              />
            </Link>
            <Link href={`/posts/${id}`} className={utilStyle.boldText}>
              {title}
            </Link>
            <br />
            <small className={utilStyle.lightText}>{date}</small>
          </article>
        ))}
      </div>
    </section>
  </Layout>
  );
}