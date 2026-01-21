export const fetchArticles = async () => {
  const res = await fetch("http://localhost:3001/blogs");
  if (!res.ok) throw new Error("Failed to fetch articles");
  return res.json();
};