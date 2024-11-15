const http = require("http");
const fs = require("fs");

const server = http.createServer();

server.on("request", (req, res) => {
  if (req.url === "/read-file" && req.method === "GET") {
  }

  const readAbleStream = fs.createReadStream(process.cwd() + "/texts/read.txt");

  readAbleStream.on("data", (buffer) => {
    res.statusCode = 200;
    res.write(buffer);
  });

  readAbleStream.on("end", () => {
    res.statusCode = 200;
    res.end("Hello server");
  });
});

server.listen(5000, () => {
  console.log(`Server is listening on port 5000 `);
});
