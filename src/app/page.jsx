// src/app/page.jsx
import { NewsCard } from '@/components/news-cards/NewsCard';

async function getNews() {
  const res = await fetch('http://localhost:3000/api/canadian-news');
  return res.json();
}

export default async function Home() {
  const articles = await getNews();
  
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Canadian News Aggregator</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {articles.map((article) => (
          <NewsCard key={article.url} article={article} />
        ))}
      </div>
    </main>
  );
}