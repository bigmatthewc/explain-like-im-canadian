export async function getAllArticles() {
  const response = await fetch("http://localhost:5000/articles");
  const data = await response.json();
  return data;
}

export async function getArticleBySlug(slug) {
  const response = await fetch(`http://localhost:5000/articles?slug=${slug}`);
  const data = await response.json();
  return data.length > 0 ? data[0] : null;
}