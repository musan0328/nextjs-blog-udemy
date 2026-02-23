import path from "path";
import fs from "fs"; //
import matter from "gray-matter"; // 一般的なライブラリ名 "gray-matter" に修正
import { remark } from "remark";
import html from "remark-html";


const postsDirectory = path.join(process.cwd(), "posts");

// mdファイルのデータを取り出す
export function getPostsData() {
    const fileNames = fs.readdirSync(postsDirectory); // fstat ではなく fs に修正
    const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, ""); // ファイル名(id)

        // マークダウンファイルを文字列として読み取る
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8"); // fstat ではなく fs に修正

        const matterResult = matter(fileContents);

        // idとデータを返す
        return {
            id,
            ...matterResult.data, // matterResultの中の「data」部分をスプレッド構文で展開
        };
    });
    return allPostsData; // 配列を返す
}



// getStaticPathでreturnで使うpathを取得する
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    // 正しくは取得した fileNames を map します
    return fileNames.map((fileName) => { 
        return {
            params: {
                id: fileName.replace(/\.md$/, ""),
            },
        };
    });
}

// idに基づいてブログ投稿データを返す
export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContent = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContent);
    matterResult.content //文字列

    const blogContent = await remark()
    .use(html)
    .process(matterResult.content);

    const blogContentHTML = blogContent.toString();

    return {
        id,
        blogContentHTML,
        ...matterResult.data,
    }
}