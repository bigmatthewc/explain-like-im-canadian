export function getBias(sourceName) {
    const source = (sourceName || '').toLowerCase();
    
    const leftSources = ['cbc', 'huffington', 'star'];
    const rightSources = ['national post', 'sun', 'rebel'];
    
    if (leftSources.some(s => source.includes(s))) return 'left';
    if (rightSources.some(s => source.includes(s))) return 'right';
    return 'center';
  }
  
  export function getSharedHeadline(articles) {
    if (!articles.length) return '';
    
    // Get all titles
    const titles = articles.map(a => a.title).filter(Boolean);
    
    // Find common prefix
    const words = titles[0].split(' ');
    let commonLength = 0;
    
    while (
      commonLength < words.length &&
      titles.every(t => t.split(' ')[commonLength] === words[commonLength])
    ) {
      commonLength++;
    }
    
    return commonLength >= 3
      ? words.slice(0, commonLength).join(' ') + '...'
      : titles[0].split(' ').slice(0, 6).join(' ') + '...';
  }