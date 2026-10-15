const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");
const { formatNewsItem, getNewsCollection, validateNews } = require("./news-store");

const port = Number(process.env.PORT || 3000);
const pageFile = path.join(__dirname, "clg.html");
const maxRequestBytes = 16 * 1024;
let newsCollection;

function sendJson(response, status, value) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(value));
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    let size = 0;
    let tooLarge = false;

    request.setEncoding("utf8");
    request.on("data", (chunk) => {
      size += Buffer.byteLength(chunk);
      if (size > maxRequestBytes) {
        tooLarge = true;
        return;
      }
      body += chunk;
    });
    request.on("end", () => {
      if (tooLarge) {
        reject(Object.assign(new Error("Request body is too large."), { status: 413 }));
      } else {
        resolve(body);
      }
    });
    request.on("error", reject);
  });
}

async function handleRequest(request, response) {
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);

  if (url.pathname === "/api/news" && request.method === "GET") {
    const items = await newsCollection.find().sort({ createdAt: -1 }).toArray();
    const news = items.map(formatNewsItem);
    sendJson(response, 200, news);
    return;
  }

  if (url.pathname === "/api/news" && request.method === "POST") {
    let item;
    try {
      item = JSON.parse(await readRequestBody(request));
    } catch (error) {
      sendJson(response, error.status || 400, {
        error: error.status ? error.message : "Request body must contain valid JSON.",
      });
      return;
    }

    const validationError = validateNews(item);
    if (validationError) {
      sendJson(response, 400, { error: validationError });
      return;
    }

    const savedItem = {
      title: item.title.trim(),
      category: item.category.trim(),
      content: item.content.trim(),
      createdAt: new Date(),
    };
    const result = await newsCollection.insertOne(savedItem);
    sendJson(response, 201, formatNewsItem({ _id: result.insertedId, ...savedItem }));
    return;
  }

  if (request.method === "GET" && (url.pathname === "/" || url.pathname === "/clg.html")) {
    const page = await fs.readFile(pageFile);
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    response.end(page);
    return;
  }

  sendJson(response, 404, { error: "Not found." });
}

async function start() {
  newsCollection = await getNewsCollection();
  await newsCollection.createIndex({ createdAt: -1 });

  const server = http.createServer((request, response) => {
    handleRequest(request, response).catch((error) => {
      console.error("Request failed:", error);
      if (!response.headersSent) {
        sendJson(response, 500, { error: "The server could not complete the request." });
      } else {
        response.destroy(error);
      }
    });
  });

  server.listen(port, () => {
    console.log(`Campus Voice is running at http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error("Could not start the server:", error);
  process.exitCode = 1;
});
