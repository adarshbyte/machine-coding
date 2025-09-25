const names = ["Rohan", "Aisha", "Kabir", "Neha", "Zara", "Aryan", "Isha", "Rehan"];
const countries = ["India", "USA", "Germany", "France", "Brazil", "Japan", "Canada", "UK"];
const emojis = ["🚀", "🌍", "🎮", "📚", "🎧", "🍕", "💻", "🎨"];

const getRandomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const generateItems = (numberOfItems: number) => {
  return Array.from({ length: numberOfItems }).map(() => ({
    id: crypto.randomUUID(),
    name: getRandomItem(names),
    country: getRandomItem(countries),
    emoji: getRandomItem(emojis),
  }));
};

export default generateItems;
