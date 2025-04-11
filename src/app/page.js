import Link from "next/link";

export default function Home() {
  const sampleArticles = [
    {
      id: 1,
      slug: "carbon-tax",
      title: "Carbon Tax Controversy Heats Up",
      summary: "Canada's federal carbon tax continues to spark debate among provinces...",
      explainLikeCanadian: "This affects fuel prices across Canada. Some provinces are pushing back due to cost-of-living concerns.",
    },
    {
      id: 2,
      slug: "nato-spending",
      title: "NATO Spending and Canada's Role",
      summary: "Canada faces international pressure to meet its NATO defense spending targets...",
      explainLikeCanadian: "This could lead to more defense spending or foreign policy shifts. It’s about global obligations versus domestic priorities.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-800">
            Explain Like I'm Canadian
          </h1>
          <nav>
            <a href="#" className="text-blue-600 hover:underline text-sm">About</a>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Top Stories
        </h2>

        {sampleArticles.map((article) => (
          <div key={article.id} className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 mb-6 transition hover:shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">{article.title}</h3>
            <p className="text-gray-700 mt-2">{article.summary}</p>
            <div className="mt-3 text-sm text-blue-900 italic bg-blue-50 p-3 rounded-md">
              {article.explainLikeCanadian}
            </div>
            <Link
              href={`/article/${article.slug}`}
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
            >
              Read full story
            </Link>


          </div>
        ))}
      </main>
    </div>
  );
}
