import { fetchOrgRepos } from "./fetchRepos";
import { fetchUserPullRequests } from "./fetchPullRequests";
import { fetchReviewComments } from "./fetchReviewComments";

export async function fetchAllReviewComments(
  org: string,
  token: string,
  username: string
) {
  const repos = await fetchOrgRepos(org, token);
  const allReviewComments: any[] = [];

  for (const repo of repos) {
    const pulls = await fetchUserPullRequests(org, repo.name, token, username);
    for (const pr of pulls) {
      const comments = await fetchReviewComments(
        org,
        repo.name,
        pr.number,
        token,
        username
      );
      allReviewComments.push(...comments);
    }
  }

  return allReviewComments;
}
