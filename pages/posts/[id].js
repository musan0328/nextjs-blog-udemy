import Layout from "@/components/Layout";
import { getAllPostIds, getPostData } from "../../lib/post";
import utilStyles from "../../styles/utils.module.css";
import Head from "next/head";


export async function getStaticPaths() {
    // パスをオブジェクトとして返す
    const paths = getAllPostIds();

    return {
        paths,
        fallback: false,
    };
}


export async function getStaticProps({ params }) {
    // 外部からpostDataを取得する
    const postData = await getPostData(params.id);

    return {
        props: {
            postData,
        },
    };
}


export default function Post({ postData }) {
    return (
       <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
            <h1>{postData.title}</h1>
            <small>{postData.date}</small>
            <br />
            {/* HTMLとしてレンダリングさせるための書き方 */}
            <div dangerouslySetInnerHTML={{ __html: postData.blogContentHTML }} />
        </article>
       </Layout>
    );
}