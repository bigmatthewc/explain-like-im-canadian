import { getArticleBySlug } from "@/lib/articles";

export default function ArticlePage({ params }) {
  const article = getArticleBySlug(params.slug);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
      <div className="text-gray-700 whitespace-pre-line mb-4">{article.content}</div>
      <div className="bg-blue-50 p-4 rounded-lg text-blue-900 italic">
        Explain Like I'm Canadian: {article.explainLikeCanadian}
      </div>
    </div>
  );
}
