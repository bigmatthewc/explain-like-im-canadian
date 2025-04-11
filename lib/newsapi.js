import axios from 'axios';

// Canadian news sources (expandable list)
const CANADIAN_SOURCES = [
  'cbc-news',        // Left-leaning
  'the-globe-and-mail', // Center
  'national-post',    // Right-leaning
  'global-news',     // Center
  'the-hill-times'   // Political focus
].join(',');

export async function getCanadianNews() {
  try {
    const res = await axios.get(
      `https://newsapi.org/v2/top-headlines?sources=${CANADIAN_SOURCES}&pageSize=50&apiKey=${process.env.NEWS_API_KEY}`
    );
    
    return res.data.articles.map(article => ({
      ...article,
      // Add Canadian timezone conversion
      publishedAt: new Date(article.publishedAt).toLocaleString('en-CA', {
        timeZone: 'America/Toronto',
        dateStyle: 'medium'
      })
    }));
    
  } catch (error) {
    console.error('NewsAPI Error:', error.response?.data || error.message);
    return []; // Fail gracefully
  }
}