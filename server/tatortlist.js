const http = require("http");
const express = require("express");
const json_server = require("json-server");
const compression = require("compression");
const cors = require("cors");
const app = express();

app.use(compression());
app.use(cors());

const httpServer = http.createServer(app);

httpServer.listen(4000, () => {
  console.log("HTTP Server running on port 4000");
});

app.use("/", express.static(__dirname + "/public"));
app.get("/watched", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/api/now", (req, res) => {
  res.sendFile(__dirname + "/teasers_cleaned.json");
});

app.get("/api/all", (req, res) => {
  res.sendFile(__dirname + "/alle.json");
});

app.use("/jsonserver", json_server.router("teasers_watched.json"));
