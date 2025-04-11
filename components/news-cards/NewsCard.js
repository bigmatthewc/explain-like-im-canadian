export default function NewsCard({ article, bias }) {
    return (
      <article className={`border-l-4 ${getBiasColor(bias)} p-4 bg-white shadow rounded`}>
        <h2 className="font-bold text-lg mb-2">{article.title}</h2>
        <div className="flex justify-between text-sm text-gray-600">
          <span>{article.source?.name}</span>
          <span>{article.publishedAt}</span>
        </div>
        <p className="mt-2 text-gray-700">{article.description}</p>
      </article>
    );
  }
  
  function getBiasColor(bias) {
    const colors = {
      left: 'border-blue-500',
      center: 'border-gray-500',
      right: 'border-red-500'
    };
    return colors[bias] || 'border-purple-500';
  }