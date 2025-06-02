"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#8dd1e1",
  "#a4de6c",
  "#d0ed57",
];

type CategoryData = {
  name: string;
  value: number;
};

type AnalysisResult = {
  username: string;
  totalReviews: number;
  avgComment: number;
  avgResponseTime: number;
  categories: Record<string, number>;
};

export default function ResultPage() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username") || "Toshiki2968";
  const router = useRouter();

  const [data, setData] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`/api/analyze?username=${username}`)
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then(setData)
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>分析中...</p>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div>
          <p className="text-red-600">エラーが発生しました: {error}</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
          >
            戻る
          </button>
        </div>
      </main>
    );
  }

  const chartData: CategoryData[] = Object.entries(data.categories).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {data.username} の分析結果
        </h2>

        <ul className="text-gray-700 text-sm space-y-2 mb-6">
          <li>
            ✅ レビュー件数（過去30日）: <strong>{data.totalReviews}</strong>
          </li>
          <li>
            💬 平均コメント数: <strong>{data.avgComment}</strong>
          </li>
          <li>
            ⏱️ 平均レビュー応答時間: <strong>{data.avgResponseTime}時間</strong>
          </li>
        </ul>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            📊 カテゴリ別レビュー傾向
          </h3>
          <div className="w-full h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <button
          onClick={() => router.push("/")}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg"
        >
          戻る
        </button>
      </div>
    </main>
  );
}
