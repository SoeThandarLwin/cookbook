import express from "express";
import rootHandler from "./handlers/rootHandler.js";

const app = express();
const port = 8080;

app.get("/", rootHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
