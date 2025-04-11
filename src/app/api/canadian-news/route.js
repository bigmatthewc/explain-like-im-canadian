import { getCanadianNews } from '@/lib/newsapi';

export async function GET() {
  const articles = await getCanadianNews();
  
  if (!articles.length) {
    return Response.json(
      { error: "No articles found", sources: process.env.NEWS_API_SOURCES },
      { status: 404 }
    );
  }
  
  return Response.json(articles);
}