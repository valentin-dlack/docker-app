const express = require("express");
const app = express();
const os = require("os");

const port = +(process.env.PORT ?? "8080");

app.get("/", (req, res) => {
  const data = {
    port: "KO",
    hostname: "KO",
  };
  if (port === 1337) {
    data.port = "OK";
  }
  if (os.hostname() === "mydocker") {
    data.hostname = "OK";
  }
  res.json(data);
});

app.listen(port, () => {
  console.log(`Dummy app listening on port ${port}`);
});
