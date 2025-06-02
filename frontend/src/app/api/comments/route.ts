import { NextResponse } from "next/server";
import { fetchAllReviewComments } from "@/lib/github/fetchAllReview";

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME;
  const org = "uni-face";

  if (!token || !username) {
    return NextResponse.json(
      { error: "Token or username not set" },
      { status: 500 }
    );
  }

  try {
    const allReviewComments = await fetchAllReviewComments(
      org,
      token,
      username
    );
    return NextResponse.json(allReviewComments);
  } catch (err: any) {
    console.error("GitHub API error:", err?.response?.data || err.message);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
