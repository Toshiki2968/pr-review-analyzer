import axios from "axios";

export async function fetchUserPullRequests(
  org: string,
  repoName: string,
  token: string,
  username: string
) {
  const res = await axios.get(
    `https://api.github.com/repos/${org}/${repoName}/pulls?state=all&per_page=100`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data.filter((pr: any) => pr.user?.login === username);
}
