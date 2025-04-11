// app/api/canadian-news/route.js
import { clusterArticles } from '@/lib/newsapi';

export async function GET() {
  const articles = await getCanadianNews();
  return Response.json(clusterArticles(articles));
}