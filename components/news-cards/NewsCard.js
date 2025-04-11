export default function NewsCard({ article, bias }) {
    return (
      <div className={`border-l-4 ${getBiasColor(bias)} p-4 mb-4`}>
        <h3 className="font-bold">{article.title}</h3>
        <p className="text-sm text-gray-600">{article.source.name}</p>
        <p className="text-xs">{new Date(article.publishedAt).toLocaleDateString('en-CA')}</p>
      </div>
    );
  }
  
  function getBiasColor(bias) {
    const colors = {
      left: 'border-blue-500 bg-blue-50',
      center: 'border-gray-500 bg-gray-50',
      right: 'border-red-500 bg-red-50'
    };
    return colors[bias] || 'border-gray-300';
  }