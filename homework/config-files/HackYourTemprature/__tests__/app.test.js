import supertest from "supertest";
import app from "../app";

const request = supertest(app);

describe("/", () => {
  it("should specify html in the content type header", async () => {
    const response = await request.get("/");
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
  it("should return a json object with a message", async () => {
    const response = await request.get("/");
    expect(response.body).toEqual(
      expect.objectContaining({ message: expect.any(String) })
    );
  });
});

describe("/weather", () => {
  describe("given a city name", () => {
    const body = {
      cityName: "Amsterdam",
    };
    it("should response with 200 status code", async () => {
      const response = await request.post("/weather").send(body);
      expect(response.status).toEqual(200);
    });
    it("should response with a json object", async () => {
      const response = await request.post("/weather").send(body);
      expect(response.body).toEqual(expect.objectContaining({}));
    });
  });
  describe("given no city name", () => {
    it.each([null, "", undefined])(
      "should response with 400 status code",
      async (cityName) => {
        const response = await request.post("/weather").send({ cityName });
        expect(response.status).toEqual(400);
      }
    );
  });
  describe("given a city name is", () => {
    it("should response with 404 status code", async () => {
      const response = await request
        .post("/weather")
        .send({ cityName: "gdgfd" });
      expect(response.status).toEqual(404);
    });
  });
});
