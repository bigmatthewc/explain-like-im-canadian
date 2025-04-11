import axios from 'axios';

// Verified working Canadian sources
const CANADIAN_SOURCES = [
    // Left
    'cbc-news', 
    'the-huffington-post-canada',
    
    // Center
    'the-globe-and-mail',
    'global-news',
    'ctv-news',
    
    // Right
    'national-post',
    'the-toronto-sun',
    'the-western-standard'
  ].join(',');

  function clusterArticles(articles) {
    const clustered = {};
    
    articles.forEach(article => {
      if (!article.title) return;
      
      // Create a normalized signature
      const signature = article.title
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, '') // Remove special chars
        .replace(/\b(the|a|an|in|at|on)\b/g, '') // Remove common words
        .replace(/\s+/g, ' ') // Collapse spaces
        .trim();
      
      // Find existing cluster or create new
      const existingKey = Object.keys(clustered).find(key => 
        signature.includes(key) || key.includes(signature)
      );
      
      const clusterKey = existingKey || signature.split(' ').slice(0,4).join(' ');
      
      if (!clustered[clusterKey]) {
        clustered[clusterKey] = [];
      }
      clustered[clusterKey].push(article);
    });
    
    // Sort clusters by size and freshness
    return Object.values(clustered)
      .filter(group => group.length > 1) // Only show clustered stories
      .sort((a, b) => {
        const sizeDiff = b.length - a.length;
        if (sizeDiff !== 0) return sizeDiff;
        return new Date(b[0].publishedAt) - new Date(a[0].publishedAt);
      });
  }

export async function getCanadianNews() {
  try {
    const res = await axios.get(
      `https://newsapi.org/v2/top-headlines?sources=${CANADIAN_SOURCES}&pageSize=30&apiKey=${process.env.NEWS_API_KEY}`
    );
    
    console.log('API Response:', res.data); // Debug log
      
      // Ensure we always return an array of arrays
      const articles = res.data.articles || [];
      const clustered = clusterArticles(articles);
      
      return clustered.length > 0 ? clustered : [articles[0]]; // Fallback
    
  } catch (error) {
    console.error('API Error:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    });
    return [];
  }
}

