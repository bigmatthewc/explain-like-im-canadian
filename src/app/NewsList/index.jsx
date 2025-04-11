'use client';

import { useState } from 'react';
import NewsCard from '@/components/news-cards/NewsCard';

export default function NewsList({ initialArticles }) {
  const [activePerspective, setActivePerspective] = useState('all');

  // Ensure articles is always an array
  const safeArticles = Array.isArray(initialArticles) ? initialArticles : [];

  return (
    <div className="space-y-8">
      {safeArticles.length > 0 ? (
        <ArticleCluster 
          articles={safeArticles}
          activePerspective={activePerspective}
        />
      ) : (
        <div className="text-center py-8">
          <p>No articles available at this time</p>
        </div>
      )}
    </div>
    
  );
}

function ArticleCluster({ articles }) {
    // Ensure we're working with valid array data
    if (!Array.isArray(articles)) return null;
  
    return (
      <div className="space-y-8">
        {articles.map((cluster, index) => {
          // Safely handle cluster data
          const validCluster = Array.isArray(cluster) ? cluster : [];
          const firstArticle = validCluster[0] || {};
          
          const titlePreview = firstArticle.title 
            ? `${firstArticle.title.split(' ').slice(0,6).join(' ')}...`
            : 'Latest News';
  
          return (
            <div key={index} className="border rounded-lg overflow-hidden">
              <h3 className="bg-gray-100 p-3 font-medium">
                {titlePreview}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 divide-x">
                {['left', 'center', 'right'].map(bias => {
                  // Safely find articles with proper null checks
                  const article = validCluster.find(a => {
                    try {
                      return a?.source?.name && 
                             getBiasForSource(a.source.name) === bias;
                    } catch {
                      return false;
                    }
                  });
  
                  return (
                    <div key={bias} className={`p-4 ${getBiasBgColor(bias)}`}>
                      {article ? (
                        <NewsCard article={article} />
                      ) : (
                        <div className="text-sm text-gray-500 p-4">
                          No {bias} perspective available
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }


// Helper functions remain the same
function getBiasBgColor(bias) {
  return {
    left: 'bg-blue-50',
    center: 'bg-gray-50',
    right: 'bg-red-50'
  }[bias];
}

function getBiasForSource(sourceName) {
    if (!sourceName) return 'unknown';
    
    const source = sourceName.toLowerCase();
    const biasMap = {
      // Left
      'cbc': 'left',
      'huffington': 'left',
      'toronto star': 'left',
      
      // Center
      'globe': 'center',
      'global': 'center', 
      'ctv': 'center',
      
      // Right
      'national post': 'right',
      'toronto sun': 'right',
      'western standard': 'right',
      'rebel': 'right'
    };
    
    return Object.entries(biasMap).find(([key]) => 
      source.includes(key)
    )?.[1] || 'unknown';
  }