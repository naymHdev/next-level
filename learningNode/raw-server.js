const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("req__", req);
  res.end("Hello server");
});

server.listen(5000, () => {
  console.log(`Server is listening on port 5000 `);
});
