import express, { Application } from "express";

const app: Application = express();
const PORT = process.env.PORT || 8000;
const CreatePdf = require("./createPdf");

app.use("/", CreatePdf);

app.listen(PORT, (): void => {
  console.log(`Server Running here 👉 https://localhost:${PORT}`);
});
