//const fs = require("fs");
const http = require("http");
//const https = require("https");
const express = require("express");
const json_server = require("json-server");
const compression = require("compression");
const cors = require("cors");
const child_process = require("child_process");
const app = express();
let pyname = "python";

app.use(compression());
app.use(cors());

//Powershell: $env:NODE_ENV="development"
// if (process.env.NODE_ENV != "development") {
//   pyname = "python3";
//   console.log(process.env.NODE_ENV);
//   const privateKey = fs.readFileSync(
//     "/etc/letsencrypt/live/***REMOVED***/privkey.pem",
//     "utf8"
//   );
//   const certificate = fs.readFileSync(
//     "/etc/letsencrypt/live/***REMOVED***/cert.pem",
//     "utf8"
//   );
//   const ca = fs.readFileSync(
//     "/etc/letsencrypt/live/***REMOVED***/chain.pem",
//     "utf8"
//   );
//   const credentials = {
//     key: privateKey,
//     cert: certificate,
//     ca: ca,
//   };

//   const httpsServer = https.createServer(credentials, app);
//   httpsServer.listen(8888, () => {
//     console.log("HTTPS Server running on port 8888");
//   });

//   app.use(function (request, response, next) {
//     if (!request.secure) {
//       return response.redirect("https://***REMOVED***:8888" + request.url);
//     }
//     next();
//   });
// }

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
    const child = child_process.spawnSync(pyname, ["fetchTeasers.py"]);
    console.log("Starting " + pyname);
    if (child.error) {
      console.log("ERROR: ", child.error);
      res.status(500).send("ERROR: " + child.error);
    }
    console.log(
      "Python finished with code: ",
      child.status + " and output: " + child.stdout
    );
    try {
      res.sendFile(__dirname + "/teasers_cleaned.json");
    } catch (error) {
      res.status(500).send("ERROR: " + error);
    }
  }
});

app.get("/api/all", (req, res) => {
  if (process.env.NODE_ENV == "development") {
    res.sendFile(__dirname + "/alle.json");
  } else {
    res.set("Cache-control", "public, max-age=300");
    const child = child_process.spawnSync(pyname, ["fetchDasErsteList.py"]);
    console.log("Starting " + pyname);
    if (child.error) {
      console.log("ERROR: ", child.error);
      res.status(500).send("ERROR: " + child.error);
    }
    console.log(
      "Python finished with code: ",
      child.status + " and output: " + child.stdout
    );
    try {
      res.sendFile(__dirname + "/alle.json");
    } catch (error) {
      res.status(500).send("ERROR: " + error);
    }
  }
});

app.use("/jsonserver", json_server.router("teasers_watched.json"));
