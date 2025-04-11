import { useState, useEffect } from 'react';
import NewsCard from '../components/news-cards/NewsCard';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      const res = await fetch('/api/canadian-news');
      const data = await res.json();
      setArticles(data);
      setLoading(false);
    }
    loadNews();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Canadian News Perspectives</h1>
      
      {loading ? (
        <p>Loading news...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <NewsCard 
              key={article.url} 
              article={article}
              bias={getBiasForSource(article.source.name)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Helper function - you'll expand this later
function getBiasForSource(sourceName) {
  const biasMap = {
    'CBC News': 'left',
    'The Globe And Mail': 'center',
    'National Post': 'right'
  };
  return biasMap[sourceName] || 'center';
}