export default function NewsCard({ article }) {
    const bias = getBiasForSource(article.source?.name);
    
    return (
      <div>
        <h4 className="font-bold">{article.title}</h4>
        <div className="flex justify-between text-xs mt-2">
          <span className="font-medium">{article.source.name}</span>
          <span className={`px-2 rounded-full ${getBiasBadgeColor(bias)}`}>
            {bias.toUpperCase()}
          </span>
        </div>
        <p className="text-sm mt-2 line-clamp-3">{article.description}</p>
        <a 
          href={article.url} 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 text-sm text-blue-600 hover:underline"
        >
          Read full story →
        </a>
      </div>
    );
  }
  
  // Add these helper functions at the BOTTOM:
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
  
  function getBiasBadgeColor(bias) {
    return {
      left: 'bg-blue-100 text-blue-800',
      center: 'bg-gray-100 text-gray-800',
      right: 'bg-red-100 text-red-800',
      unknown: 'bg-purple-100 text-purple-800'
    }[bias];
  }