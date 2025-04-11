import natural from 'natural';
const { PorterStemmer } = natural;

// Basic stop words list (expand as needed)
const STOP_WORDS = new Set(['the', 'and', 'a', 'an', 'in', 'on', 'at', 'to', 'of']);

function preprocessText(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z ]/g, '')
    .split(' ')
    .filter(word => word.length > 2 && !STOP_WORDS.has(word))
    .map(word => PorterStemmer.stem(word));
}

function calculateSimilarity(text1, text2) {
  const words1 = preprocessText(text1);
  const words2 = preprocessText(text2);
  
  const intersection = new Set([...words1].filter(w => words2.includes(w))).size;
  const union = new Set([...words1, ...words2]).size;
  
  return union > 0 ? intersection / union : 0;
}

export function clusterArticles(articles) {
  const clusters = [];
  
  articles.forEach(article => {
    let bestCluster = null;
    let bestScore = 0.3; // Minimum similarity threshold
    
    clusters.forEach(cluster => {
      const score = calculateSimilarity(
        article.title, 
        cluster[0].title
      );
      if (score > bestScore) {
        bestScore = score;
        bestCluster = cluster;
      }
    });
    
    if (bestCluster) {
      bestCluster.push(article);
    } else {
      clusters.push([article]);
    }
  });
  
  return clusters.filter(c => c.length > 1); // Only show grouped stories
}

