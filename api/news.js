const { formatNewsItem, getNewsCollection, validateNews } = require("../news-store");

module.exports = async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");

  if (request.method === "GET") {
    try {
      const collection = await getNewsCollection();
      const items = await collection.find().sort({ createdAt: -1 }).toArray();
      response.status(200).json(items.map(formatNewsItem));
    } catch (error) {
      console.error("Could not load campus news:", error);
      response.status(500).json({ error: "The server could not load campus news." });
    }
    return;
  }

  if (request.method === "POST") {
    const item = request.body;
    const validationError = validateNews(item);
    if (validationError) {
      response.status(400).json({ error: validationError });
      return;
    }

    try {
      const savedItem = {
        title: item.title.trim(),
        category: item.category.trim(),
        content: item.content.trim(),
        createdAt: new Date(),
      };
      const collection = await getNewsCollection();
      const result = await collection.insertOne(savedItem);
      response.status(201).json(formatNewsItem({ _id: result.insertedId, ...savedItem }));
    } catch (error) {
      console.error("Could not publish campus news:", error);
      response.status(500).json({ error: "The server could not publish campus news." });
    }
    return;
  }

  response.setHeader("Allow", "GET, POST");
  response.status(405).json({ error: "Method not allowed." });
};
