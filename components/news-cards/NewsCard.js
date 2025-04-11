// components/news-cards/NewsCard.js
export default function NewsCard({ article }) {
    const bias = getBiasForSource(article.source?.name);
    
    return (
      <article className={`border-l-4 ${getBiasColor(bias)} p-4 shadow rounded-lg`}>
        <div className="flex justify-between items-start">
          <span className={`px-2 py-1 text-xs rounded-full ${getBiasBadgeColor(bias)}`}>
            {bias.toUpperCase()}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(article.publishedAt).toLocaleDateString('en-CA')}
          </span>
        </div>
        <h2 className="font-bold mt-2">{article.title}</h2>
        <p className="text-sm text-gray-600 mt-1">{article.source?.name}</p>
      </article>
    );
  }
  
  // Helper functions
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
  
  function getBiasColor(bias) {
    const colors = {
      left: 'border-blue-500 bg-blue-50',
      center: 'border-gray-500 bg-gray-50',
      right: 'border-red-500 bg-red-50',
      unknown: 'border-purple-500 bg-purple-50'
    };
    return colors[bias];
  }
  
  function getBiasBadgeColor(bias) {
    const colors = {
      left: 'bg-blue-100 text-blue-800',
      center: 'bg-gray-100 text-gray-800',
      right: 'bg-red-100 text-red-800',
      unknown: 'bg-purple-100 text-purple-800'
    };
    return colors[bias];
  }