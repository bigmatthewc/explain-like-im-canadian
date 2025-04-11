import NewsList from './NewsList';

async function getNews() {
  const res = await fetch('http://localhost:3000/api/canadian-news');
  if (!res.ok) throw new Error('Failed to fetch news');
  return res.json();
}

export default async function Home() {
  try {
    const articles = await getNews();
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Canadian News Aggregator</h1>
        <p className="text-gray-600 mb-6">Multiple perspectives on today's stories</p>
        <NewsList initialArticles={articles} />
      </main>
    );
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Error Loading News</h1>
        <p className="text-red-500">{error.message}</p>
      </div>
    );
  }
}