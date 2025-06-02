import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  try {
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      return NextResponse.json(
        { error: "GitHub token is not set" },
        { status: 500 }
      );
    }

    // 自分自身のイベント（private含む）を取得
    console.log(token);
    const res = await fetch(`https://api.github.com/users/${username}/events`, {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("GitHub API error:", errorText);
      return NextResponse.json(
        { error: "Failed to fetch user events" },
        { status: 500 }
      );
    }

    type GitHubReviewCommentEvent = {
      type: string;
      payload: {
        comment?: {
          body?: string;
        };
      };
    };

    // const events: { type: string }[] = await res.json();
    const events: GitHubReviewCommentEvent[] = await res.json();

    const reviewComments = events.filter(
      (e) => e.type === "PullRequestReviewCommentEvent"
    );
    const reviewEvents = events.filter(
      (e) => e.type === "PullRequestReviewCommentEvent"
    );

    const commentBodies = reviewEvents
      .map((e) => e.payload?.comment?.body)
      .filter(Boolean); // null や undefined を除外

    console.log("レビューコメント一覧:", commentBodies);

    const categoryResult = {
      命名: 14,
      可読性: 10,
      関数の構造: 7,
      コメント不足: 5,
      "型 / エラーハンドリング": 3,
      セキュリティ: 2,
      その他: 1,
    };

    return NextResponse.json({
      username,
      totalReviews: reviewComments.length,
      avgComment: 5.3,
      avgResponseTime: 2.1,
      categories: categoryResult,
    });
  } catch (error) {
    console.error("GitHub fetch error:", error);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
