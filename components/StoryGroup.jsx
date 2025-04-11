'use client';

export default function StoryGroup({ cluster }) {
  const grouped = {
    left: cluster.filter(a => getBias(a.source.name) === 'left'),
    center: cluster.filter(a => getBias(a.source.name) === 'center'),
    right: cluster.filter(a => getBias(a.source.name) === 'right')
  };

  const headline = getSharedHeadline(cluster);

  return (
    <div className="mb-8 border rounded-lg shadow-sm bg-gray-50">
      <h2 className="p-4 text-lg font-semibold border-b bg-white rounded-t-lg">
        {headline}
      </h2>
      
      <div className="grid md:grid-cols-3 divide-x divide-gray-200">
        <PerspectiveColumn 
          articles={grouped.left} 
          type="left" 
        />
        <PerspectiveColumn 
          articles={grouped.center} 
          type="center" 
        />
        <PerspectiveColumn 
          articles={grouped.right} 
          type="right" 
        />
      </div>
    </div>
  );
}

function PerspectiveColumn({ articles = [], type }) {
  const bgColors = {
    left: 'bg-blue-50',
    center: 'bg-gray-50',
    right: 'bg-red-50'
  };

  return (
    <div className={`p-4 ${bgColors[type]}`}>
      <div className="flex items-center mb-2">
        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
          type === 'left' ? 'bg-blue-500' :
          type === 'right' ? 'bg-red-500' : 'bg-gray-500'
        }`} />
        <h3 className="text-sm font-medium uppercase tracking-wide">
          {type} Perspective
        </h3>
      </div>
      
      {articles.length > 0 ? (
        articles.map(article => (
          <ArticleCard key={article.url} article={article} />
        ))
      ) : (
        <p className="text-sm text-gray-500 italic">
          No {type} coverage found
        </p>
      )}
    </div>
  );
}