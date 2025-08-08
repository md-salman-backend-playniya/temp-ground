const express = require("express");

const app = express();
app.use(express.json());

let posts = [];

app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

app.post("/posts", (req, res) => {
  const { id, title, content } = req.body;
  if (!id || !title || !content) {
    return res.status(400).json({ message: "Missing fields" });
  }
  posts.push({ id, title, content });
  res.status(201).json({ message: "Post created" });
});

app.delete("/posts/:id", (req, res) => {
  const id = req.params.id;
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ message: "Post not found" });
  posts.splice(index, 1);
  res.status(200).json({ message: "Post deleted" });
});

app.resetPosts = () => {
  posts = [];
};

app.get("/", () => {
  res.status(200).json({
    message: "I am doing good",
  });
});

module.exports = { app };
