// src/app/NewsList.client.jsx
'use client';

import { useState } from 'react';
import NewsCard from '@/components/news-cards/NewsCard';
import BiasFilter from '@/components/BiasFilter';

export default function NewsList({ initialArticles }) {
  const [activeBias, setActiveBias] = useState('all');

  const filteredArticles = activeBias === 'all' 
    ? initialArticles 
    : initialArticles.filter(article => 
        getBiasForSource(article.source?.name) === activeBias
      );

  return (
    <>
      <BiasFilter activeBias={activeBias} setActiveBias={setActiveBias} />
      <div className="grid gap-6 md:grid-cols-3">
        {filteredArticles.map((article) => (
          <NewsCard key={article.url} article={article} />
        ))}
      </div>
    </>
  );
}

function getBiasForSource(sourceName) {
  const biasMap = {
    'CBC News': 'left',
    'The Globe and Mail': 'center',
    'National Post': 'right',
    'Global News': 'center',
    'CTV News': 'center-left'
  };
  return biasMap[sourceName] || 'unknown';
}