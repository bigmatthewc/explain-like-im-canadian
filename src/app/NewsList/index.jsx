'use client';

import { useState } from 'react';
import NewsCard from '@/components/news-cards/NewsCard';
import BiasFilter from '@/components/BiasFilter';

export default function NewsList({ initialArticles }) {
  const [activePerspective, setActivePerspective] = useState('all');

  return (
    <div className="space-y-8">
      {initialArticles.map((articleGroup, index) => (
        <ArticleCluster 
          key={index}
          articles={articleGroup}
          activePerspective={activePerspective}
        />
      ))}
    </div>
  );
}

function ArticleCluster({ articles, activePerspective }) {
  // Organize by bias
  const byBias = {
    left: articles.find(a => getBiasForSource(a.source.name) === 'left'),
    center: articles.find(a => getBiasForSource(a.source.name) === 'center'), 
    right: articles.find(a => getBiasForSource(a.source.name) === 'right')
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <h3 className="bg-gray-100 p-3 font-medium">
        {articles[0].title.split(' ').slice(0,5).join(' ')}...
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 divide-x divide-y">
        {['left', 'center', 'right'].map(bias => (
          <div key={bias} className={`p-4 ${getBiasBgColor(bias)}`}>
            <div className="text-xs font-semibold mb-2">
              {bias.toUpperCase()} PERSPECTIVE
            </div>
            {byBias[bias] ? (
              <NewsCard article={byBias[bias]} />
            ) : (
              <p className="text-sm text-gray-500">No {bias} coverage found</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function getBiasBgColor(bias) {
  return {
    left: 'bg-blue-50',
    center: 'bg-gray-50',
    right: 'bg-red-50'
  }[bias];
}

function getBiasForSource(sourceName) {
  const biasMap = {
    'CBC News': 'left',
    'Toronto Star': 'left',
    'The Globe and Mail': 'center',
    'Global News': 'center',
    'National Post': 'right',
    'The Toronto Sun': 'right'
  };
  return biasMap[sourceName] || 'unknown';
}