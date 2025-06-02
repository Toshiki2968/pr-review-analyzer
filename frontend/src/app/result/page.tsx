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

const data = [
  { name: "命名", value: 14 },
  { name: "可読性", value: 10 },
  { name: "関数の構造", value: 7 },
  { name: "コメント不足", value: 5 },
  { name: "型 / エラーハンドリング", value: 3 },
  { name: "セキュリティ", value: 2 },
  { name: "その他", value: 1 },
];

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#8dd1e1",
  "#a4de6c",
  "#d0ed57",
];

export default function ResultPage() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username") || "Toshiki2968";
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {username} の分析結果
        </h2>

        {/* 基本統計 */}
        <ul className="text-gray-700 text-sm space-y-2 mb-6">
          <li>
            ✅ レビュー件数（過去30日）: <strong>42</strong>
          </li>
          <li>
            💬 平均コメント数: <strong>5.3</strong>
          </li>
          <li>
            ⏱️ 平均レビュー応答時間: <strong>2.1時間</strong>
          </li>
        </ul>

        {/* チャート */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            📊 カテゴリ別レビュー傾向
          </h3>
          <div className="w-full h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                  dataKey="value"
                >
                  {data.map((entry, index) => (
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
