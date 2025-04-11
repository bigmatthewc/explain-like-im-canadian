import { getCanadianNews } from '../../lib/newsapi';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const articles = await getCanadianNews();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch news' });
  }
}