const { MongoClient } = require("mongodb");

const mongoUri = process.env.MONGODB_URI;
const mongoDbName = process.env.MONGODB_DB || "campus_voice";
let clientPromise;

async function getNewsCollection() {
  if (!mongoUri) {
    throw new Error("Set MONGODB_URI to a MongoDB connection string.");
  }

  if (!clientPromise) {
    const client = new MongoClient(mongoUri);
    clientPromise = client.connect().then(() => client).catch((error) => {
      clientPromise = undefined;
      throw error;
    });
  }

  const client = await clientPromise;
  return client.db(mongoDbName).collection("news");
}

function formatNewsItem(item) {
  return {
    id: item._id.toString(),
    title: item.title,
    category: item.category,
    content: item.content,
    createdAt: item.createdAt.toISOString(),
  };
}

function validateNews(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return "Provide a valid news item.";
  }

  const { title, category, content } = value;
  if (typeof title !== "string" || title.trim().length < 3 || title.trim().length > 100) {
    return "Title must be between 3 and 100 characters.";
  }
  if (typeof category !== "string" || category.trim().length < 2 || category.trim().length > 40) {
    return "Category must be between 2 and 40 characters.";
  }
  if (typeof content !== "string" || content.trim().length < 10 || content.trim().length > 1000) {
    return "Story must be between 10 and 1000 characters.";
  }

  return null;
}

module.exports = { formatNewsItem, getNewsCollection, validateNews };
