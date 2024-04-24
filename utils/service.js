export default async function getData(url) {
  const data = await fetch(url);

  if (!data.ok) {
    throw new Error(`Server is unavailable`);
  }

  return data.json();
}
