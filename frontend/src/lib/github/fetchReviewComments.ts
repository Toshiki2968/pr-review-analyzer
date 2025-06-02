import axios from "axios";

export async function fetchReviewComments(
  org: string,
  repoName: string,
  pullNumber: number,
  token: string,
  username: string
) {
  const res = await axios.get(
    `https://api.github.com/repos/${org}/${repoName}/pulls/${pullNumber}/comments`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res.data
    .filter(
      (comment: any) =>
        comment.user?.login !== username && comment.in_reply_to_id === null
    )
    .map((comment: any) => ({
      repository: `${org}/${repoName}`,
      pull_number: pullNumber,
      reviewer: comment.user.login,
      comment: comment.body,
      created_at: comment.created_at,
    }));
}
