const request = require("supertest");

// Mock mongoose so app.js doesn't try to hit a real database during tests
jest.mock("mongoose", () => ({
  connect: jest.fn().mockResolvedValue(),
}));

const app = require("../app");

describe("API health", () => {
  it("returns a friendly message on GET /", async () => {
    const res = await request(app).get("/").expect(200);
    expect(res.text).toContain("API is running");
  });
});
