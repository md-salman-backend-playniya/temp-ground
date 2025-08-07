const request = require("supertest");
const { app } = require("./index");

describe("Post API", () => {
  beforeEach(() => {
    app.resetPosts(); // Clear posts before each test
  });

  test("GET /posts should return empty array initially", async () => {
    const res = await request(app).get("/posts");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  test("POST /posts should create a post", async () => {
    const res = await request(app)
      .post("/posts")
      .send({ id: "1", title: "Test", content: "Test content" });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Post created");
  });

  test("POST /posts should return 400 for missing fields", async () => {
    const res = await request(app).post("/posts").send({ id: "2" });
    expect(res.statusCode).toBe(400);
  });

  test("DELETE /posts/:id should delete a post", async () => {
    await request(app)
      .post("/posts")
      .send({ id: "3", title: "To Delete", content: "Delete me" });

    const res = await request(app).delete("/posts/3");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Post deleted");
  });

  test("DELETE /posts/:id should return 404 for non-existing post", async () => {
    const res = await request(app).delete("/posts/999");
    expect(res.statusCode).toBe(404);
  });
});
