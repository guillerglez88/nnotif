import express from "express";

const users = express.Router();

users.get("/", function (req, res, next) {
  res.status(200).json({ status: "ok" });
});

export { users }
