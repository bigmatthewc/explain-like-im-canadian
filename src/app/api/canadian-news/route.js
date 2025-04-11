// src/app/api/canadian-news/route.js
import { getCanadianNews } from '@/lib/newsapi';

export async function GET() {
  const articles = await getCanadianNews();
  return Response.json(articles);
}