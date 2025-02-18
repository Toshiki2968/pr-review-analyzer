import 'dotenv/config';
import get from 'axios';
import lda from 'lda';

const githubToken = process.env.GITHUB_TOKEN;
const repoOwner = 'uni-face';
const repoName = 'roboffice-sharepoint';

async function getPRComments() {
    console.log(githubToken);
    console.log(repoOwner);
    console.log(repoName);
    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/pulls/comments`;
    const headers = { Authorization: `token ${githubToken}` };

    const response = await get(url, { headers });
    return response.data
        .filter((x) => x.user.login != "coderabbitai[bot]" && x.user.login != "Toshiki2968")
        .map(comment => comment.body );
}

const pr = await getPRComments();
const topics = lda(pr, 3, 5);  // 3つのトピック、各トピックに関連する5つの単語
console.log(topics);

// module.exports = { getPRComments };
