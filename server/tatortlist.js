const http = require("http");
const express = require("express");
const json_server = require("json-server");
const compression = require("compression");
const cors = require("cors");
const spawn = require("child_process").spawn;
const app = express();
let pyname = "python";

app.use(compression());
app.use(cors());

//Powershell: $env:NODE_ENV="development"
if (process.env.NODE_ENV != "development") {
  pyname = "python3";
}

const httpServer = http.createServer(app);

httpServer.listen(4000, () => {
  console.log("HTTP Server running on port 4000");
});

app.use("/", express.static(__dirname + "/public"));
app.get("/watched", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/api/now", (req, res) => {
  if (process.env.NODE_ENV == "development") {
    res.sendFile(__dirname + "/teasers_cleaned.json");
  } else {
    res.set("Cache-control", "public, max-age=300");
    const process = spawn(pyname, ["fetchTeasers.py"]);
    console.log("Now: Starting " + pyname);
    process.stdout.on("data", function (data) {
      console.log("Now: " + data.toString());
      try {
        res.sendFile(__dirname + "/teasers_cleaned.json");
      } catch (error) {
        res.status(500).send("ERROR: " + error);
      }
    });
    process.stderr.on("data", (data) => {
      console.error(`Now: stderr: ${data}`);
      res.status(500).send("ERROR: " + data);
    });
    process.on("close", (code) => {
      console.log(`Now: child process exited with code ${code}`);
    });
  }
});

app.get("/api/all", (req, res) => {
  if (process.env.NODE_ENV == "development") {
    res.sendFile(__dirname + "/alle.json");
  } else {
    res.set("Cache-control", "public, max-age=300");
    const process = spawn(pyname, ["fetchDasErsteList.py"]);
    console.log("All: Starting " + pyname);
    process.stdout.on("data", function (data) {
      console.log("All: " + data.toString());
      try {
        res.sendFile(__dirname + "/alle.json");
      } catch (error) {
        res.status(500).send("ERROR: " + error);
      }
    });
    process.stderr.on("data", (data) => {
      console.error(`All: stderr: ${data}`);
      res.status(500).send("ERROR: " + data);
    });
    process.on("close", (code) => {
      console.log(`All: child process exited with code ${code}`);
    });
  }
});

app.use("/jsonserver", json_server.router("teasers_watched.json"));
