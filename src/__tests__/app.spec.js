import request from "supertest";
import fetch from "node-fetch";
import app from "../app";

jest.mock("node-fetch");
jest.mock("../services/database/redis");

describe("people endpoint integration tests", () => {
  it("should return successful response if api returns empty", async () => {
    const expectedData = { people: [], success: "true" };

    fetch.mockResolvedValue({ json: () => [] });
    const response = await request(app).get("/v1/people");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedData);
  });

  it("should return error response when api fails", async () => {
    const expectedData = { error: "People service is unavailable" };

    fetch.mockRejectedValue("test");
    const response = await request(app).get("/v1/people");

    expect(response.status).toBe(500);
    expect(response.body).toEqual(expectedData);
  });
});
