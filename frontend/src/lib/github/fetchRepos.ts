import axios from "axios";

export async function fetchOrgRepos(org: string, token: string) {
  const res = await axios.get(
    `https://api.github.com/orgs/${org}/repos?per_page=100&type=private`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data as { name: string }[];
}
