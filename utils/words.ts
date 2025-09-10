import { CategoryKey } from "../context/GameContext";

export const categories: Record<CategoryKey, string> = {
  fruitAndVegetables: "Fruit and Vegetables",
  landmark: "Landmark",
  animal: "Animal",
  cityAndCountry: "City and Country",
  movieAndSerial: "Movie and Serial",
  foodAndCuisine: "Food and Cuisine",
  sport: "Sports",
  things: "Things",
  profession: "Profession",
  mixedCategory: "Mixed Category",
};

export const words: Record<CategoryKey, string[]> = {
  fruitAndVegetables: [
    "Apple",
    "Banana",
    "Carrot",
    "Tomato",
    "Cucumber",
    "Potato",
    "Lettuce",
    "Strawberry",
    "Grape",
    "Onion",
    "Garlic",
    "Pepper",
    "Spinach",
    "Broccoli",
    "Watermelon",
  ],
  landmark: ["Eiffel Tower", "Statue of Liberty", "Great Wall", "Pyramids", "Colosseum", "Big Ben", "Machu Picchu"],
  animal: ["Dog", "Cat", "Elephant", "Lion", "Tiger", "Zebra", "Giraffe", "Monkey", "Dolphin", "Kangaroo"],
  cityAndCountry: ["Tehran", "Paris", "New York", "Tokyo", "Canada", "Brazil", "Germany", "Sydney", "Cairo"],
  movieAndSerial: ["Inception", "Titanic", "Friends", "Breaking Bad", "The Godfather", "Avatar", "The Matrix"],
  foodAndCuisine: ["Pizza", "Sushi", "Kebab", "Pasta", "Curry", "Burger", "Taco", "Salad"],
  sport: ["Football", "Basketball", "Tennis", "Volleyball", "Swimming", "Running", "Cycling", "Boxing"],
  things: ["Laptop", "Phone", "Table", "Chair", "Book", "Pen", "Backpack", "Headphones"],
  profession: ["Doctor", "Engineer", "Teacher", "Artist", "Chef", "Pilot", "Lawyer"],
  mixedCategory: [],
};

export function getShuffled<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function getAllWordsForCategory(category: CategoryKey): string[] {
  if (category !== "mixedCategory") return words[category];
  const all = Object.entries(words)
    .filter(([key]) => key !== "mixedCategory")
    .flatMap(([, w]) => w);
  return all;
}


