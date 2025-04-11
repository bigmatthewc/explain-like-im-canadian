import { getCanadianNews } from '@/lib/newsapi';

export async function GET() {
  try {
    const articles = await getCanadianNews();
    return Response.json(articles);
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}