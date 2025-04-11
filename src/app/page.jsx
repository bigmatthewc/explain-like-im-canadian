import StoryGroup from '@/components/StoryGroup';

export default async function Home() {
  const articles = await getCanadianNews();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Canadian News Perspectives</h1>
      
      {articles.length > 0 ? (
        articles.map((cluster, i) => (
          <StoryGroup key={`cluster-${i}`} cluster={cluster} />
        ))
      ) : (
        <p className="text-center py-8 text-gray-500">
          No stories available. Try refreshing or checking your API key.
        </p>
      )}
    </div>
  );
}