import { describe, it, expect } from "vitest"
import supertest from "supertest"
import app from "./app.js"

describe("get temperature", () => {
  it("responds with the current temperature", async () => {
    const res = await supertest(app.callback())
      .get("/temperature")
      .query({ ip: "88.8.82.28" })
      .expect(200)

    expect(res.body.temperature).toBeGreaterThan(7)
    expect(res.body.temperature).toBeLessThan(40)
  })

  it("responds with 400 if ip is not valid", async () => {
    const res = await supertest(app.callback())
      .get("/temperature")
      .query({ ip: "256.1.1.1" })
      .expect(400)

    expect(res.body.error.message).toEqual("Invalid IP address 256.1.1.1")
  })
})

describe.skip("post vote", () => {
  it("saves posted vote", async () => {
    const body = {
      id: 1,
      temperature: 24,
      country: "Spain",
      like: true,
      comment: "I like it",
      unit: "Celsius",
    }

    await supertest(app.callback())
      .post("/temperature/vote")
      .send(body)
      .expect(200)

    const vote = await userRepository.findById(body.id)
    for (let item in vote) {
      expect(vote[item]).toStrictEqual(body[item])
    }
  })
})
