import axios from 'axios';

// Canadian news sources (with proper commas)
const CANADIAN_SOURCES = [
  'cbc-news',             // Left-leaning
  'the-globe-and-mail',   // Center
  'national-post',        // Right-leaning
  'global-news',          // Center
  'the-hill-times',       // Political focus
  'the-western-standard', // Right
  'rebel-news',           // Far-right
  'toronto-sun'           // Right
].join(',');

export async function getCanadianNews() {
    try {
      console.log('Fetching from NewsAPI with sources:', CANADIAN_SOURCES);
      const res = await axios.get(
        `https://newsapi.org/v2/top-headlines?sources=${CANADIAN_SOURCES}&pageSize=100&apiKey=${process.env.NEWS_API_KEY}`
      );
      console.log('Raw API response:', res.data);
      
      const clustered = clusterArticles(res.data.articles);
      console.log('Clustered articles:', clustered);
      
      return clustered;
    } catch (error) {
      console.error('Full API error:', error);
      return [];
    }
  }

function clusterArticles(articles) {
  const clustered = {};
  
  articles.forEach(article => {
    const keywords = article.title.toLowerCase()
      .replace(/[^a-z ]/g, '')
      .split(' ')
      .filter(word => word.length > 4);
    
    const signature = keywords.join('|');
    
    if (!clustered[signature]) {
      clustered[signature] = [];
    }
    clustered[signature].push(article);
  });
  
  return Object.values(clustered)
    .filter(group => group.length > 1)
    .sort((a,b) => b.length - a.length);
}