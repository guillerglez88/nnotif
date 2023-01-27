import express from "express";

const index = express.Router();

index.get("/", function (req, res, next) {
  res.status(200).json({ status: "ok" });
});

export { index };
