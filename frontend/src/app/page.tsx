export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          GitHubアカウント分析
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          GitHubのユーザー名を入力して、レビュー傾向を分析します。
        </p>

        <form>
          <input
            type="text"
            placeholder="GitHubユーザー名（例：octocat）"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            分析する
          </button>
        </form>
      </div>
    </main>
  );
}
